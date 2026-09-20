# 실제 제품 화면 연결 작업

- Task: COMPANY-PRODUCT-CAPTURE-20260915
- 기준: 회사 1d4eb9f253b7b952a3920423ecf41675a5417c87 / 서비스 4815219de30e4060972ea40be3e5a4e74d0a46b0
- 목표: 회사 소개의 설명용 제품 그림을 현재 출시 후보의 합성 데이터 화면으로 대체한다.
- 범위: 회사 index.html, site.css, 이미지 자산, scripts/qa.cjs 및 증거 문서. 서비스 기능 변경 없음.
- 입력: 해당 서비스 SHA의 Git archive, 기존 workspace-journey 합성 CSV/PDF, 독립 로컬 테스트 DB.
- 허용: 로컬 빌드, 루프백 API/worker/브라우저, 합성 전용 DB의 무작위 schema 생성과 종료 시 제거. 외부 AI/결제/메일/실자료/운영 배포 없음.
- 검증: 실제 API 여정, 출처 SHA 및 화면 해시, 24개 회사 화면 조합. 공개 자산에 계정·세션·운영 데이터 없음.
- 한도: 유료 API 비용 0, 1회 빌드 및 필요한 관련 검사. 실패 시 원래 그림을 유지하고 미완료를 기록한다.
- 승인: 사용자의 출시 개발 재개 및 실제 기능 화면 반영 요청. main 병합·운영 배포는 이 작업에 포함하지 않는다.

## 실행 결과 · 2026-09-16

서비스4815219 Git archive를 별도 폴더에서 빌드했다. 기존 로컬 합성 PG17/55482만 사용했고 새 schema 안에서 가입·로그인→CSV 업로드→별도 worker 추출→관계 지도→원본 대조→125에서130으로 정정·사유 저장을 확인했다. 운영 DB/외부 AI/결제 요청은 없었다. 테스트 transport만 루프백으로 제한했다.

원본 CSV와 정정값 보존, pageErrors=[], externalRequests=[]를 검사했다. 상세 창을 맨 위로 스크롤한 뒤 관계 지도 컴포넌트를 촬영했다. 화면에 나타나는125는 보존된 원문이며, 정정값130 저장 여부는 API/DB 검사로 확인했다. 사진을 편집하거나 기능을 덧그리지 않았다. 무손실WebP62160bytes/1208×1025이며 PNG와 디코딩 픽셀이 동일하다. SHA와 빌드 기준은 product-capture-provenance.json에 있다.

전체 workspace-journey는 두 실행에서 source-review-journey의 오래된 `PDF 다운로드 · 무료` 선택자 때문에 시간 초과됐다. 현재 SourceReportDownload는 e41ed19 이후 `PDF 다운로드 · 유료`다. 기대 download promise가 클릭 실패 전에 거부되면서 마지막 결과파일도 남지 않았다. 따라서 전체 여정·PDF·결제 통과로 주장하지 않는다. 요금 문서·화면·API·브라우저 검사의 정합성 및 실패 시 결과 저장/cleanup을 다음 서비스 작업에서 보완해야 한다. 이번 회사 화면 촬영은 별도 제한 스크립트로 다운로드 이전 구간만 실행해 통과했다.

독립 Codex 검토: 실제 WebP와 HTML/CSS/QA/provenance를 읽은 정적 검토에서 추가 지적 없음. 검토자가 API/브라우저 검사를 독립 재실행한 것은 아니다. 회사 Edge24개조합(JS on/off, 동작줄이기 on/off, 6뷰포트) 통과. 모바일은 원래 데스크톱 화면을 축소해서 보여주므로 크게보기 링크를 제공한다. 실제 모바일 앱 화면을 뜻하지 않는다.

증거: ../esgology-local-test/company-map-capture-final-4815219/capture-result.json 및 product-map.png; company-product-site-qa-20260915/result.json 및 product-375.png/product-1440.png. 캡처 도구는 company-product-candidate-4815219/scripts/company-map-capture.mts. 테스트 서버·브라우저 종료, 합성PG 정상 smart 종료 확인. 이전 실패 실행의 합성 잔여 schema는 임의 제거하지 않았다. main 병합·운영 배포 없음.
