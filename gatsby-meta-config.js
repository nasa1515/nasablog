module.exports = {
  title: `NASA1515 이원석 블로그`,
  description: `NASA1515 이원석 블로그`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://nasa1515.tech`,
  ogImage: `/topicon.jpg`, // Path to your image you placed in the 'static' folder
  comments: {
    utterances: {
      repo: `nasa1515/nasablog`,
    },
  },
  ga: 'UA-192755809-1', // Google Analytics Tracking ID
  author: {
    name: `이원석`,
    bio: {
      role: `Data Engineer`,
      description: ['새로운 것을 좋아하는', '모든 걸 기록하는'],
      thumbnail: 'author.gif',
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
      },
      // ========================================================
      // =======================================================
      {
        date: '2020.12 ~ ',
        activity: 'Cloocus Data Engineer 🚀',
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
      },
      // ========================================================
      // ========================================================
      {
        title: 'Cloocus',
        description:
          '스타트업에서 앱 개발을 하면서 좋은 개발에 대한 갈증이 매우 크던 중에 좋은 기회를 잡게 되어 참여하게 되었습니다. 2달 간 몰입해서 좋은 사람들과 웹 개발을 경험하며, 많이 배우고 성장할 수 있었던 시간이었습니다.',
        techStack: ['Data Engineer', 'Azure', 'GCP', 'AWS', 'Hadoop', 'Spark'],
        thumbnailUrl: 'cloocus.png',
      },
    ],
  },
};
