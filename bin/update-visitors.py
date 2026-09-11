#!/usr/bin/env python3
"""Convert an Umami city CSV export into assets/json/visitors.json.

Umami Cloud's free tier has no API, so the flow is manual:

  1. Umami dashboard -> your website -> Cities
  2. Set the date range you want (e.g. "Last 12 months")
  3. Click the download/export icon -> saves a CSV
  4. python3 bin/update-visitors.py ~/Downloads/cities.csv
  5. git add assets/json/visitors.json && git commit && git push

The CSV is expected to have a city-ish column and a count-ish column;
exact header names vary by Umami version, so we sniff them.

Cities are resolved to coordinates via assets/json/city-coords.json.
Unknown cities are reported so you can add them if they matter.
"""

import csv
import json
import pathlib
import sys
from datetime import date

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "json" / "visitors.json"
COORDS = ROOT / "assets" / "json" / "city-coords.json"

CITY_KEYS = ("city", "name", "location", "x")
COUNT_KEYS = ("visitors", "count", "views", "pageviews", "value", "y", "sessions")


def pick(header, candidates):
    """Find the first column whose name matches one of candidates."""
    lowered = {h.strip().lower(): h for h in header if h}
    for cand in candidates:
        if cand in lowered:
            return lowered[cand]
    for cand in candidates:
        for low, orig in lowered.items():
            if cand in low:
                return orig
    return None


def main():
    if len(sys.argv) < 2:
        sys.exit(f"usage: {sys.argv[0]} <umami-cities-export.csv>")

    src = pathlib.Path(sys.argv[1]).expanduser()
    if not src.exists():
        sys.exit(f"no such file: {src}")

    coords = json.loads(COORDS.read_text(encoding="utf-8"))

    with src.open(encoding="utf-8-sig", newline="") as fh:
        rows = list(csv.DictReader(fh))

    if not rows:
        sys.exit("CSV has no data rows")

    header = list(rows[0].keys())
    city_col = pick(header, CITY_KEYS)
    count_col = pick(header, COUNT_KEYS)

    if not city_col:
        sys.exit(f"could not find a city column in: {header}")
    if not count_col:
        sys.exit(f"could not find a count column in: {header}")

    print(f"using columns: city={city_col!r} count={count_col!r}")

    points = []
    unknown = []
    total = 0

    for row in rows:
        raw = (row.get(city_col) or "").strip()
        if not raw:
            continue
        try:
            count = int(float(row.get(count_col) or 0))
        except ValueError:
            continue
        if count <= 0:
            continue

        total += count

        # Umami formats cities as "Shenzhen, CN" or sometimes just "Shenzhen"
        key = raw.lower()
        hit = coords.get(key)
        if not hit and "," in raw:
            hit = coords.get(raw.split(",")[0].strip().lower())

        if not hit:
            unknown.append((raw, count))
            continue

        points.append(
            {
                "city": hit.get("city", raw),
                "country": hit.get("country", ""),
                "lat": hit["lat"],
                "lng": hit["lng"],
                "count": count,
            }
        )

    points.sort(key=lambda p: -p["count"])

    payload = {
        "updated": date.today().isoformat(),
        "source": f"umami export: {src.name}",
        "total": total,
        "points": points,
    }
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"wrote {OUT.relative_to(ROOT)}: {len(points)} cities, {total} visits")

    if unknown:
        unknown.sort(key=lambda t: -t[1])
        print(f"\n{len(unknown)} unmapped cities (add to assets/json/city-coords.json if wanted):")
        for name, count in unknown[:15]:
            print(f"  {count:>6}  {name}")
        if len(unknown) > 15:
            print(f"  ... and {len(unknown) - 15} more")


if __name__ == "__main__":
    main()
