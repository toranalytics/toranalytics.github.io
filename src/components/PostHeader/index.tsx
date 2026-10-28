import React from 'react';

import { categoryOf } from '@/src/categories';
import { categoryText, t } from '@/src/i18n';
import PostClass from '@/src/models/post';

import * as S from './styled';

type PostHeaderProps = {
  post: PostClass;
};

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  return (
    <S.Header>
      {post.emoji && <S.Emoji>{post.emoji}</S.Emoji>}
      <S.Categories aria-label={t(post.lang).path}>
        <S.Category to={`/${post.lang}/posts`}>{t(post.lang).posts}</S.Category>
        <span aria-hidden='true'>›</span>
        <S.Category to={`/posts/${post.category}`}>{post.categoryTitle}</S.Category>
      </S.Categories>
      <S.CategoryDescription>{categoryText(post.category, post.lang)?.description ?? categoryOf(post.category)?.description}</S.CategoryDescription>
      {post.tags.length > 0 && (
        <S.Tags aria-label={t(post.lang).tags}>
          {post.tags.map((tag, index) => (
            <S.Tag key={`${tag}-${index}`}>#{tag}</S.Tag>
          ))}
        </S.Tags>
      )}

      <S.Title>{post.title}</S.Title>
      <S.Info>{post.date}</S.Info>
    </S.Header>
  );
};

export default PostHeader;
