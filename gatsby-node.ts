import { copyFile, readFile, writeFile } from 'fs/promises';
import type { Actions, GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import path from 'path';

import { CATEGORIES, categoryOf } from './src/categories';
import { isTranslationSlug, langOf, LANGS } from './src/i18n';
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

// Publish the single sitemap directly at the root. Keep Gatsby's index and chunks too.
export const onPostBuild: GatsbyNode['onPostBuild'] = async () => {
  // An independent plain-text sitemap contains only canonical URLs from generated HTML.
  // Enumerate every generated sitemap chunk, so it remains complete as the site grows.
  const index = await readFile('./public/sitemap/sitemap-index.xml', 'utf8');
  const chunks = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
  const canonicals = new Set<string>();
  for (const chunk of chunks) {
    if (chunk.origin !== 'https://toranalytics.github.io' || !/^\/sitemap\/sitemap-\d+\.xml$/.test(chunk.pathname)) {
      throw new Error(`Unexpected sitemap chunk: ${chunk.href}`);
    }
    const xml = await readFile(path.join('./public', chunk.pathname), 'utf8');
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const url = new URL(match[1]);
      if (url.origin !== chunk.origin) throw new Error(`Unexpected sitemap URL: ${url.href}`);
      const file = path.join('./public', decodeURIComponent(url.pathname), 'index.html');
      const html = await readFile(file, 'utf8');
      const canonicalTag = html.match(/<link\b(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']([^"']+)["'])[^>]*>/i);
      if (canonicalTag) {
        const canonical = new URL(canonicalTag[1]);
        if (canonical.origin !== chunk.origin) throw new Error(`Unexpected canonical URL: ${canonical.href}`);
        canonicals.add(canonical.href);
      }
    }
  }
  if (!canonicals.size) throw new Error('No canonical URLs found for the text sitemap');
  // With one chunk, serve the actual URL list at the recommended root path.
  // If the site outgrows one chunk, preserve Gatsby's generated sitemap index.
  await copyFile(chunks.length === 1 ? path.join('./public', chunks[0].pathname) : './public/sitemap/sitemap-index.xml', './public/sitemap.xml');
  await writeFile('./public/sitemap.txt', [...canonicals].sort().join('\n') + '\n', 'utf8');
};
