import { Link } from 'gatsby';
import React from 'react';

import * as S from './styled';

const STEPS = [
  { name: '기획·제안', num: 'PT 20건+', text: '대행사에서 고객사 제안을 직접 발표했고, 10개 브랜드와 계약했습니다.', to: '', label: '' },
  {
    name: '소재 제작',
    num: '3일 → 30분',
    text: 'AI 이미지·상세페이지 초안 흐름으로 소재 준비 시간을 줄였습니다. 제가 잰 값입니다.',
    to: '/ai-ad-creative-review/',
    label: 'AI 광고 소재 검토 글',
  },
  { name: '세팅·운영', num: '22억+', text: '15개 이상 브랜드에서 누적 광고비 22억 원 이상을 집행했습니다.', to: '', label: '' },
  {
    name: '성과 분석',
    num: '51%',
    text: '한 쇼핑몰의 결제 건수 중 분석 도구에 잡힌 비율입니다. 빠진 주문은 결제 원장과 맞춰 찾았습니다.',
    to: '/naverpay-ad-id-lost/',
    label: '결제수단별 측정 글',
  },
  {
    name: '시스템',
    num: 'all_in_1',
    text: '기획부터 분석까지 한 화면에 모았습니다. 광고 변경은 승인 뒤 실행하고, 계정을 다시 조회해 확인합니다.',
    to: '/verify-after-approved-ad-change/',
    label: '실행 뒤 확인 글',
  },
];

const Scope: React.FC = () => {
  return (
    <S.Wrapper aria-labelledby='scope-heading'>
      <S.Heading id='scope-heading'>한 사람이 이어서 한 일</S.Heading>
      <S.Lead>
        광고 기획부터 분석, 그 일에 쓰는 시스템까지 한 사람이 이어서 맡습니다. 구현은 AI 코딩 에이전트와 하고, 태그 설치 같은 개발 영역은 사내 개발자와 함께 합니다.
      </S.Lead>
      <S.Strip>
        {STEPS.map((step) => (
          <S.Step key={step.name}>
            <S.Name>{step.name}</S.Name>
            <S.Num>{step.num}</S.Num>
            <S.Text>{step.text}</S.Text>
            {step.to && (
              <S.More>
                <Link to={step.to}>{step.label}</Link>
              </S.More>
            )}
          </S.Step>
        ))}
      </S.Strip>
      <S.Note>대행사 실적은 팀 운영 결과입니다. 결제 비율은 3일 표본이라 전체 정확도를 보장하지 않습니다. 회사 이름, 금액, 주문 건수는 싣지 않습니다.</S.Note>
    </S.Wrapper>
  );
};

export default Scope;
