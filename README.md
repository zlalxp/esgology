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

`feat/company-scroll-20260915` integrates the preserved company preview and original generated concept images. It is not a deployed production release. See `docs/SCROLL-INTEGRATION.md` and `docs/RESUME.md` for remaining work.

The homepage uses `site.css` and `site.js`; secondary pages retain `styles.css`.
Run `node scripts/qa.cjs` with Node and `@playwright/test` available. It launches a temporary loopback HTTP server and closes it and the browser on exit. `QA_BROWSER` defaults to `msedge`. Set `QA_OUT` to a directory outside this published site; screenshots and JSON results go there. An existing Playwright installation can be used through `NODE_PATH`; no production dependency is needed.
