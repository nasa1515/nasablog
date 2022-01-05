module.exports = {
  title: `NASA1515 BLOG`,
  description: `NASA1515 BLOG`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://nasa1515.tech`,
  ogImage: `/topicon.jpg`, // Path to your image you placed in the 'static' folder
  comments: {
    utterances: {
      repo: `nasa1515/nasablog`,
    },
  },
  ga: 'G-JW5RRD5C13', // Google Analytics Tracking ID
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
          '개인적으로 개발과 Kubernetes 환경에 대해서 공부만 하던 중 기회를 잡게 되어 Data Engineer 역할로 스타트업에 참여하게 되었습니다. ',
        techStack: ['Data Engineer', 'Azure', 'GCP', 'AWS', 'Hadoop', 'Spark'],
        thumbnailUrl: 'cloocus.png',
      },
    ],
  },
};
