import React from 'react';

import PostCard from '@/src/components/PostCard';
import Seo from '@/src/components/Seo';
import { Lang, LANG_NAME, LANGS, t } from '@/src/i18n';
import Layout from '@/src/layout';
import PostClass from '@/src/models/post';
import { AllMarkdownRemark } from '@/src/type';

import { Link } from 'gatsby';

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
      <Seo title={`${strings.listTitle} | ${strings.siteSuffix}`} path={`/${lang}/posts/`} lang={lang} />
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
