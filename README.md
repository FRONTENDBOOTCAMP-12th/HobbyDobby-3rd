# HobbyDobby

멋쟁이 사자처럼 프론트엔드 부트캠프 바닐라 프로젝트 3조, Recherin_ThreeStar의 HobbyDobby입니다! 🧙‍♂️

---

## 중간 점검

- 해당 내용은 중간 점검이 끝난 뒤 `README.md`에서 일부 옮길 계획입니다.

### 피그마

- https://www.figma.com/design/rd4mKDnBo0GhmnCxmpdeGo/%EB%A9%8B%EC%82%AC_%ED%8C%8C%EC%9D%B4%EB%84%90%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_3%EC%A1%B0?node-id=0-1&p=f&t=J8zgch9xqnUxgEJ2-0

### 기획 발표 ppt

- https://docs.google.com/presentation/d/1cCiHoUXU22YfUSQKXnIUVe2CfvdDXA368ZWd60Ze4XI/edit?usp=sharing

### 테스트 계정

- ID : testbot12
- PW : 123456q!

### .env 파일 내용

```
VITE_SERVICE_NAME = HobbyDobby
VITE_SUPABASE_URL=https://hethluwezqktgiewhrhn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhldGhsdXdlenFrdGdpZXdocmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NzMzMzQsImV4cCI6MjA1NjQ0OTMzNH0.IP59fWTMn9pw67ICXGY-d3cpRaipVoaZHBe-yISzgwI
```

### 개발 진행도

- 배포 사이트에 배포는 아직 하지 못했습니다. 😥
- 현재 로그인/회원가입 페이지는 90% 완성된 상태입니다.
- 메인 페이지(`/home`) : 컴포넌트만 완성되었고, 페이지 구성/DB 연결은 현재 구현 중에 있습니다.
- 리더보드 페이지(`/leader-board`) : 리더보드는 완주 챌린지 페이지는 구현 완료, 다음 주차에 상세 페이지(`/leader-board/detail`), 랭킹을 구현 계획에 있습니다.
- 스토어 페이지(`/store`) : 다음 주차에 페이지 구현 계획에 있습니다.
- 마이 페이지(`/mypage`) : 컴포넌트를 페이지에 조립한 상태이며, 컴포넌트에 DB를 연결해 통계 및 업적을 표시해 주는 것은 현재 미구현입니다. 수정 페이지는 다음 주차에 구현 계획에 있습니다.
- 하단바, 상단바 : 하단 바는 구현 완료되었고, 상단 바의 우측 취미 버튼을 눌렀을 때 카드 열림, 재화 갯수(보석 모양)를 DB에서 가져와 렌더링 적용은 미구현입니다.
- 취미 선택 페이지(`/select-hobby`) : 신규 회원 가입 시/새 취미 추가 시 방문 가능한 페이지입니다. 취미 선택 후 상세 취미 페이지로 이동합니다. 현재 DB 상에 `독서-문학,비문학`의 상세 취미만이 등록되어 있어 다른 취미들을 눌렀을 땐 상세 페이지에 정상적인 렌더링이 되지 않습니다.
- 상세 취미 선택 페이지(`/select-hobby/독서`) : 상세 취미들과 그에 대한 소개 데이터 렌더링을 구현했습니다. 선택을 누를 시, 챌린지 시작 페이지로 이동하는 것을 현재 구현중에 있습니다.

### 기타

- 저희 개발 기록은 Github-Wiki에 일일, 주간 별로 스크럼, 스프린트 기록중에 있습니다.
- Wiki : https://github.com/FRONTENDBOOTCAMP-12th/HobbyDobby-3rd/wiki
- 일찍 일어나셔서 저희 코드 읽어주시고 리뷰해주셔서 감사합니다! 😊🙇‍♂️
