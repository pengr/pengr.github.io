---
layout: page
permalink: /publications/
title: Publications
description: My research interests spread across LLMs, machine learning, NLP and multimodal. Please refer to my publicatios below.
years: [2025, 2024, 2023, 2022, 2021, 2019]
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

<!-- {% include bib_search.liquid %} -->

<div class="publications">

{% bibliography %}

</div>


<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>