import React from 'react';

import PostCard from '@/src/components/PostCard';
import Seo from '@/src/components/Seo';
import Layout from '@/src/layout';
import PostClass from '@/src/models/post';
import { AllMarkdownRemark } from '@/src/type';

import * as S from './styled';

type PostsTemplateProps = {
  location: Location;
  pageContext: {
    currentCategory: string;
    categories: { slug: string; title: string; description: string; count: number }[];
    edges: AllMarkdownRemark['edges'];
  };
};

const PostsTemplate: React.FC<PostsTemplateProps> = ({ location, pageContext }) => {
  const { edges, currentCategory } = pageContext;
  const { categories } = pageContext;
  const currentTabIndex = categories.findIndex((category) => category.slug === currentCategory);
  const posts = edges.map(({ node }) => new PostClass(node));

  return (
    <Layout location={location}>
      <Seo title='서준범 | Posts' />
      <S.CategoryWrapper>
        <S.CategoryTitle>{categories[currentTabIndex].title}</S.CategoryTitle>
        <S.CategorySubtitle>{`${categories[currentTabIndex].description} · 글 ${posts.length}개`}</S.CategorySubtitle>
      </S.CategoryWrapper>

      <S.TabWrapper>
        <S.Tabs aria-label='글 카테고리'>
          {categories.map(({ slug, title, count }, index) => (
            <S.Tab
              key={slug}
              to={slug ? `/posts/${slug}` : `/posts`}
              aria-current={currentTabIndex === index ? 'page' : undefined}
              isSelected={currentTabIndex === index ? 'true' : 'false'}
            >
              {title} <S.Count>{count}</S.Count>
            </S.Tab>
          ))}
        </S.Tabs>

        <S.PostCardsWrapper>
          {posts.length === 0 && (
            <div style={{ opacity: 0.6, padding: '40px 0' }}>아직 이 카테고리의 글이 없습니다.</div>
          )}
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </S.PostCardsWrapper>
      </S.TabWrapper>
    </Layout>
  );
};

export default PostsTemplate;
