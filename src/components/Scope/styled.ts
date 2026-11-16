import styled from '@emotion/styled';

import { MOBILE_MEDIA_QUERY } from '@/src/styles/const';

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
  margin: 0 0 14px;
  font-size: 15px;
  color: ${({ theme }) => theme.color.gray80};
`;

export const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid ${({ theme }) => theme.color.gray40};
`;

export const Row = styled.li`
  display: grid;
  grid-template-columns: 110px 1fr auto;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray40};
  font-size: 15px;
  line-height: 1.65;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: 1fr;
    gap: 2px;
  }
`;

export const Name = styled.strong`
  font-weight: 700;
`;

export const Text = styled.span`
  color: ${({ theme }) => theme.color.gray80};
`;

export const More = styled.span`
  font-size: 14px;
  white-space: nowrap;

  a {
    text-decoration: underline;
  }
`;

export const Note = styled.p`
  margin: 12px 0 0;
  font-size: 12px;
  line-height: 1.6;
  color: ${({ theme }) => theme.color.gray80};
`;
