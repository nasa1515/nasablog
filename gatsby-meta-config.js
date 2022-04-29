module.exports = {
  title: `Data Engineer NASA1515 BLOG`,
  description: `Data Engineer NASA1515 BLOG`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://nasa1515.com`,
  ogImage: `/topicon.jpg`, // Path to your image you placed in the 'static' folder
  comments: {
    utterances: {
      repo: `nasa1515/nasablog`,
    },
  },
  ga: 'G-LR5TBZKGVN', // Google Analytics Tracking ID
  author: {
    name: `NASA1515`,
    bio: {
      role: `Data Engineer`,
      description: ['Trying New Things', 'It Records Everything'],
      thumbnail: 'wonseok.gif',
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
        activity: 'Cloud Data Engineer 🚀',
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
          'I Work for a Startup as a data engineer in Korea',
        techStack: ['Data Engineer', 'Azure', 'GCP', 'AWS', 'Hadoop', 'Spark'],
        thumbnailUrl: 'cloocus.png',
      },
    ],
  },
};
