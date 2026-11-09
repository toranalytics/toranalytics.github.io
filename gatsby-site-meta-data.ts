export default {
  /**
   * basic Information
   */
  title: `toranalytics`,
  description: `마케팅 엔지니어 서준범이 광고 운영 시스템을 설계하고 Claude Code, Codex로 구현하면서 확인한 것을 기록하는 블로그`,
  language: `ko`,
  siteUrl: `https://toranalytics.github.io/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder

  /**
   * analytics (empty string = off). GA4 measurement id looks like G-XXXXXXXXXX; GoatCounter code is the subdomain.
   */
  analytics: {
    gaMeasurementId: `G-W84F9W29GN`,
    goatcounterCode: ``,
  },

  /**
   * comments setting
   */
  comments: {
    utterances: {
      repo: `toranalytics/toranalytics.github.io`, // utterances app is installed on this repo only (issues = comments)
    },
  },

  /**
   * introduce yourself
   */
  author: {
    name: `서준범`,
    nickname: `토라`,
    stack: ['광고 운영', '구매 측정', 'Claude Code', 'Codex'],
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
      date: '2026.07 - NOW',
      en: 'all_in_1',
      kr: 'all_in_1',
      info: '광고 기획부터 성과 분석까지 연결한 사내 광고 시스템. 혼자 설계하고 Claude Code · Codex로 구현',
      link: '',
    },
    {
      category: 'Projects',
      date: '2026.10 - NOW',
      en: 'Dude Toldya',
      kr: 'Dude Toldya',
      info: 'Claude Code · Codex 플러그인 (오픈소스)',
      link: 'https://github.com/toranalytics/dude-toldya',
    },
  ],

  /**
   * metadata for Playground Page
   */
  projects: [
    {
      title: 'Dude Toldya',
      description: '과거 정정 원문을 새 요청 앞에 인용하는 Claude Code · Codex 플러그인',
      techStack: ['Node.js', 'Claude Code', 'Codex'],
      thumbnailUrl: 'off-the-wall.png', // Path to your in the 'assets' folder
      links: {
        post: '/off-the-wall/',
        github: 'https://github.com/toranalytics/dude-toldya',
        demo: '/otw-recall-lab.html',
        googlePlay: '',
        appStore: '',
      },
    },
  ],
};
