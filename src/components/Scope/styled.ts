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
  margin: 0 0 18px;
  font-size: 15px;
  color: ${({ theme }) => theme.color.gray80};
`;

export const Strip = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: 1fr;
  }
`;

export const Step = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 14px 12px;
  border: 1px solid ${({ theme }) => theme.color.gray40};
`;

export const Name = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray80};
`;

export const Num = styled.strong`
  display: block;
  margin: 6px 0 8px;
  font-size: 22px;
  line-height: 1.2;
  letter-spacing: -0.01em;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.color.gray80};
`;

export const More = styled.span`
  margin-top: auto;
  padding-top: 10px;
  font-size: 13px;

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
