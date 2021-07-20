module.exports = {
  title: `나사블로그`,
  description: `나사블로그`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://nasa1515.tech`,
  ogImage: `/PINGGU.jpg`, // Path to your image you placed in the 'static' folder
  comments: {
    utterances: {
      repo: `nasa1515/nasablog`,
    },
  },
  ga: 'UA-134826755-2', // Google Analytics Tracking ID
  author: {
    name: `NASA1515`,
    bio: {
      role: `Data Engineer`,
      description: ['데이터를 좋아하는', '엔지니어 특화'],
      isVideo: true,
    },
    social: {
      github: `https://github.com/nasa1515`,
      linkedIn: `https://www.linkedin.com/in/wonseok-lee-60b9011a3`,
      email: `h43254@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
        },
      },
      // ========================================================
      // =======================================================
      {
        date: '2021.02 ~ 2021.03',
        activity: '개인 블로그 디자인 및 개발',
        links: {
          post: '/zoomkoding-gatsby-blog-introduction',
          github: 'https://github.com/zoomkoding/college-timetable',
          demo: 'https://gatsby-starter-zoomkoding.netlify.app',
        },
      },
      {
        date: '2020.12 ~ ',
        activity: 'Cloocus Data Enginner🚀',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '2020 우아한테크캠프 참여',
        description:
          '스타트업에서 앱 개발을 하면서 좋은 개발에 대한 갈증이 매우 크던 중에 좋은 기회를 잡게 되어 참여하게 되었습니다. 2달 간 몰입해서 좋은 사람들과 웹 개발을 경험하며, 많이 배우고 성장할 수 있었던 시간이었습니다.',
        techStack: ['react', 'nodejs'],
        thumbnailUrl: 'woowa-tech.png',
        links: {
          post: '/woowa-tech-camp-final',
          github: 'https://github.com/woowa-techcamp-2020/bmart-6',
        },
      },
    ],
  },
};
