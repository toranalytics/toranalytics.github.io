import { Link } from 'gatsby';
import React from 'react';

import * as S from './styled';

const FLOW = [
  { label: '기획' },
  { label: '소재 제작' },
  { label: '사람 승인', human: true },
  { label: '집행' },
  { label: '다시 조회' },
];

const Built: React.FC = () => {
  return (
    <S.Wrapper aria-labelledby='built-heading'>
      <S.Heading id='built-heading'>만든 것</S.Heading>
      <S.Lead>광고를 운영하면서 필요해진 도구를 직접 설계하고, AI 코딩 에이전트로 구현해 업무에 썼다.</S.Lead>
      <S.Grid>
        <S.Card>
          <S.Name>all_in_1</S.Name>
          <S.What>광고 기획부터 성과 분석까지 한 흐름으로 묶은 사내 광고 시스템.</S.What>
          <S.Flow aria-label='all_in_1 작업 흐름'>
            {FLOW.map((step, i) => (
              <React.Fragment key={step.label}>
                {i > 0 && <li aria-hidden='true'>→</li>}
                <li data-human={step.human ? 'true' : 'false'}>{step.label}</li>
              </React.Fragment>
            ))}
          </S.Flow>
          <S.Role>구조와 업무 규칙은 혼자 설계하고, 구현은 Claude Code·Codex로 했다. 승인 전에는 광고가 바뀌지 않는다.</S.Role>
          <S.Links>
            <Link to='/ai-ad-creative-review/'>AI 광고 소재 검토 글</Link>
          </S.Links>
        </S.Card>

        <S.Card>
          <S.Name>구매 측정 도구</S.Name>
          <S.What>결제완료 화면에 남지 않는 주문을 결제 원장과 대조하고, 유입 정보와 결제 신호를 주문에 연결하는 도구.</S.What>
          <S.Role>도구 설계와 구현은 직접 했다. 사이트 태그 설치는 사내 개발자와 함께 했다.</S.Role>
          <S.Links>
            <Link to='/reconcile-different-records/'>서로 다른 기록을 맞춰 본 글</Link>
          </S.Links>
        </S.Card>

        <S.Card>
          <S.Name>Dude Toldya</S.Name>
          <S.What>Claude Code·Codex에 했던 지적을 저장해 뒀다가, 비슷한 일을 시킬 때 원문 그대로 다시 보여 주는 오픈소스 플러그인.</S.What>
          <S.Shot src='/img/otw-before-after-ko.png' alt='Dude Toldya를 쓰기 전과 쓴 뒤의 응답 비교 화면' loading='lazy' />
          <S.Role>기획·구조 설계·실험·배포는 직접 하고, 구현은 AI 코딩 에이전트로 했다.</S.Role>
          <S.Links>
            <a href='https://github.com/toranalytics/dude-toldya' target='_blank' rel='noreferrer'>
              GitHub
            </a>
            <Link to='/otw-what-it-does/'>만든 이유 글</Link>
            <a href='/otw-recall-lab.html'>데모</a>
          </S.Links>
        </S.Card>

        <S.Card>
          <S.Name>마케팅 리포트 대시보드</S.Name>
          <S.What>광고 결과를 보는 사람이 지금 상황을 이해하도록 설명을 붙인 분석 화면.</S.What>
          <S.Role>이전 직장에서 React·Firebase 기반으로 AI 코딩 도구를 써서 구현했다.</S.Role>
          <S.Links>
            <Link to='/marketing-report-dashboard/'>만든 과정 글</Link>
          </S.Links>
        </S.Card>
      </S.Grid>
    </S.Wrapper>
  );
};

export default Built;
