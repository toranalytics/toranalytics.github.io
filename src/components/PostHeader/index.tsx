import React from 'react';

import { categoryOf } from '@/src/categories';
import PostClass from '@/src/models/post';

import * as S from './styled';

type PostHeaderProps = {
  post: PostClass;
};

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  return (
    <S.Header>
      {post.emoji && <S.Emoji>{post.emoji}</S.Emoji>}
      <S.Categories aria-label='글 경로'>
        <S.Category to='/posts'>글</S.Category>
        <span aria-hidden='true'>›</span>
        <S.Category to={`/posts/${post.category}`}>{post.categoryTitle}</S.Category>
      </S.Categories>
      <S.CategoryDescription>{categoryOf(post.category)?.description}</S.CategoryDescription>
      {post.tags.length > 0 && (
        <S.Tags aria-label='태그'>
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
