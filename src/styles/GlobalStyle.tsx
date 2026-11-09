import { css, Global, Theme } from '@emotion/react';
import React from 'react';

import { MOBILE_MEDIA_QUERY } from './const';

const style = (theme: Theme) => css`
  /* Glyph-subset OFL fonts for the home-page cards: JetBrains Mono, Black Han Sans, Nanum Myeongjo, Silkscreen. */
  @font-face{font-family:'jbmono';font-weight:800;font-display:swap;src:url(/fonts/jbmono-0.woff2) format('woff2');unicode-range:U+31, U+5f, U+61, U+69, U+6c, U+6e;}
  @font-face{font-family:'blackhan';font-weight:400;font-display:swap;src:url(/fonts/blackhan-0.woff2) format('woff2');unicode-range:U+20, U+1100, U+1103, U+1106, U+110c, U+110e, U+1162, U+1165, U+1169, U+116e, U+1173, U+11a8, U+11bc, U+ac1c-ac1d, U+ac31, U+ac70-ac71, U+ac85, U+ace0-ace1, U+acf5, U+ad6c-ad6d, U+ad81, U+adf8-adf9, U+ae0d, U+b300-b301, U+b315, U+b354-b355, U+b369, U+b3c4-b3c5, U+b3d9, U+b450-b451, U+b465, U+b4dc-b4dd, U+b4f1, U+b9e4-b9e5, U+b9f9, U+ba38-ba39, U+ba4d, U+baa8-baa9, U+babd, U+bb34-bb35, U+bb49, U+bbc0-bbc1, U+bbd5, U+c7ac-c7ad, U+c7c1, U+c800-c801, U+c815, U+c870-c871, U+c885, U+c8fc-c8fd, U+c911, U+c988-c989, U+c99d, U+cc44-cc45, U+cc59, U+cc98-cc99, U+ccad, U+cd08-cd09, U+cd1d, U+cd94-cd95, U+cda9, U+ce20-ce21, U+ce35;}
  @font-face{font-family:'myeongjo';font-weight:800;font-display:swap;src:url(/fonts/myeongjo-0.woff2) format('woff2');unicode-range:U+20, U+1103, U+1105-1107, U+1109, U+110f-1111, U+1161-1162, U+1166, U+1169, U+1173, U+1175, U+11bc, U+b2e4, U+b2f9, U+b300, U+b315, U+b370, U+b385, U+b3c4, U+b3d9, U+b4dc, U+b4f1, U+b514, U+b529, U+b77c, U+b791, U+b798, U+b7ad, U+b808, U+b81d, U+b85c, U+b871, U+b974, U+b989, U+b9ac, U+b9c1, U+b9c8, U+b9dd, U+b9e4, U+b9f9, U+ba54, U+ba69, U+baa8, U+babd, U+bbc0, U+bbd5, U+bbf8, U+bc0d, U+bc14, U+bc29, U+bc30, U+bc45, U+bca0, U+bcb5, U+bcf4, U+bd09, U+be0c, U+be21, U+be44, U+be59, U+c0ac, U+c0c1, U+c0c8, U+c0dd, U+c138, U+c14d, U+c18c, U+c1a1, U+c2a4, U+c2b9, U+c2dc, U+c2f1, U+ce74, U+ce89, U+ce90, U+cea5, U+cf00, U+cf15, U+cf54, U+cf69, U+d06c, U+d081, U+d0a4, U+d0b9, U+d0c0, U+d0d5, U+d0dc, U+d0f1, U+d14c, U+d161, U+d1a0, U+d1b5, U+d2b8, U+d2cd, U+d2f0, U+d305, U+d30c, U+d321, U+d328, U+d33d, U+d398, U+d3ad, U+d3ec, U+d401, U+d504, U+d519, U+d53c, U+d551;}
  @font-face{font-family:'silkscreen';font-weight:700;font-display:swap;src:url(/fonts/silkscreen-0.woff2) format('woff2');unicode-range:U+20, U+41, U+44-45, U+4c, U+4f, U+54-55, U+59;}

  * {
    box-sizing: border-box;
    appearance: none;
  }

  html {
    font-family: 'GmarketSansMedium';
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    font-size: 14px;
    color: ${theme.color.black100};
    background-color: ${theme.color.gray10};

    a {
      color: ${theme.color.black100};
      text-decoration: none;
    }
  }

  body {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .pc-only {
    display: block;
    @media ${MOBILE_MEDIA_QUERY} {
      display: none;
    }
  }

  .mobile-only {
    display: none;
    @media ${MOBILE_MEDIA_QUERY} {
      display: block;
    }
  }

  .markdown {
    font-family: 'Noto Sans KR', sans-serif;
    --link-text-color: ${theme.color.black60};
    --markdown-border-color: ${theme.color.gray40};
    --markdown-blockquote-border-color: ${theme.color.gray40};
    --markdown-table-border-color: ${theme.color.gray40};
    --markdown-table-even-cell-background-color: ${theme.color.gray10};
    --markdown-table-header-background-color: ${theme.color.gray20};
    --markdown-box-background-color: ${theme.color.gray10};
  }

  .scroll-locked {
    overflow: hidden;
  }
`;

const GlobalStyle: React.FC = () => <Global styles={style} />;

export default GlobalStyle;
