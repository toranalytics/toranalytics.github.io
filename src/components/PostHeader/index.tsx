import React from 'react';

import PostClass from '@/src/models/post';

import * as S from './styled';

type PostHeaderProps = {
  post: PostClass;
};

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  return (
    <S.Header>
      {post.emoji && <S.Emoji>{post.emoji}</S.Emoji>}
      <S.Categories>
        <S.Category to={`/posts/${post.category}`}>{post.categoryTitle}</S.Category>
        {post.tags.map((tag) => (
          <span key={tag} style={{ marginLeft: 8, opacity: 0.6 }}>
            #{tag}
          </span>
        ))}
      </S.Categories>

      <S.Title>{post.title}</S.Title>
      <S.Info>{post.date}</S.Info>
    </S.Header>
  );
};

export default PostHeader;
