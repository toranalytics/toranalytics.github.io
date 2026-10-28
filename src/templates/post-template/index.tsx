import { graphql, Link } from 'gatsby';
import React from 'react';

import PostHeader from '@/src/components/PostHeader';
import LangSwitch, { Alternate } from '@/src/components/LangSwitch';
import PostNavigator from '@/src/components/PostNavigator';
import Seo from '@/src/components/Seo';
import Utterances from '@/src/components/Utterances';
import { LANGS, Lang, t } from '@/src/i18n';
import Layout from '@/src/layout';
import PostClass from '@/src/models/post';
import { Post, SiteMetadata } from '@/src/type';

import * as S from './styled';

type PostTemplateProps = {
  location: Location;
  data: {
    prev: Post;
    next: Post;
    cur: Post;
    site: { siteMetadata: SiteMetadata };
    related: { nodes: Pick<Post, 'id' | 'fields' | 'frontmatter'>[] };
    alternates: { nodes: Pick<Post, 'id' | 'fields' | 'frontmatter'>[] };
  };
};

const PostTemplate: React.FC<PostTemplateProps> = ({ location, data }) => {
  const curPost = new PostClass(data.cur);
  const prevPost = data.prev && new PostClass(data.prev);
  const nextPost = data.next && new PostClass(data.next);
  const utterancesRepo = data.site.siteMetadata.comments.utterances.repo;
  const lang: Lang = curPost.lang;
  const strings = t(lang);

  // Other-language versions of this article (including itself), ordered ko, en, zh
  const alternates: (Alternate & { original: boolean })[] = data.alternates.nodes
    .map((node) => ({
      lang: new PostClass(node as never).lang,
      slug: node.fields.slug,
      title: node.frontmatter.title,
      original: !/^\/(ko|en|zh)\//.test(node.fields.slug),
    }))
    .sort((a, b) => LANGS.indexOf(a.lang) - LANGS.indexOf(b.lang));
  const original = alternates.find((a) => a.original) ?? alternates[0];

  return (
    <Layout location={location}>
      <Seo
        title={`${curPost?.title} | ${strings.siteSuffix}`}
        description={curPost?.description || curPost?.excerpt}
        path={curPost.slug}
        type='article'
        datePublished={curPost.dateISO}
        lang={lang}
        alternates={alternates.map((a) => ({ lang: a.lang, path: a.slug }))}
        defaultAlternate={original?.slug}
      />
      <PostHeader post={curPost} />
      <LangSwitch current={lang} alternates={alternates} />
      <S.PostContent>
        <div className='markdown' dangerouslySetInnerHTML={{ __html: curPost.html }} />
      </S.PostContent>
      <S.RelatedPosts aria-labelledby='related-posts-title'>
        <h2 id='related-posts-title'>{strings.related(curPost.categoryTitle)}</h2>
        {data.related.nodes.length > 0 ? (
          <ul>
            {data.related.nodes.map((post) => (
              <li key={post.id}>
                <Link to={post.fields.slug}>
                  <span>{post.frontmatter.title}</span>
                  <time dateTime={post.frontmatter.date.replace(/\./g, '-')}>{post.frontmatter.date}</time>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Link to={`/${lang}/posts`}>{strings.seeAll(curPost.categoryTitle)}</Link>
        )}
      </S.RelatedPosts>
      <PostNavigator prevPost={prevPost} nextPost={nextPost} lang={lang} />
      {utterancesRepo && <Utterances repo={utterancesRepo} path={curPost.slug} />}
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query ($slug: String, $category: String, $lang: String, $translationKey: String, $nextSlug: String, $prevSlug: String) {
    related: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category }, lang: { eq: $lang } }, fields: { slug: { ne: $slug } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY.MM.DD")
        }
      }
    }
    alternates: allMarkdownRemark(filter: { frontmatter: { translationKey: { eq: $translationKey } } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          lang
          translationKey
        }
      }
    }
    cur: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 500, truncate: true)
      frontmatter {
        date(formatString: "YYYY.MM.DD")
        dateISO: date(formatString: "YYYY-MM-DD")
        title
        description
        category
        tags
        emoji
        lang
        translationKey
      }
      fields {
        slug
      }
    }

    next: markdownRemark(fields: { slug: { eq: $nextSlug } }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY.MM.DD")
        title
        category
        tags
        emoji
        lang
        translationKey
      }
      fields {
        slug
      }
    }

    prev: markdownRemark(fields: { slug: { eq: $prevSlug } }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY.MM.DD")
        title
        category
        tags
        emoji
        lang
        translationKey
      }
      fields {
        slug
      }
    }

    site {
      siteMetadata {
        siteUrl
        comments {
          utterances {
            repo
          }
        }
      }
    }
  }
`;
