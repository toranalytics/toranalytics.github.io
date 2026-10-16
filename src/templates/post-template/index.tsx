import { graphql, Link } from 'gatsby';
import React from 'react';

import PostHeader from '@/src/components/PostHeader';
import PostNavigator from '@/src/components/PostNavigator';
import Seo from '@/src/components/Seo';
import Utterances from '@/src/components/Utterances';
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
  };
};

const PostTemplate: React.FC<PostTemplateProps> = ({ location, data }) => {
  const curPost = new PostClass(data.cur);
  const prevPost = data.prev && new PostClass(data.prev);
  const nextPost = data.next && new PostClass(data.next);
  const utterancesRepo = data.site.siteMetadata.comments.utterances.repo;

  return (
    <Layout location={location}>
      <Seo title={`서준범 | ${curPost?.title}`} description={curPost?.excerpt} />
      <PostHeader post={curPost} />
      <S.PostContent>
        <div className='markdown' dangerouslySetInnerHTML={{ __html: curPost.html }} />
      </S.PostContent>
      <S.RelatedPosts aria-labelledby='related-posts-title'>
        <h2 id='related-posts-title'>{curPost.categoryTitle} 카테고리의 다른 글</h2>
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
          <Link to={`/posts/${curPost.category}`}>{curPost.categoryTitle} 카테고리 전체 보기</Link>
        )}
      </S.RelatedPosts>
      <PostNavigator prevPost={prevPost} nextPost={nextPost} />
      {utterancesRepo && <Utterances repo={utterancesRepo} path={curPost.slug} />}
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query ($slug: String, $category: String, $nextSlug: String, $prevSlug: String) {
    related: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } }, fields: { slug: { ne: $slug } } }
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
    cur: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 500, truncate: true)
      frontmatter {
        date(formatString: "YYYY.MM.DD")
        title
        category
        tags
        emoji
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
