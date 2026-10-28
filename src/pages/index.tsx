import { graphql } from 'gatsby';
import React from 'react';

import FeaturedPostColumn from '../components/FeaturedPostColumn';
import MainBanner from '../components/MainBanner';
import Seo from '../components/Seo';
import Layout from '../layout';
import PostClass from '../models/post';
import { CATEGORIES } from '../categories';
import { AllMarkdownRemark, SiteMetadata } from '../type';

type HomeProps = {
  data: {
    site: { siteMetadata: SiteMetadata };
    allMarkdownRemark: AllMarkdownRemark;
  };
  location: Location;
};

const Home: React.FC<HomeProps> = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges.map(({ node }) => new PostClass(node));

  const { author } = data.site.siteMetadata;

  const recentPosts = posts.slice(0, 3);

  const categoryPosts = CATEGORIES.map(({ title, slug }) => ({
    title,
    posts: posts.filter((post) => post.category === slug),
  })).filter(({ posts }) => posts.length > 0);

  return (
    <Layout location={location}>
      <Seo title='서준범 · AI Engineer' path='/' />
      <MainBanner author={author} />

      <FeaturedPostColumn title='Recent Posts' posts={recentPosts} fill={false} />

      {categoryPosts.map(({ title, posts }, i) => (
        <FeaturedPostColumn key={i} title={title} posts={posts} />
      ))}
    </Layout>
  );
};

export default Home;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          excerpt(pruneLength: 500, truncate: true)
          frontmatter {
            category
            tags
            title
            emoji
            date(formatString: "YYYY.MM.DD")
          }
          fields {
            slug
          }
        }
      }
    }

    site {
      siteMetadata {
        siteUrl
        language
        author {
          name
          nickname
          stack
          bio {
            email
            residence
            bachelorDegree
          }
          social {
            github
            linkedIn
            resume
          }
          dropdown {
            velog
            tistory
          }
        }
      }
    }
  }
`;
