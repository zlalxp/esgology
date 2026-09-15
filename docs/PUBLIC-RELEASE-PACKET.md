현재 상태: 사용자의 영상·이미지 재배치 요청으로 아래 공개 후보는 재검토 중입니다. 최신 범위는 [MEDIA-RESTORE-20260916.md](MEDIA-RESTORE-20260916.md)를 따릅니다.

# 회사소개 공개 후보

- Task: COMPANY-PUBLIC-COPY-20260916
- Base: 3d77c34289f797c456f03de5e06ac9755e56e866 / PR2.
- 목표: 회사소개 페이지의 내부 시안·제작 메모를 공개용 문구로 정리한다. 생성 이미지와 출시 준비 중인 제품 화면이라는 사실은 유지한다.
- 허용: index.html, scripts/qa.cjs, 이 문서. 레이아웃·이미지 원본·제품 코드·도메인·가격 변경 없음.
- 검증: 기존24개 조합·공개 설명/이미지 안내 확인, 독립 exact-SHA 검토, GitHub CI. 사용자의 출시 개발 승인 범위에서 준비한다.
- 비용: 외부 AI·유료 API0. 기존 Actions만 사용.

## 현재 배포 경로

GitHub API와 HTTPS를 2026-09-16 확인했다. `esgology.co.kr`은 zlalxp/esgology의 Pages legacy/main/root이며 HTTPS 강제 사용 중이다. main은5cd1b9bfd2273af92a0a0d56d91692d1e07701f2, 공개 홈은HTTP200/title ESGOLOGY다. 제품 health도HTTP200이나 이는 신버전 제품 출시 증거가 아니다.

PR2를 main에 병합하면 현재 Pages 설정에 따라 회사 홈 공개 내용이 바뀐다. Render·제품DB·worker 준비와 별도 작업이다. 이 문서 작성은 병합·공개 실행을 뜻하지 않는다. 준비된 최종 후보를 사용자에게 보여 준 뒤 공개 반영 결정을 받는다.

## 반영 범위

기존 검토용 시안의 시각 요소와 독립 생성 이미지를 유지한다. 검색 설명·hero 보조 문구·footer·이미지 안내를 공개 독자에게 맞춘다. 경쟁사 레퍼런스 설명은 기존 내부 SCROLL-INTEGRATION/출처 기록에 보존한다. 공개 페이지에서 경쟁사 원본으로 이동하는 시안 검토 링크는 제거한다. 산업 이미지는 실제 자사 시설이나 고객 사례로 표현하지 않는다.

## 공개 전후 확인

1. 최종 head의 CI/독립검토/실제 로컬 화면과 승인 대상이 같은지 확인.
2. 공개 반영 결정 후 main 변동 여부를 재확인하고 기존 PR 병합 경로 사용. 직접 main push와 DNS 변경 없음.
3. Pages build/deployment의 정확한 commit을 확인하고 실제 HTTPS에서 새 제목·설명·CSS·JS·WebP·보조 페이지·문의 링크를 확인.
4. 오류 시 기존 main을 복구하는 revert PR로 되돌리고 Pages 재배포 상태를 확인. 콘텐츠 변경이므로 제품 데이터 변경 없음.

최종 영상 제작, 제품 신버전 운영 배포, 로고 상표권 확정은 이 회사소개 문구/배포 확인에 포함되지 않는다.

## 로컬 공개 후보 검증
문법 검사와 Edge24개 조합 모두PASS, 결과 company-public-copy-20260916/result.json. 데스크톱 첫 화면을 직접 확인했다. 독립 정적 검토는 생성 이미지/합성 자료/개발 버전 표시와 접근성 이름을 확인했고 추가 finding 없음. 최종 commit의 GitHub CI 및 사용자 공개 결정은 아직 확인하지 않았다.
