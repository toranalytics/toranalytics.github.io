import styled from '@emotion/styled';

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-width: 0;
  margin-bottom: 30px;
`;

export const RelatedPosts = styled.section`
  width: 100%;
  padding: 24px;
  margin-bottom: 30px;
  border: 1px solid ${({ theme }) => theme.color.gray20};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.gray10};
  overflow-wrap: anywhere;

  h2 {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  li + li {
    border-top: 1px solid ${({ theme }) => theme.color.gray20};
  }

  a {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px 16px;
    padding: 10px 0;
    font-size: 14px;
    line-height: 1.7;

    &:hover,
    &:focus-visible {
      text-decoration: underline;
    }
  }

  time {
    color: ${({ theme }) => theme.color.gray80};
    font-size: 12px;
    white-space: nowrap;
  }
`;

export const BuyMeACoffeeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  gap: 20px;
`;
