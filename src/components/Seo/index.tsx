import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Lang, LANG_TAG, OG_LOCALE } from '../../i18n';

type SeoProps = {
  description?: string;
  title: string;
  /** Page path starting with "/" (used for canonical, og:url and JSON-LD). Omit to skip them. */
  path?: string;
  type?: 'website' | 'article';
  /** ISO date (YYYY-MM-DD) for articles */
  datePublished?: string;
  lang?: Lang;
  /** Other-language versions of this page (hreflang). Include the page itself. */
  alternates?: { lang: Lang; path: string }[];
  /** Language of the x-default alternate (the original) */
  defaultAlternate?: string;
  children?: React.ReactNode;
};

const clean = (text: string) =>
  text
    .replace(/^>\s?/gm, '')
    .replace(/[#*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const Seo: React.FC<SeoProps> = ({ description, title, path, type = 'website', datePublished, lang, alternates, defaultAlternate }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            language
            author {
              name
              nickname
            }
            ogImage
            siteUrl
            analytics {
              goatcounterCode
            }
          }
        }
      }
    `,
  );

  const meta = site.siteMetadata;
  const metaDescription = clean(description || meta.description).slice(0, 300);
  const pageLang: Lang = lang || (meta.language === 'kr' ? 'ko' : (meta.language as Lang)) || 'ko';
  const langTag = LANG_TAG[pageLang] || pageLang;
  const imageUrl = new URL(meta.ogImage, meta.siteUrl).href;
  const pageUrl = path ? new URL(path, meta.siteUrl).href : undefined;
  const goatcounterCode = meta.analytics?.goatcounterCode;

  const jsonLd =
    pageUrl && type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': title.replace(/\s*\|\s*(서준범|Junebeom Seo)$/, ''),
          'description': metaDescription,
          'inLanguage': langTag,
          'url': pageUrl,
          'mainEntityOfPage': pageUrl,
          'image': imageUrl,
          ...(datePublished ? { datePublished, dateModified: datePublished } : {}),
          'author': { '@type': 'Person', 'name': meta.author.name, 'alternateName': meta.author.nickname, 'url': meta.siteUrl },
        }
      : path === '/'
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': meta.title,
          'url': meta.siteUrl,
          'inLanguage': langTag,
          'description': metaDescription,
          'author': { '@type': 'Person', 'name': meta.author.name, 'alternateName': meta.author.nickname, 'url': meta.siteUrl },
        }
      : undefined;

  return (
    <Helmet
      htmlAttributes={{ lang: langTag }}
      title={title}
      defaultTitle={meta.title}
      link={[
        ...(pageUrl ? [{ rel: 'canonical', href: pageUrl }] : []),
        ...(alternates && alternates.length > 1
          ? [
              ...alternates.map((a) => ({ rel: 'alternate', hrefLang: LANG_TAG[a.lang], href: new URL(a.path, meta.siteUrl).href })),
              ...(defaultAlternate ? [{ rel: 'alternate', hrefLang: 'x-default', href: new URL(defaultAlternate, meta.siteUrl).href }] : []),
            ]
          : []),
      ]}
      script={[
        ...(jsonLd ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }] : []),
        ...(goatcounterCode
          ? [
              {
                'async': true,
                'src': '//gc.zgo.at/count.js',
                'data-goatcounter': `https://${goatcounterCode}.goatcounter.com/count`,
              },
            ]
          : []),
      ]}
      meta={[
        { property: 'og:title', content: title },
        { property: 'og:site_name', content: meta.title },
        { property: 'og:locale', content: OG_LOCALE[pageLang] },
        ...(alternates || []).filter((a) => a.lang !== pageLang).map((a) => ({ property: 'og:locale:alternate', content: OG_LOCALE[a.lang] })),
        { name: 'description', content: metaDescription },
        { property: 'og:description', content: metaDescription },
        { property: 'og:type', content: type },
        ...(pageUrl ? [{ property: 'og:url', content: pageUrl }] : []),
        ...(type === 'article' && datePublished
          ? [
              { property: 'article:published_time', content: datePublished },
              { property: 'article:author', content: meta.author.name },
            ]
          : []),
        { property: 'og:image', content: imageUrl },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: metaDescription },
        { name: 'twitter:image', content: imageUrl },
      ]}
    />
  );
};

Seo.defaultProps = {
  description: ``,
};

Seo.propTypes = {
  description: PropTypes.string as React.Validator<string>,
  title: PropTypes.string.isRequired,
};

export default Seo;
