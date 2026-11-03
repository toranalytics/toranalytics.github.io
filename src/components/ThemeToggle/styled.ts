import styled from '@emotion/styled';

import { MOBILE_MEDIA_QUERY } from '@/src/styles/const';

export const Wrapper = styled.button<{ isDark: boolean }>`
  cursor: pointer;
  border: 0;
  padding: 0;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.color.black100};
    outline-offset: 3px;
  }
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.color.black40};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20px;
  right: 20px;

  .theme-icon {
    color: ${({ theme }) => theme.color.white100};
    width: 20px;
    height: 20px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    top: 50px;
    width: 30px;
    height: 30px;
    .theme-icon {
      width: 15px;
      height: 15px;
    }
  }
`;
