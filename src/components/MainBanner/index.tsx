import { useState } from 'react';

import { Author } from '@/src/type';

import Image from '../Image';
import * as S from './styled';

type MainBannerProps = {
  author: Author;
};

const MainBanner: React.FC<MainBannerProps> = ({ author }) => {
  const { social, name, dropdown } = author;

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  return (
    <S.Wrapper>
      <S.IntroWrapper>
        <S.Title>
          안녕하세요!
          <br />
          광고를 운영하며 <strong>마케팅 시스템</strong>을
          <br />
          직접 만드는 마케팅 엔지니어
          <br />
          <strong>{name}</strong>
          입니다.
        </S.Title>
        <Image alt='thumbnail' src='thumbnail.png' />
        <S.SocialWrapper>
          {Object.keys(social).map(
            (link, index) =>
              social[link as keyof typeof social] && (
                <S.SocialButton key={index} target='_blank' href={social[link as keyof typeof social]}>
                  {link}
                </S.SocialButton>
              ),
          )}
          {/* space-between을 위한 빈 div */}
          <div />
          {Object.values(dropdown).some(Boolean) && (
            <S.DropdownButton onMouseLeave={() => setIsDropdownOpened(false)}>
              <div onMouseEnter={() => setIsDropdownOpened(true)}>etc.</div>
              {isDropdownOpened && (
                <S.Dropdown>
                  {Object.keys(dropdown).map(
                    (link, index) =>
                      dropdown[link as keyof typeof dropdown] && (
                        <S.SocialButton key={index} target='_blank' href={dropdown[link as keyof typeof dropdown]}>
                          {link}
                        </S.SocialButton>
                      ),
                  )}
                </S.Dropdown>
              )}
            </S.DropdownButton>
          )}
        </S.SocialWrapper>
      </S.IntroWrapper>
    </S.Wrapper>
  );
};

export default MainBanner;
