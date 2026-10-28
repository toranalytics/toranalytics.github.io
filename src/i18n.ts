// Languages the blog is published in. Korean and English posts may be originals; every other language is a translation.
export type Lang = 'ko' | 'en' | 'zh';

export const LANGS: Lang[] = ['ko', 'en', 'zh'];

// BCP 47 tags used for <html lang>, hreflang and JSON-LD inLanguage
export const LANG_TAG: Record<Lang, string> = { ko: 'ko', en: 'en', zh: 'zh-Hans' };
export const OG_LOCALE: Record<Lang, string> = { ko: 'ko_KR', en: 'en_US', zh: 'zh_CN' };
export const LANG_NAME: Record<Lang, string> = { ko: '한국어', en: 'English', zh: '中文' };

export const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang);
export const langOf = (value: string | null | undefined, fallback: Lang = 'ko'): Lang => (isLang(value) ? value : fallback);

// Translated posts live under /ko/, /en/ or /zh/. Originals keep their old URLs.
export const isTranslationSlug = (slug: string) => /^\/(ko|en|zh)\//.test(slug);

const STRINGS = {
  ko: {
    posts: '글',
    path: '글 경로',
    tags: '태그',
    prev: '이전 글',
    next: '다음 글',
    related: (category: string) => `${category} 카테고리의 다른 글`,
    seeAll: (category: string) => `${category} 카테고리 전체 보기`,
    readIn: '다른 언어로 읽기',
    listTitle: '글 목록',
    listSubtitle: (n: number) => `한국어 글 ${n}개`,
    siteSuffix: '서준범',
    noticeAvailable: (name: string) => `이 글은 ${name}로도 읽을 수 있습니다.`,
    noticeDismiss: '닫기',
    languages: '언어',
  },
  en: {
    posts: 'Posts',
    path: 'Post path',
    tags: 'Tags',
    prev: 'Previous',
    next: 'Next',
    related: (category: string) => `More in ${category}`,
    seeAll: (category: string) => `See all in ${category}`,
    readIn: 'Read in another language',
    listTitle: 'Posts',
    listSubtitle: (n: number) => `${n} posts in English`,
    siteSuffix: 'Junebeom Seo',
    noticeAvailable: (name: string) => `This article is also available in ${name}.`,
    noticeDismiss: 'Dismiss',
    languages: 'Languages',
  },
  zh: {
    posts: '文章',
    path: '文章路径',
    tags: '标签',
    prev: '上一篇',
    next: '下一篇',
    related: (category: string) => `${category}分类的其他文章`,
    seeAll: (category: string) => `查看${category}分类的全部文章`,
    readIn: '用其他语言阅读',
    listTitle: '文章列表',
    listSubtitle: (n: number) => `${n} 篇中文文章`,
    siteSuffix: 'Junebeom Seo',
    noticeAvailable: (name: string) => `本文也提供${name}版本。`,
    noticeDismiss: '关闭',
    languages: '语言',
  },
};

export const t = (lang: Lang) => STRINGS[lang];

const CATEGORY_TEXT: Record<string, Record<Lang, { title: string; description: string }>> = {
  projects: {
    ko: { title: '프로젝트', description: '직접 만들어 공개한 도구와 그 과정' },
    en: { title: 'Projects', description: 'Tools I built and published, and how' },
    zh: { title: '项目', description: '我亲手做并公开的工具及其过程' },
  },
  agents: {
    ko: { title: 'AI 에이전트', description: 'Claude Code와 Codex를 실제 일에 쓰는 방법' },
    en: { title: 'AI agents', description: 'Using Claude Code and Codex on real work' },
    zh: { title: 'AI 智能体', description: '在真实工作中使用 Claude Code 与 Codex' },
  },
  experiments: {
    ko: { title: '실험·측정', description: '직접 재 본 숫자로 확인한 것' },
    en: { title: 'Experiments', description: 'What I checked with numbers I measured myself' },
    zh: { title: '实验与测量', description: '用我亲自测得的数字确认的内容' },
  },
};

export const categoryText = (slug: string, lang: Lang) => CATEGORY_TEXT[slug]?.[lang];

// Browser language (navigator.language) -> blog language
export const browserLang = (nav: string | undefined): Lang | undefined => {
  const prefix = (nav || '').toLowerCase().slice(0, 2);
  return isLang(prefix) ? prefix : undefined;
};
