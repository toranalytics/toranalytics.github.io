import type { Actions, GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import path from 'path';

import { categoryOf, CATEGORIES } from './src/categories';
import { isTranslationSlug, LANGS, langOf } from './src/i18n';
import { AllMarkdownRemark } from './src/type';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ getConfig, actions }) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        '@/src': path.resolve(__dirname, 'src/'),
        '@/assets': path.resolve(__dirname, 'assets/'),
      },
    },
  });
};

type CreatePagesFuncProps = {
  createPage: Actions['createPage'];
  edges: AllMarkdownRemark['edges'];
};

const createPosts = ({ createPage, edges }: CreatePagesFuncProps) => {
  const posts = path.resolve(`./src/templates/posts-template/index.tsx`);
  const count = (slug: string) => edges.filter((e) => e.node.frontmatter.category === slug).length;
  const categories = [
    { slug: '', title: '전체', description: '모든 글', count: edges.length },
    ...CATEGORIES.map((c) => ({ ...c, count: count(c.slug) })),
  ];

  categories.forEach((current) => {
    createPage({
      path: current.slug ? `/posts/${current.slug}` : `/posts`,
      component: posts,
      context: {
        currentCategory: current.slug,
        categories,
        edges: current.slug ? edges.filter((e) => e.node.frontmatter.category === current.slug) : edges,
      },
    });
  });
};

const langOfNode = (node: AllMarkdownRemark['edges'][number]['node']) =>
  langOf(node.frontmatter.lang, /[가-힣]/.test(node.frontmatter.title) ? 'ko' : 'en');

const createPost = ({ createPage, edges }: CreatePagesFuncProps) => {
  const post = path.resolve(`./src/templates/post-template/index.tsx`);

  // Previous/next links stay inside one language. `edges` is sorted by date, newest first.
  edges.forEach(({ node }) => {
    const lang = langOfNode(node);
    const sameLang = edges.filter((e) => langOfNode(e.node) === lang);
    const index = sameLang.findIndex((e) => e.node.id === node.id);
    const next = sameLang[index + 1];
    const previous = sameLang[index - 1];

    createPage({
      path: node.fields.slug,
      component: post,
      context: {
        // additional data can be passed via context
        slug: node.fields.slug,
        category: node.frontmatter.category,
        lang,
        translationKey: node.frontmatter.translationKey || node.fields.slug,
        nextSlug: next?.node.fields.slug ?? '',
        prevSlug: previous?.node.fields.slug ?? '',
      },
    });
  });
};

// /ko/posts, /en/posts, /zh/posts: every post in one language (originals and translations)
const createLangLists = ({ createPage, edges }: CreatePagesFuncProps) => {
  const template = path.resolve(`./src/templates/lang-template/index.tsx`);
  LANGS.forEach((lang) => {
    createPage({
      path: `/${lang}/posts`,
      component: template,
      context: { lang, edges: edges.filter((e) => langOfNode(e.node) === lang) },
    });
  });
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Get all markdown blog posts sorted by date
  const result: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any;
    data?: {
      allMarkdownRemark: AllMarkdownRemark;
    };
  } = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            id
            excerpt(pruneLength: 500, truncate: true)
            fields {
              slug
            }
            frontmatter {
              category
              tags
              title
              lang
              translationKey
              date(formatString: "YYYY.MM.DD")
            }
          }
          next {
            fields {
              slug
            }
          }
          previous {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors);
    return;
  }

  const filteredEdges = result.data.allMarkdownRemark.edges;
  const unknown = filteredEdges.filter((e) => !categoryOf(e.node.frontmatter.category));
  if (unknown.length) {
    reporter.panicOnBuild(
      `Each post needs \`category:\` set to one of ${CATEGORIES.map((c) => c.slug).join(', ')}. ` +
        `Fix: ${unknown.map((e) => `${e.node.fields.slug} (${e.node.frontmatter.category})`).join(', ')}`,
    );
    return;
  }

  // The default lists (home, /posts) show originals only; translations are reached from the language links.
  createPosts({ createPage, edges: filteredEdges.filter((e) => !isTranslationSlug(e.node.fields.slug)) });
  createLangLists({ createPage, edges: filteredEdges });
  createPost({ createPage, edges: filteredEdges });
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` });
    createNodeField({ node, name: `slug`, value: slug });
  }
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemarkFrontmatter {
      category: String
      tags: String
      lang: String
      translationKey: String
    }
  `);
};
