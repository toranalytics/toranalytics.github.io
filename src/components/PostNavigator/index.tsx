import React from 'react';

import { Lang, t } from '@/src/i18n';
import PostClass from '@/src/models/post';

import * as S from './styled';

type PostNavigatorProps = {
  prevPost: PostClass;
  nextPost: PostClass;
  lang?: Lang;
};

const PostNavigator: React.FC<PostNavigatorProps> = ({ prevPost, nextPost, lang = 'ko' }) => {
  return (
    <S.Wrapper>
      <div>
        {nextPost && (
          <S.PostCard className='prev' key={nextPost.id} to={nextPost.slug}>
            <S.Direction>{t(lang).prev}</S.Direction>
            <S.Title>{nextPost.title}</S.Title>
          </S.PostCard>
        )}
      </div>
      <div>
        {prevPost && (
          <S.PostCard className='next' key={prevPost.id} to={prevPost.slug}>
            <S.Direction>{t(lang).next}</S.Direction>
            <S.Title>{prevPost.title}</S.Title>
          </S.PostCard>
        )}
      </div>
    </S.Wrapper>
  );
};

export default PostNavigator;
