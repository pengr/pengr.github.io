// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "My research interests spread across LLMs, machine learning, NLP and multimodal. Please refer to my publications below.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-talks",
          title: "Talks",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
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
