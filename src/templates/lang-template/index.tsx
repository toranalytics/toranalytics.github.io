import React from 'react';

import PostCard from '@/src/components/PostCard';
import Seo from '@/src/components/Seo';
import { Lang, LANG_NAME, LANGS, t } from '@/src/i18n';
import Layout from '@/src/layout';
import PostClass from '@/src/models/post';
import { AllMarkdownRemark } from '@/src/type';

import { Link } from 'gatsby';

const LIST_DESCRIPTION: Record<Lang, string> = {
  ko: '서준범의 블로그 한국어 글 목록입니다. 직접 만든 프로젝트, Claude Code와 Codex 같은 AI 에이전트 활용법, 직접 측정한 실험 결과를 다룹니다.',
  en: "Junebeom Seo's blog posts in English: projects I built, how I use AI agents like Claude Code and Codex on real work, and experiments with numbers I measured myself.",
  zh: 'Junebeom Seo 博客的中文文章列表：我参与设计的项目、在真实工作中使用 Claude Code 与 Codex 等 AI 智能体的方法，以及用亲自测得的数字完成的实验。',
};

type LangTemplateProps = {
  location: Location;
  pageContext: { lang: Lang; edges: AllMarkdownRemark['edges'] };
};

const LangTemplate: React.FC<LangTemplateProps> = ({ location, pageContext }) => {
  const { lang, edges } = pageContext;
  const posts = edges.map(({ node }) => new PostClass(node));
  const strings = t(lang);

  return (
    <Layout location={location}>
      <Seo
        title={`${strings.listTitle} | ${strings.siteSuffix}`}
        description={LIST_DESCRIPTION[lang]}
        path={`/${lang}/posts/`}
        lang={lang}
      />
      <h1 style={{ fontSize: 28, margin: '24px 0 8px' }}>{strings.listTitle}</h1>
      <p style={{ opacity: 0.7, margin: '0 0 16px' }}>{strings.listSubtitle(posts.length)}</p>
      <nav aria-label={strings.languages} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', margin: '0 0 24px', fontSize: 14 }}>
        {LANGS.map((l) =>
          l === lang ? (
            <strong key={l} lang={l} aria-current='page'>
              {LANG_NAME[l]}
            </strong>
          ) : (
            <Link key={l} to={`/${l}/posts`} hrefLang={l} lang={l}>
              {LANG_NAME[l]}
            </Link>
          ),
        )}
      </nav>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default LangTemplate;
