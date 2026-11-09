import { css, Global, Theme } from '@emotion/react';
import React from 'react';

import { MOBILE_MEDIA_QUERY } from './const';

const style = (theme: Theme) => css`
  /* Glyph-subset OFL fonts for the home-page cards: JetBrains Mono, Black Han Sans, Nanum Myeongjo, Do Hyeon, Silkscreen. */
  @font-face{font-family:'jbmono';font-weight:800;font-display:swap;src:url(/fonts/jbmono-0.woff2) format('woff2');unicode-range:U+31, U+5f, U+61, U+69, U+6c, U+6e;}
  @font-face{font-family:'blackhan';font-weight:400;font-display:swap;src:url(/fonts/blackhan-0.woff2) format('woff2');unicode-range:U+20, U+1100, U+1103, U+1106, U+110c, U+110e, U+1162, U+1165, U+1169, U+116e, U+1173, U+11a8, U+11bc, U+ac1c-ac1d, U+ac31, U+ac70-ac71, U+ac85, U+ace0-ace1, U+acf5, U+ad6c-ad6d, U+ad81, U+adf8-adf9, U+ae0d, U+b300-b301, U+b315, U+b354-b355, U+b369, U+b3c4-b3c5, U+b3d9, U+b450-b451, U+b465, U+b4dc-b4dd, U+b4f1, U+b9e4-b9e5, U+b9f9, U+ba38-ba39, U+ba4d, U+baa8-baa9, U+babd, U+bb34-bb35, U+bb49, U+bbc0-bbc1, U+bbd5, U+c7ac-c7ad, U+c7c1, U+c800-c801, U+c815, U+c870-c871, U+c885, U+c8fc-c8fd, U+c911, U+c988-c989, U+c99d, U+cc44-cc45, U+cc59, U+cc98-cc99, U+ccad, U+cd08-cd09, U+cd1d, U+cd94-cd95, U+cda9, U+ce20-ce21, U+ce35;}
  @font-face{font-family:'myeongjo';font-weight:800;font-display:swap;src:url(/fonts/myeongjo-0.woff2) format('woff2');unicode-range:U+20, U+1100, U+1103, U+1107, U+1109, U+1162, U+1165, U+1169-116a, U+1173, U+1175, U+11bc, U+ac1c, U+ac31, U+ac70, U+ac85, U+ace0, U+acf5, U+acfc, U+ad11, U+adf8, U+ae0d, U+ae30, U+ae45, U+b300, U+b315, U+b354, U+b369, U+b3c4, U+b3d9, U+b3e0, U+b3f5, U+b4dc, U+b4f1, U+b514, U+b529, U+bc30, U+bc45, U+bc84, U+bc99, U+bcf4, U+bd09, U+bd10, U+bd25, U+be0c, U+be21, U+be44, U+be59, U+c0c8, U+c0dd, U+c11c, U+c131, U+c18c, U+c1a1, U+c1a8, U+c1bd, U+c2a4, U+c2b9, U+c2dc, U+c2f1;}
  @font-face{font-family:'dohyeon';font-weight:400;font-display:swap;src:url(/fonts/dohyeon-0.woff2) format('woff2');unicode-range:U+20, U+1100, U+1103, U+1105, U+1107, U+1109, U+110b-110c, U+1162, U+1165, U+1169-116a, U+1173, U+1175, U+11ab, U+11af, U+11bc, U+ac1c, U+ac20, U+ac24, U+ac31, U+ac70, U+ac74, U+ac78, U+ac85, U+ace0, U+ace4, U+ace8, U+acf5, U+acfc, U+ad00, U+ad04, U+ad11, U+adf8, U+adfc, U+ae00, U+ae0d, U+ae30, U+ae34, U+ae38, U+ae45, U+b300, U+b304, U+b308, U+b315, U+b354, U+b358, U+b35c, U+b369, U+b3c4, U+b3c8, U+b3cc, U+b3d9, U+b3e0, U+b3e4, U+b3e8, U+b3f5, U+b4dc, U+b4e0, U+b4e4, U+b4f1, U+b514, U+b518, U+b51c, U+b529, U+b798, U+b79c, U+b7a0, U+b7ad, U+b7ec, U+b7f0, U+b7f4, U+b801, U+b85c, U+b860, U+b864, U+b871, U+b878, U+b87c, U+b880, U+b88d, U+b974, U+b978, U+b97c, U+b989, U+b9ac, U+b9b0, U+b9b4, U+b9c1, U+bc30, U+bc34, U+bc38, U+bc45, U+bc84, U+bc88, U+bc8c, U+bc99, U+bcf4, U+bcf8, U+bcfc, U+bd09, U+bd10, U+bd14, U+bd18, U+bd25, U+be0c, U+be10, U+be14, U+be21, U+be44, U+be48, U+be4c, U+be59, U+c0c8, U+c0cc, U+c0d0, U+c0dd, U+c11c, U+c120, U+c124, U+c131, U+c18c, U+c190, U+c194, U+c1a1, U+c1a8, U+c1ac, U+c1b0, U+c1bd, U+c2a4, U+c2a8, U+c2ac, U+c2b9, U+c2dc, U+c2e0, U+c2e4, U+c2f1, U+c560, U+c564, U+c568, U+c575, U+c5b4, U+c5b8, U+c5bc, U+c5c9, U+c624, U+c628, U+c62c, U+c639, U+c640, U+c644, U+c648, U+c655, U+c73c, U+c740, U+c744, U+c751, U+c774, U+c778, U+c77c, U+c789, U+c7ac, U+c7b0, U+c7b4, U+c7c1, U+c800, U+c804, U+c808, U+c815, U+c870, U+c874, U+c878, U+c885, U+c88c, U+c890, U+c894, U+c8a1, U+c988, U+c98c, U+c990, U+c99d, U+c9c0, U+c9c4, U+c9c8, U+c9d5;}
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
