import { Link } from 'gatsby';
import React from 'react';

import * as S from './styled';

const Built: React.FC = () => {
  return (
    <S.Wrapper aria-labelledby='built-heading'>
      <S.Heading id='built-heading'>만든 것</S.Heading>
      <S.Lead>광고를 운영하면서 필요해진 도구를 직접 설계하고, AI 코딩 에이전트로 구현해 업무에 썼다.</S.Lead>
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
            <S.What>광고 기획부터 성과 분석까지 한 흐름으로 묶은 사내 광고 시스템.</S.What>
            <S.Role>구조와 업무 규칙은 혼자 설계하고, 구현은 Claude Code·Codex로 했다. 승인 전에는 광고가 바뀌지 않는다.</S.Role>
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
            <S.What>결제완료 화면에 남지 않는 주문을 결제 원장과 대조하고, 유입 정보와 결제 신호를 주문에 연결하는 도구.</S.What>
            <S.Role>도구 설계와 구현은 직접 했다. 사이트 태그 설치는 사내 개발자와 함께 했다.</S.Role>
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
            <S.What>스프레드시트로 하던 광고 리포트를 웹 화면으로 옮기고, 지표가 나빠진 이유와 다음에 할 일을 같이 보여 주는 분석 화면.</S.What>
            <S.Role>React·Firebase 기반으로, AI 코딩 도구를 써서 구현했다.</S.Role>
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
            <S.What>팀원의 일정과 업무량을 목록·칸반·월간 보기로 한 화면에서 보는 운영 화면.</S.What>
            <S.Role>광고 성과 대시보드와 같은 Console 안의 모듈로, AI 코딩 도구를 써서 구현했다.</S.Role>
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
            <S.What>Claude Code·Codex에 했던 지적을 저장해 뒀다가, 비슷한 일을 시킬 때 원문 그대로 다시 보여 주는 오픈소스 플러그인.</S.What>
            <S.Role>기획·구조 설계·실험·배포는 직접 하고, 구현은 AI 코딩 에이전트로 했다.</S.Role>
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
