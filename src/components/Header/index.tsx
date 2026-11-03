import React from 'react';

import * as S from './styled';

type HeaderProps = {
  title: string;
  location: Location;
};

const Header: React.FC<HeaderProps> = ({ title, location }) => {
  const { pathname } = location;

  return (
    <S.Wrapper>
      <S.Header>
        <div>
          <div className='pc-only'>
            <S.MenuLink to='/' isselected='false'>
              {title}
            </S.MenuLink>
          </div>
          <div className='mobile-only mobile-logo'>
            <S.MenuLink to='/' isselected='false'>
              T
            </S.MenuLink>
          </div>
        </div>
        <S.Menu aria-label='주요 메뉴'>
          <S.MenuLink to='/posts' isselected={pathname.includes('/posts').toString()}>
            posts
          </S.MenuLink>
          <S.MenuLink to='/about' isselected={/^\/about\/?$/.test(pathname).toString()}>
            about
          </S.MenuLink>
          <S.MenuLink to='/playground' isselected={/^\/playground\/?$/.test(pathname).toString()}>
            playground
          </S.MenuLink>
        </S.Menu>
      </S.Header>
    </S.Wrapper>
  );
};

export default Header;
