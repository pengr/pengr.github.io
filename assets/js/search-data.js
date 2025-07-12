// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-",
    title: "",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "My research interests spread across **LLMs (current emphasis)**, machine learning, NLP and multimodal. Please refer to my publicatios below.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-people",
          title: "people",
          description: "members of the lab or group",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "news-our-paper-hybridvocab-towards-multi-modal-machine-translation-via-multi-aspect-alignment-is-accpeted-at-icmr-2022-oral",
          title: 'Our paper “HybridVocab: Towards Multi-Modal Machine Translation via Multi-Aspect Alignment” is accpeted at...',
          description: "",
          section: "News",},{id: "news-started-my-phd-s-degree-at-college-of-computer-science-and-technology-of-zhejiang-university",
          title: 'Started my PhD’s degree at College of Computer Science and Technology of Zhejiang...',
          description: "",
          section: "News",},{id: "news-our-paper-distill-the-image-to-nowhere-inversion-knowledge-distillation-for-multimodal-machine-translation-is-accepted-at-emnlp-2022-oral",
          title: 'Our paper “Distill The Image to Nowhere: Inversion Knowledge Distillation for Multimodal Machine...',
          description: "",
          section: "News",},{id: "news-our-paper-came-contrastive-automated-model-evaluation-is-accepted-at-iccv-2023",
          title: 'Our paper “CAME: Contrastive Automated Model Evaluation” is accepted at ICCV 2023!',
          description: "",
          section: "News",},{id: "news-i-started-my-internship-at-alibaba-qwen-team-ping-me-if-you-want-to-meet-up-in-hangzhou",
          title: 'I started my internship at Alibaba Qwen Team! Ping me if you want...',
          description: "",
          section: "News",},{id: "news-our-paper-energy-based-automated-model-evaluation-is-accepted-at-iclr-2024",
          title: 'Our paper “Energy-based Automated Model Evaluation” is accepted at ICLR 2024!',
          description: "",
          section: "News",},{id: "news-qwen1-5-series-foundation-models-are-released-now",
          title: 'Qwen1.5 series foundation models are released now.',
          description: "",
          section: "News",},{id: "news-our-paper-dory-deliberative-prompt-recovery-for-llm-is-accepted-at-findings-of-acl-2024",
          title: 'Our paper “DORY: Deliberative Prompt Recovery for LLM” is accepted at Findings of...',
          description: "",
          section: "News",},{id: "news-qwen2-series-foundation-models-are-released-now",
          title: 'Qwen2 series foundation models are released now.',
          description: "",
          section: "News",},{id: "news-release-the-paper-of-dotamath-for-mathematical-reasoning",
          title: 'Release the paper of “Dotamath” for mathematical reasoning.',
          description: "",
          section: "News",},{id: "news-qwen2-technical-report-are-released-now",
          title: 'Qwen2 technical report are released now.',
          description: "",
          section: "News",},{id: "news-qwen2-5-series-foundation-models-are-released-now",
          title: 'Qwen2.5 series foundation models are released now.',
          description: "",
          section: "News",},{id: "news-one-paper-inference-time-decontamination-reusing-leaked-benchmarks-for-large-language-model-evaluation-is-accepted-at-findings-of-emnlp-2024-and-two-paper-predicting-rewards-alongside-tokens-non-disruptive-parameter-insertion-for-efficient-inference-intervention-in-large-language-model-embedding-and-gradient-say-wrong-a-white-box-method-for-hallucination-detection-are-accepted-at-emnlp-2024",
          title: 'One paper “Inference-Time Decontamination: Reusing Leaked Benchmarks for Large Language Model Evaluation” is...',
          description: "",
          section: "News",},{id: "news-qwen2-5-technical-report-are-released-now",
          title: 'Qwen2.5 technical report are released now.',
          description: "",
          section: "News",},{id: "news-our-paper-dataman-data-manager-for-pre-training-large-language-models-is-accepted-at-iclr-2025",
          title: 'Our paper “DataMan: Data Manager for Pre-training Large Language Models” is accepted at...',
          description: "",
          section: "News",},{id: "news-our-paper-llm-enhanced-query-generation-and-retrieval-preservation-for-task-oriented-dialogue-is-accepted-at-findings-of-acl-2025",
          title: 'Our paper “LLM-Enhanced Query Generation and Retrieval Preservation for Task-Oriented Dialogue” is accepted...',
          description: "",
          section: "News",},{id: "news-qwen3-series-foundation-models-are-released-now",
          title: 'Qwen3 series foundation models are released now.',
          description: "",
          section: "News",},{
        id: 'social-dblp',
        title: 'DBLP',
        section: 'Socials',
        handler: () => {
          window.open("https://dblp.org/pid/305/5740.html", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%72%75%70%65%6E%67@%7A%6A%75.%65%64%75.%63%6E", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/pengr", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0001-8627-2282", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=3udA8hkAAAAJ", "_blank");
        },
      },{
        id: 'social-wechat_qr',
        title: 'Wechat_qr',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
