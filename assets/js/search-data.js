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
          description: "My research interests spread across **LLMs (current emphasis)**, machine learning, NLP and multimodal. Please refer to my publicatios below.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "This is a description of the page. You can modify it in &#39;_pages/cv.md&#39;. You can also change or remove the top pdf download button.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-talks",
          title: "Talks",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-people",
          title: "People",
          description: "members of the lab or group",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "dropdown-bookshelf",
              title: "Bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather.html";
            },},{id: "news-our-paper-hybridvocab-towards-multi-modal-machine-translation-via-multi-aspect-alignment-is-accpeted-at-icmr-2022-oral",
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
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project.html";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project.html";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project.html";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project.html";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project.html";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project.html";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project.html";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project.html";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project.html";
            },},{
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
