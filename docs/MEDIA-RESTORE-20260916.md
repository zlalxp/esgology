# 회사 미디어 배치 수정 · 2026-09-16

Task COMPANY-MEDIA-RESTORE-20260916. 기준 7937b5ba594d3d28c8ad6ddfa4e028ed6770ccee. 허용: index.html, site.css, site.js, scripts/qa.cjs, 본 문서 및 기존 공개 후보의 상태 안내. 사용자 최신 요청이 이전 트럭 hero 요청을 대체한다. 첫 화면은 기존 영상, 새 영상 제작은 사용자 요청 전까지 보류한다. 기존 생성 이미지는 아래 섹션에 배치하고 마지막은 기존 물속 배경을 복원한다. 외부 모델 호출·유료 생성·배포 없음.

- 짧은 화면/모션 감소/JS 미사용에서 .scene-images를 숨기는 static fallback이 검정 배경의 원인이다. 각 scene-copy에 자체 배경을 적용해 읽기 순서와 배경을 함께 유지했다.
- hero는 기존 v3.7의 Framer 참조 영상 B1E36n5Z6jDij8UJYkjAIGrRups.mp4. 새 제작물이 아니다. muted/loop/playsinline, 재생·일시정지, 탭 숨김 시 정지, 모션 감소 초기 자동재생 제외, 오류 시 기존 atrium 이미지 유지.
- 업무 카드 이미지: atrium / operations / transition. 연속 제조 이미지 중복 제거, 물류 이미지는 세 번째 카드로 이동.
- closing은 기존 v3.5/v3.7의 물속 이미지 OU4uGFkQMFwavvpvMW84UW9da0.png. 외부 참고 미디어로 저장/재업로드하지 않는다.
- 참고 영상과 물속 이미지는 디자인 검토용이다. 공개 이용 권리가 확인됐다는 주장이 아니며 기존 PUBLIC-RELEASE-PACKET의 공개 후보 승인을 그대로 적용하지 않는다. 새 영상 제작도 착수하지 않는다.

검증: 문법 검사 PASS. Edge 24개 viewport/JS/motion 조합 PASS. 이 자동 회귀 검사는 알려진 외부 참고 미디어 두 개를 차단하여 네트워크 실패 시 fallback과 배치를 검증한다. 실제 외부 미디어 재생/이미지 로딩은 별도 live-media.json에 기록한다. 제품 랜딩은 별도 worktree에서 진행하며 여기에는 포함하지 않는다.

실제 미디어 확인: Edge 라이브 재생 PASS. 영상 길이 14.186초, readyState4/paused=false/currentTime2.998초 확인. 재생·일시정지 버튼 PASS. 기존 물속 이미지 2670×1780 decode PASS. 첫 sandbox 실행의30초 timeout 이후 네트워크 접근 가능한 실행에서 확인했으며, 로딩 실패 fallback은 별도24조합에서 검증했다. 증거: esgology-local-test/company-media-20260916/live-media.json 및 hero-video-live.png, closing-water-live.png, approach-short.png, cases-mobile.png. 새 영상 생성은 하지 않았다.

독립 읽기 검토(cp79_review): P1/P2 없음. 모션 감소를 실행 중 켰을 때 숨겨진 영상의 재생 버튼이 남는 접근성 동작1건을 발견해 버튼도 함께 숨기도록 보완했다. 실제 브라우저에서 재생 → reduce(영상 정지/버튼숨김) → no-preference(재생복구) 확인 PASS. live-media.json과 스크린샷은 최종 실행으로 갱신됐다.
