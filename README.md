# ESGOLOGY company site

Company home for https://esgology.co.kr.

ESGOLOGY makes a service that links sustainability disclosure materials with review records.

- Company: ESGOLOGY
- Product: ESGcheck → https://esgcheck.kr/
- Hosting: GitHub Pages
- Custom domain: https://esgology.co.kr (DNS at Gabia; see `DNS.md`)

Do not 301 `esgcheck.kr` here.
Do not clone other companies' pages, logos, or app UI.

## Scroll design review

PR 자동 검증은 `.github/workflows/company-qa.yml`을 사용한다. `npm ci`, `npx playwright install chromium`, `QA_BROWSER=chromium npm test`로 같은 24조합 검사를 실행할 수 있다. 문법 검사는 `npm run check`다. 결과 경로 `QA_OUT`은 사이트 폴더 밖으로 지정한다. CI 구성·검증 범위는 [CI-READINESS](docs/CI-READINESS.md)를 참고한다. 정적 사이트에 런타임 npm 의존성이나 배포 자동화는 추가하지 않았다.

`feat/company-scroll-20260915` integrates the preserved company preview and original generated concept images. It is not a deployed production release. See `docs/SCROLL-INTEGRATION.md` and `docs/RESUME.md` for remaining work.

The homepage uses `site.css` and `site.js`; secondary pages retain `styles.css`.
Image delivery uses lossless WebP while retaining original PNGs. See `docs/IMAGE-DELIVERY.md`; `node scripts/encode-images.cjs` requires Sharp at build time only and verifies source hashes and decoded pixel equality.
Run `node scripts/qa.cjs` with Node and `@playwright/test` available. It launches a temporary loopback HTTP server and closes it and the browser on exit. `QA_BROWSER` defaults to `msedge`. Set `QA_OUT` to a directory outside this published site; screenshots and JSON results go there. An existing Playwright installation can be used through `NODE_PATH`; no production dependency is needed.

## 실제 제품 화면 · 2026-09-16

설명용 HTML 제품 그림을 출시 후보4815219의 실제 합성 데이터 관계 지도 캡처로 교체했다. 크게보기 링크와 출시 준비/AI 연결 준비 상태를 표시한다. 상세 검증 범위·원본·해시는 docs/PRODUCT-CAPTURE.md와 product-capture-provenance.json. 전체 다운로드 여정의 오래된 선택자 문제는 미해결이며 이 촬영을 다운로드/결제 출시 증거로 사용하지 않는다.
