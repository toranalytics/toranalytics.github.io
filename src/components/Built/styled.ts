import styled from '@emotion/styled';

import { MOBILE_MEDIA_QUERY } from '@/src/styles/const';

const MONO = `'jbmono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
const SERIF = `'myeongjo', 'Apple Myungjo', 'Noto Serif KR', Georgia, serif`;
const BLACK = `'blackhan', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif`;
const DOHYEON = `'dohyeon', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif`;
const PIXEL = `'silkscreen', ui-monospace, Menlo, monospace`;

export const Wrapper = styled.section`
  width: 100%;
  margin-bottom: 40px;
`;

export const Heading = styled.h2`
  font-size: 20px;
  width: fit-content;
  padding: 10px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.color.black40};
  color: ${({ theme }) => theme.color.white100};
  border: 1px solid ${({ theme }) => theme.color.white100};

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 17px;
    padding: 8px 10px;
  }
`;

export const Lead = styled.p`
  margin: 0 0 20px;
  font-size: 15px;
  color: ${({ theme }) => theme.color.gray80};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 0;
  border: 1px solid ${({ theme }) => theme.color.gray40};
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &[data-span='2'] {
    grid-column: span 2;
  }

  &[data-row='true'] {
    flex-direction: row;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 0 ${({ theme }) => theme.color.gray20};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    &[data-span] {
      grid-column: auto;
    }

    &[data-row='true'] {
      flex-direction: column;
    }
  }
`;

export const Visual = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray40};

  [data-row='true'] > & {
    width: 55%;
    align-self: flex-start;
    border-bottom: 0;
    border-right: 1px solid ${({ theme }) => theme.color.gray40};

    @media ${MOBILE_MEDIA_QUERY} {
      width: 100%;
      border-right: 0;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray40};
    }
  }
`;

export const Eyebrow = styled.p`
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.color.gray80};
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  min-height: 48px;
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
`;

export const What = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
`;

export const Role = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.color.gray80};
`;

export const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  margin-top: auto;
  padding-top: 4px;
  font-size: 13px;

  a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

/* One title style per service so each card reads as its own thing. */
export const NameMono = styled.h3`
  margin: 0;
  font-family: ${MONO};
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;

  span {
    color: #d9482b;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 32px;
  }
`;

export const NameBold = styled.h3`
  margin: 0;
  font-family: ${BLACK};
  font-size: 32px;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.15;

  small {
    margin-left: 8px;
    font-family: inherit;
    font-size: 20px;
    opacity: 0.5;
  }
`;

export const NameCaps = styled.h3`
  margin: 0;
  font-family: ${PIXEL};
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.2;
`;

export const NameSerif = styled.h3`
  margin: 0;
  width: fit-content;
  padding-bottom: 4px;
  font-family: ${SERIF};
  font-size: 30px;
  font-weight: 800;
  line-height: 1.25;
  border-bottom: 3px solid #d9482b;
`;

export const NameDo = styled.h3`
  margin: 0;
  font-family: ${DOHYEON};
  font-size: 34px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.15;
`;
