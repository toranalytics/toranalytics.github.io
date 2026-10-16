import { navigate } from 'gatsby';
import React, { useEffect, useMemo, useRef } from 'react';

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
  const currentTabIndex = useMemo(
    () => categories.findIndex((category) => category.slug === currentCategory),
    [categories, currentCategory],
  );
  const posts = edges.map(({ node }) => new PostClass(node));

  const onTabIndexChange = (value: number) => {
    const { slug } = categories[value];
    navigate(slug ? `/posts/${slug}` : `/posts`);
  };

  const ref = useRef<HTMLDivElement>(null);

  // currentTab이 가운데에 오도록 스크롤
  useEffect(() => {
    if (!ref.current) return;
    const currentTab = ref.current.children[currentTabIndex] as HTMLDivElement;
    ref.current.scrollTo({ left: currentTab.offsetLeft - (ref.current.offsetWidth - currentTab.offsetWidth) / 2 });
  }, []);

  return (
    <Layout location={location}>
      <Seo title='서준범 | Posts' />
      <S.CategoryWrapper>
        <S.CategoryTitle>{categories[currentTabIndex].title}</S.CategoryTitle>
        <S.CategorySubtitle>{`${categories[currentTabIndex].description} · 글 ${posts.length}개`}</S.CategorySubtitle>
      </S.CategoryWrapper>

      <S.TabWrapper>
        <S.Tabs ref={ref}>
          {categories.map(({ title, count }, index) => (
            <S.Tab
              key={index}
              isSelected={currentTabIndex === index ? 'true' : 'false'}
              onClick={() => onTabIndexChange(index)}
            >
              {title} <span style={{ opacity: 0.5 }}>{count}</span>
            </S.Tab>
          ))}
        </S.Tabs>

        <S.PostCardsWrapper>
          {posts.length === 0 && <div style={{ opacity: 0.6, padding: '40px 0' }}>아직 이 카테고리의 글이 없습니다.</div>}
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </S.PostCardsWrapper>
      </S.TabWrapper>
    </Layout>
  );
};

export default PostsTemplate;
