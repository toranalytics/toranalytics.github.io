import styled from '@emotion/styled';

import { MOBILE_MEDIA_QUERY } from '@/src/styles/const';

const MONO = `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
const SERIF = `'Iowan Old Style', 'Apple Myungjo', 'Noto Serif KR', Georgia, serif`;

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
  grid-template-columns: repeat(6, 1fr);
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

  &[data-span='6'] {
    grid-column: span 6;
  }

  &[data-span='3'] {
    grid-column: span 3;
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
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;

  span {
    color: #f59e0b;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 32px;
  }
`;

export const NameBold = styled.h3`
  margin: 0;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1.15;

  small {
    margin-left: 6px;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: -0.02em;
    opacity: 0.55;
  }
`;

export const NameCaps = styled.h3`
  margin: 0;
  font-family: ${MONO};
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  line-height: 1.2;
`;

export const NameSerif = styled.h3`
  margin: 0;
  width: fit-content;
  padding-bottom: 4px;
  font-family: ${SERIF};
  font-size: 27px;
  font-weight: 700;
  line-height: 1.25;
  border-bottom: 3px solid #c2410c;
`;
