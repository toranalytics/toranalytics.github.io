# toranalytics.github.io

마케팅 엔지니어 서준범의 블로그입니다: https://toranalytics.github.io

- 글 쓰기: `content/<글-이름>/index.md` 를 만들고 main 에 push 하면 GitHub Actions 가 빌드해서 배포합니다.
- 프로필과 소개: `gatsby-site-meta-data.ts`
- 로컬 미리보기: Node 18, `yarn install && yarn dev`

템플릿: [danmin-gatsby-blog-template](https://github.com/danmin20/danmin-gatsby-blog-template) (0BSD)

## Home page cards: open-source credits

- Hand-drawn diagrams in `static/img/built-*.svg` are generated with [rough.js](https://github.com/rough-stuff/rough) (MIT). Their lettering is [Gaegu](https://fonts.google.com/specimen/Gaegu) (SIL OFL 1.1), embedded as a glyph subset.
- Card titles use glyph subsets of [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), [Black Han Sans](https://fonts.google.com/specimen/Black+Han+Sans), [Nanum Myeongjo](https://fonts.google.com/specimen/Nanum+Myeongjo) and [Silkscreen](https://fonts.google.com/specimen/Silkscreen), all SIL OFL 1.1, self-hosted in `static/fonts/`. The subsets only cover the title text, so changing a title means regenerating its subset.
