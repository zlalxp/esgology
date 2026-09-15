# 회사소개 사이트 자동 검증

- Task: COMPANY-CI-20260916
- Base: 988dd844f3e1df06362bba7653a7b3ce00f15063, feat/company-scroll-20260915 / PR2.
- 목적: 기존 로컬 24가지 화면 검사를 GitHub에서도 반복 실행해 출시 후보의 오류를 확인한다.
- 범위: .github/workflows/company-qa.yml, package.json/package-lock.json, .gitignore, README.md, docs/RESUME.md, 이 문서. HTML/CSS/JS·이미지·DNS·배포 설정은 변경하지 않는다.
- 사용 근거: 기존 출시 개발·검증 승인. find-skills로 설치 상태를 확인하고 ECC verification-loop 및 Ponytail의 기존 검사 재사용 원칙 적용. 새 스킬 중복 설치 없음.
- 입력: 기존 scripts/qa.cjs와 정적 회사 사이트, 고정된 Playwright 1.62.1 개발 의존성.
- 승인 기준: JS 문법 검사, 실제 24조합 QA, GitHub exact-head check, 실패 시 nonzero, 결과 아티팩트 보존. 체크는 배포 승인이 아니다.
- 보안: pull_request 사용, contents:read, checkout credential 미보존, 공식 Actions commit 고정. secrets·유료 API·배포 권한·운영 데이터·외부 사이트 테스트 없음.
- 비용/범위: 기존 GitHub Actions 실행만 사용. 새로운 호스팅·유료 구독 구매 없음.
- 되돌리기: CI 관련 커밋 revert. 사이트 내용과 기존 Pages 배포는 변경되지 않는다.

검사는 화면 크기 6종 × JavaScript on/off × reduced-motion on/off를 확인한다. 이미지 로딩·가로 넘침·키보드 포커스·대화창·스크롤 전환·링크·외부 요청 차단을 기존 스크립트로 검사한다. Safari/Firefox·실기기·운영 도메인·실제 백엔드 출시를 검증한 것으로 해석하지 않는다.

공식 참고: [Playwright CI](https://playwright.dev/docs/ci-intro), [GitHub Actions 보안](https://docs.github.com/en/actions/reference/security/secure-use).

## 로컬 확인

Node24 문법 검사 exit0, 기존 Edge24개 조합 PASS. 결과는 `C:/Users/김희태/Claude/esgology-local-test/company-ci-local-20260916/result.json`과 같은 폴더의 PNG다. lockfile 생성 exit0, Playwright와 하위 의존성 버전·integrity 고정. GitHub Ubuntu/Chromium 실행 결과는 아직 확인하지 않았다.

독립 정적 검토는 권한·버전 고정·아티팩트 경로의 차단 오류를 발견하지 못했다. 초기 QA 실패 때 PNG/JSON이 생성되지 않을 수 있다는 P3를 반영해, `pipefail`을 유지하면서 QA 콘솔 로그도 테스트 임시 폴더에 저장하고 업로드한다. 브라우저 설치 이전 실패는 Actions 단계 로그로 확인한다.

첫 GitHub 실행34995867595는 workflow file issue로 실행 전 실패했다. job env에서 지원하지 않는 runner context를 사용한 QA_OUT을 실행 step env로 옮겼다. 실패한 SHA0d7e413의 CI를 통과로 기록하지 않는다.
