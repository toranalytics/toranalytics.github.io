// The blog's categories. Every post names exactly one of these slugs in `category:`; anything else fails the build.
// Tags (`tags:`) are free labels on a post and never become a category.
export type Category = { slug: string; title: string; description: string };

export const CATEGORIES: Category[] = [
  { slug: 'projects', title: '프로젝트', description: '직접 만들어 공개한 도구와 그 과정' },
  { slug: 'agents', title: 'AI 에이전트', description: 'Claude Code와 Codex를 실제 일에 쓰는 방법' },
  { slug: 'experiments', title: '실험·측정', description: '직접 재 본 숫자로 확인한 것' },
];

export const categoryOf = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
