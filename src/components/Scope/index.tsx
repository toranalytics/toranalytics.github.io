import { Link } from 'gatsby';
import React from 'react';

import * as S from './styled';

const STEPS = [
  {
    name: '기획',
    text: '서비스마다 광고에서 꺼낼 이야기와 방향을 정합니다. 대행사에서는 고객사 PT를 20건 넘게 직접 발표했고, 10개 브랜드와 계약했습니다.',
    to: '',
    label: '',
  },
  {
    name: '소재 제작',
    text: '메시지와 카피를 정하고 AI로 이미지·영상 시안을 만들어, 11개 항목 자동 검사를 거쳐 광고 전달표로 내보냅니다. 대행사에서는 소재 준비를 3일에서 30분으로 줄였습니다. 제가 잰 값입니다.',
    to: '/ai-ad-creative-review/',
    label: 'AI 광고 소재 검토 글',
  },
  {
    name: '세팅',
    text: '메타·구글·네이버 매체 API로 성과를 모으고, 승인된 광고 변경은 API로 실행한 뒤 계정을 다시 조회해 확인합니다. 대행사에서는 15개 이상 브랜드, 누적 광고비 22억 원 넘게 집행했습니다.',
    to: '/verify-after-approved-ad-change/',
    label: '실행 뒤 확인 글',
  },
  {
    name: '성과 분석',
    text: '대행사에서 매일 아침 성과가 시트에 채워지는 리포트를 자동화했습니다. 무브에서는 한 쇼핑몰의 결제 건수 중 51%만 분석 도구에 잡히던 것을 결제 원장과 맞춰 찾았습니다.',
    to: '/naverpay-ad-id-lost/',
    label: '결제수단별 측정 글',
  },
  {
    name: '운영 시스템',
    text: '이 네 가지를 한 화면에 모은 all_in_1을 직접 설계하고 AI 코딩 에이전트로 구현해, 수집과 판단과 리포트 갱신을 매일 자동으로 돌립니다.',
    to: '/ai-ad-creative-review/',
    label: '',
  },
];

const Scope: React.FC = () => {
  return (
    <S.Wrapper aria-labelledby='scope-heading'>
      <S.Heading id='scope-heading'>한 사람이 이어서 한 일</S.Heading>
      <S.Lead>기획, 소재 제작, 세팅, 분석을 한 사람이 맡고, 이 일을 자동으로 돌리는 운영 시스템도 직접 만듭니다. 구현은 AI 코딩 에이전트와 하고, 태그 설치 같은 개발은 사내 개발자와 함께 합니다.</S.Lead>
      <S.List>
        {STEPS.map((step) => (
          <S.Row key={step.name}>
            <S.Name>{step.name}</S.Name>
            <S.Text>{step.text}</S.Text>
            <S.More>{step.to && <Link to={step.to}>{step.label}</Link>}</S.More>
          </S.Row>
        ))}
      </S.List>
      <S.Note>대행사 실적은 팀 운영 결과입니다. 결제 비율은 3일 표본이라 전체 정확도를 보장하지 않습니다. 회사 이름, 금액, 주문 건수는 싣지 않습니다.</S.Note>
    </S.Wrapper>
  );
};

export default Scope;
