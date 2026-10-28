export default {
  /**
   * basic Information
   */
  title: `toranalytics`,
  description: `AI 엔지니어 서준범의 블로그`,
  language: `ko`,
  siteUrl: `https://toranalytics.github.io/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder

  /**
   * analytics (empty string = off). GA4 measurement id looks like G-XXXXXXXXXX; GoatCounter code is the subdomain.
   */
  analytics: {
    gaMeasurementId: ``,
    goatcounterCode: ``,
  },

  /**
   * comments setting
   */
  comments: {
    utterances: {
      repo: `toranalytics/toranalytics.github.io`, // utterances app installed on this repo only
    },
  },

  /**
   * introduce yourself
   */
  author: {
    name: `서준범`,
    nickname: `토라`,
    stack: ['Claude Code', 'Codex', 'AI 에이전트'],
    bio: {
      email: `toranalytics.seo@gmail.com`,
      residence: 'Seoul, South Korea',
      bachelorDegree: 'Kwangwoon Univ. IT CONVERGENCE & Korean literature (2016.03-2023.08)',
    },
    social: {
      github: `https://github.com/toranalytics`,
      linkedIn: ``,
      resume: ``,
    },
    dropdown: {
      tistory: '',
      velog: '',
    },
  },

  /**
   * metadata for About Page
   */
  timestamps: [
    {
      category: 'Projects',
      date: '2026.10 - NOW',
      en: 'Off the Wall',
      kr: 'Off the Wall',
      info: 'Claude Code · Codex 플러그인 (오픈소스)',
      link: 'https://github.com/toranalytics/off-the-wall',
    },
  ],

  /**
   * metadata for Playground Page
   */
  projects: [
    {
      title: 'Off the Wall',
      description: '과거 정정 원문을 새 요청 앞에 인용하는 Claude Code · Codex 플러그인',
      techStack: ['Node.js', 'Claude Code', 'Codex'],
      thumbnailUrl: 'off-the-wall.png', // Path to your in the 'assets' folder
      links: {
        post: '/off-the-wall/',
        github: 'https://github.com/toranalytics/off-the-wall',
        demo: '/otw-recall-lab.html',
        googlePlay: '',
        appStore: '',
      },
    },
  ],
};
