import styled from '@emotion/styled';

import { MOBILE_MEDIA_QUERY } from '@/src/styles/const';

export const Wrapper = styled.section`
  width: 100%;
  margin-bottom: 36px;
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
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.color.gray40};
`;

export const Name = styled.h3`
  margin: 0;
  font-size: 18px;
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

export const Flow = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;

  li {
    padding: 4px 8px;
    border: 1px solid ${({ theme }) => theme.color.gray40};
  }

  li[data-human='true'] {
    border-color: ${({ theme }) => theme.color.black40};
    font-weight: 700;
  }

  li[aria-hidden='true'] {
    padding: 0;
    border: 0;
    opacity: 0.6;
  }
`;

export const Shot = styled.img`
  width: 100%;
  height: auto;
  border: 1px solid ${({ theme }) => theme.color.gray40};
`;

export const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  margin-top: auto;
  font-size: 13px;

  a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;
