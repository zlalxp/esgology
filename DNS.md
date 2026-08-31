# 가비아에서 esgology.co.kr → GitHub Pages

공식 메뉴: [가비아 DNS 레코드 설정](https://customer.gabia.com/manual/domain/287/1201)

도메인은 가비아에 두고 **이전하지 않습니다.** 웹만 GitHub Pages로 붙입니다.  
제품 앱 `esgcheck.kr`은 그대로 둡니다. 301로 회사 홈에 붙이지 않습니다.  
`@esgology.co.kr` 메일은 사업자 등록 전 만들지 않습니다.

GitHub Pages는 이미 켜져 있습니다. 저장소: https://github.com/zlalxp/esgology  
커스텀 도메인: `esgology.co.kr` (CNAME 파일 있음)

## 1. 가비아 화면으로 들어가기

1. https://www.gabia.com 로그인
2. 오른쪽 위 **My가비아** → **서비스 관리**
3. **DNS 관리툴**
4. 목록에서 **esgology.co.kr** 선택 → **DNS 설정**
5. 왼쪽 아래 **+레코드 추가**

기존에 주차(parking) A/CNAME이 있으면 웹용 `@` / `www`만 지우고 아래 값으로 바꿉니다. MX는 건드리지 않습니다(메일을 안 쓸 때도 기본 MX가 있을 수 있음).

## 2. 넣을 레코드 (그대로)

가비아 CNAME 값은 **끝에 마침표(.)가 필수**입니다.

| 호스트 | 타입 | 값 | 용도 |
|---|---|---|---|
| `@` | A | `185.199.108.153` | 루트 도메인 |
| `@` | A | `185.199.109.153` | 루트 도메인 |
| `@` | A | `185.199.110.153` | 루트 도메인 |
| `@` | A | `185.199.111.153` | 루트 도메인 |
| `www` | CNAME | `zlalxp.github.io.` | www (끝 점 필수) |

선택(IPv6 있으면):

| 호스트 | 타입 | 값 |
|---|---|---|
| `@` | AAAA | `2606:50c0:8000::153` |
| `@` | AAAA | `2606:50c0:8001::153` |
| `@` | AAAA | `2606:50c0:8002::153` |
| `@` | AAAA | `2606:50c0:8003::153` |

TTL은 300이면 충분합니다.

**하지 말 것**

- `@`에 CNAME (가비아/DNS 표준에서 루트 CNAME은 깨집니다)
- 값을 `zlalxp.github.io/esgology` 로 넣기 (경로 금지, 호스트만)
- Render / esgcheck.kr IP를 가리키기
- 와일드카드 `*`

각 줄마다 **확인** → 마지막에 **저장**. “세팅 완료”가 나와야 합니다.

## 3. 저장 후 확인

- GitHub: `zlalxp/esgology` → Settings → Pages → Custom domain `esgology.co.kr` 옆에 DNS check
- 브라우저: https://esgology.co.kr/ 회사 홈, https://esgcheck.kr/ 제품 앱
- 반영은 수분~최대 48시간(가비아 안내)

다 넣었으면 이 스레드에 “DNS 저장했다”만 알려 주세요. 여기서 라이브 HTTP를 다시 읽겠습니다.
