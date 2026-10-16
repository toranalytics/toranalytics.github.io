import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { MOBILE_MEDIA_QUERY } from '@/src/styles/const';

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const CategoryTitle = styled.div`
  width: fit-content;
  margin-bottom: 15px;
  font-size: 30px;
  text-align: center;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 25px;
  }
`;

export const CategorySubtitle = styled.div`
  padding-bottom: 10px;
  font-size: 20px;
  text-align: center;
  font-family: GmarketSansLight;
`;

export const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-start;
  top: 0px;
  width: 100%;
`;

export const Tabs = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
  gap: 8px;
`;

export const Tab = styled(Link)<{ isSelected: 'true' | 'false' }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid ${({ isSelected, theme }) => (isSelected === 'true' ? theme.color.black100 : theme.color.gray40)};
  border-radius: 24px;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ isSelected, theme }) => (isSelected === 'true' ? theme.color.white100 : theme.color.black40)};
  background-color: ${({ isSelected, theme }) => (isSelected === 'true' ? theme.color.black100 : theme.color.gray10)};

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

export const Count = styled.span`
  font-size: 12px;
  font-variant-numeric: tabular-nums;
`;

export const PostCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
