// The blog's categories. Every post names exactly one of these slugs in `category:`; anything else fails the build.
// Tags (`tags:`) are free labels on a post and never become a category.
export type Category = { slug: string; title: string; description: string };

export const CATEGORIES: Category[] = [
  { slug: 'projects', title: '프로젝트', description: '직접 만든 도구와 그 과정' },
  { slug: 'agents', title: 'AI 에이전트', description: 'AI 에이전트를 활용하며 겪은 일' },
  { slug: 'experiments', title: '실험·측정', description: '실험과 데이터로 확인한 것' },
];

export const categoryOf = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
