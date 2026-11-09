import { Link } from 'gatsby';
import React from 'react';

import * as S from './styled';

const Built: React.FC = () => {
  return (
    <S.Wrapper aria-labelledby='built-heading'>
      <S.Heading id='built-heading'>만든 것</S.Heading>
      <S.Lead>광고를 운영하면서 필요해진 도구를 직접 설계하고, AI 코딩 에이전트로 구현해 업무에 썼습니다.</S.Lead>
      <S.Grid>
        <S.Card>
          <S.Visual
            src='/img/built-all-in-1.svg'
            alt='all_in_1 작업 흐름: 기획, 소재 제작, 사람 승인, 집행, 다시 조회. 사람 승인 단계가 강조되어 있다.'
            width='600'
            height='520'
            loading='lazy'
          />
          <S.Body>
            <S.Eyebrow>현재 직장 · 무브</S.Eyebrow>
            <S.TitleBox>
              <S.NameMono>
                all_in_1<span>_</span>
              </S.NameMono>
            </S.TitleBox>
            <S.What>기획, 소재, 집행, 분석이 한 사람에게 묶여 있어서, 반복되는 확인과 판단을 프로그램으로 옮겼습니다.</S.What>
            <S.Role>업무 규칙과 구조는 혼자 설계했고, 구현은 CLI에서 Claude Code·Codex로 했습니다. 승인 전에는 광고가 바뀌지 않고, 실행 뒤에는 계정을 다시 조회합니다.</S.Role>
            <S.Links>
              <Link to='/ai-ad-creative-review/'>AI 광고 소재 검토 글</Link>
            </S.Links>
          </S.Body>
        </S.Card>

        <S.Card>
          <S.Visual
            src='/img/built-measure.svg'
            alt='구매 측정 도식: 결제완료 화면에 없는 주문을 결제 원장에서 찾아 맞춰 본다.'
            width='600'
            height='520'
            loading='lazy'
          />
          <S.Body>
            <S.Eyebrow>현재 직장 · 무브</S.Eyebrow>
            <S.TitleBox>
              <S.NameBold>
                구매 측정<small>도구</small>
              </S.NameBold>
            </S.TitleBox>
            <S.What>결제완료 화면이 떠야만 구매가 기록되는 구조라 네이버페이와 가상계좌 주문이 광고 성과에서 빠졌습니다. 이 주문을 결제 원장과 대조하고, 유입 정보와 결제 신호를 주문에 연결하는 도구를 만들었습니다.</S.What>
            <S.Role>도구는 설계하고 AI 에이전트로 구현했습니다. 사이트 태그 설치는 사내 개발자와 함께 했고, 시각·금액 대조에 의한 귀속은 추정으로 구분합니다.</S.Role>
            <S.Links>
              <Link to='/reconcile-different-records/'>서로 다른 기록을 맞춰 본 글</Link>
            </S.Links>
          </S.Body>
        </S.Card>

        <S.Card>
          <S.Visual
            src='/img/built-dashboard.svg'
            alt='광고 성과 대시보드 도식: 막대그래프 아래에 무슨 일이 있었는지, 왜 이 숫자인지, 다음에 볼 것을 설명으로 붙인다.'
            width='600'
            height='520'
            loading='lazy'
          />
          <S.Body>
            <S.Eyebrow>이전 직장 · 와이낫애드컴퍼니</S.Eyebrow>
            <S.TitleBox>
              <S.NameSerif>광고 성과 대시보드</S.NameSerif>
            </S.TitleBox>
            <S.What>매일 아침 브랜드마다 광고 계정에 들어가 전날 숫자를 시트로 옮기던 일을 자동화하고, 숫자 옆에 확인할 항목을 붙인 분석 화면까지 만들었습니다.</S.What>
            <S.Role>기획과 설계는 제가 했고, React·Firebase 화면은 AI 코딩 도구로 구현했습니다. 규칙은 점검할 항목을 제안할 뿐 원인을 확정하지 않습니다.</S.Role>
            <S.Links>
              <Link to='/marketing-report-dashboard/'>만든 과정 글</Link>
            </S.Links>
          </S.Body>
        </S.Card>

        <S.Card>
          <S.Visual
            src='/img/built-calendar.svg'
            alt='일정관리 대시보드 도식: 목록, 칸반, 월간 보기 탭과 담당자별로 색이 다른 일정, 담당자별 업무량 막대.'
            width='600'
            height='520'
            loading='lazy'
          />
          <S.Body>
            <S.Eyebrow>이전 직장 · 와이낫애드컴퍼니</S.Eyebrow>
            <S.TitleBox>
              <S.NameDo>일정관리 대시보드</S.NameDo>
            </S.TitleBox>
            <S.What>팀원의 일정과 업무량을 목록, 칸반, 월간 보기로 한 화면에서 보는 운영 화면입니다.</S.What>
            <S.Role>광고 성과 대시보드와 같은 Console 안의 모듈로, AI 코딩 도구를 써서 구현했습니다.</S.Role>
          </S.Body>
        </S.Card>

        <S.Card data-span='2' data-row='true'>
          <S.Visual
            src='/img/otw-before-after-ko.png'
            alt='Dude Toldya를 쓰기 전과 쓴 뒤의 응답 비교 화면'
            width='1208'
            height='596'
            loading='lazy'
          />
          <S.Body>
            <S.Eyebrow>개인 프로젝트 · 오픈소스</S.Eyebrow>
            <S.TitleBox>
              <S.NameCaps>Dude Toldya</S.NameCaps>
            </S.TitleBox>
            <S.What>AI 코딩 도구에 같은 지적을 계속 반복하게 돼서, 이전 지적 중 관련 있는 것을 원문 그대로 다음 요청 앞에 보여 주는 Claude Code·Codex 플러그인을 만들었습니다.</S.What>
            <S.Role>기획, 구조 설계, 실험 설계, 배포는 혼자 했고, 코드는 AI 코딩 에이전트가 썼습니다.</S.Role>
            <S.Links>
              <a href='https://github.com/toranalytics/dude-toldya' target='_blank' rel='noreferrer'>
                GitHub
              </a>
              <Link to='/otw-what-it-does/'>만든 이유 글</Link>
              <a href='/otw-recall-lab.html'>데모</a>
            </S.Links>
          </S.Body>
        </S.Card>
      </S.Grid>
    </S.Wrapper>
  );
};

export default Built;
