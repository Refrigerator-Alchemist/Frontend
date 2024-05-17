# 🧙 냉장고 연금술사

![alt text](./public/thumbnail.png)

## 📋 목차

- [머릿말](#📋-목차)
- [도메인](#🔗-도메인)
- [제작 기간](#📝-제작-기간)
- [사용한 도구들](#✅-사용한-도구들)
- [프로젝트 팀원](#프로젝트-팀원)
- [팀원 프로필](#🧑‍🤝‍🧑-팀원-프로필)

### <span style=''>🌱 서비스 소개</span>

마땅히 먹고 싶은 건 없는데 배달비는 비싸고, 냉장고에 남은 재료들은 있는데
뭘 만들면 좋을지 아이디어는 안 떠오르고...
다들 자주 겪는 고민이 아닐까요? 그런 고민을 해결하기 위해서 레시피를 만들어 줄 수 있는
해결사가 있으면 좋겠다고 생각했어요! 그래서 저희는 <span style='color: gold; font-weight:bold'>냉장고 연금술사</span>라는 해결사를 만들었어요!

연금술을 사용해서 레시피를 만들어 내고, 커뮤니티에서 사람들과 레시피를 서로 공유도 해주세요!
인기만점 레시피는 Top3 명예의 전당에도 오른답니다😀

## 🔗 도메인

http://배포후도메인을입력해주세요

## 📝 제작 기간

- 기능 구현 및 테스트 : 2024.01.31 ~ 2024.03.31
- 배포 : 2024.05.??
- 버그 및 이슈 발견시 상시 업데이트

## 🎙️ 커뮤니케이션 방식

- 매주 토요일 오프라인 회의 및 개발 (3시간)
- 디스코드에 서버를 만들어 자료나 전체 전달 사항 공유
- 전체 회의로 의견 전달이나 문제점 설명
- 같은 파트를 구현하는 백-프론트 간 상시 통화와 화면 공유를 통한 기능 구현
- Github 브랜치의 코드 pull과 push를 통한 지속적인 동기화

## ✅ 사용한 도구들

<div>
  <p style='font-weight: bold'>IDE</p>
  <img src="https://img.shields.io/badge/VSC-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white">
  <img src="https://img.shields.io/badge/IntelliJ-000000?style=flat-square&logo=intellijidea&logoColor=white">
</div><br/>

<div>
  <p style='font-weight: bold; color:orange'>디자인</p>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=black">
</div><br/>

<div>
  <p style='font-weight: bold; color:gold'>협업</p>
  <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white">
</div><br/>

<div>
  <p style='color:pink; font-weight: bold'>Front-end</p>
  <img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=black">
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=flat-square&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black">
</div><br/>

<div>
  <p style='color:skyblue; font-weight: bold'>Back-end</p>
  <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white">
</div><br/>

<div>
  <p style='font-weight: bold'>APIs</p>
  <img src="https://img.shields.io/badge/GPT 3.5-412991?style=flat-square&logo=openai&logoColor=white">
  <img src="https://img.shields.io/badge/GPT 3.5-F2CA30?style=flat-square&logo=openai&logoColor=black">
</div><br/>

<div>
  <p style='color:cyan; font-weight: bold'>배포</p>
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat-square&logo=amazons3&logoColor=black">
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat-square&logo=amazonec2&logoColor=black">
</div>

## 💡 도구 및 기술 사용 근거

### 🌱 <span style='color: gold; font-weight:bold;'>React.js + Tailwindcss</span>

- React.js

  - 빠른 개발과 기능 구현이 가능하고 컴포넌트별로 개발하기 때문에 후에 리팩토링 및 유지 보수가 용이하여 리액트를 사용했습니다.
  - 냉장고 연금술사는 CSR 방식의 렌더링을 하는 것이 적합하다고 생각했습니다. CSR은 초기 로딩시간이 길 수 있지만 서비스 접속시 초기화면을 보는 데에는 오래 걸리지 않을 것입니다. 또한 서비스의 메인 활동은 레시피 연금술이며 이는 유저가 직접 재료를 입력하고 생성하는 상호작용이 주된 동작이기 때문에 SSR보다는 CSR이 더 적합하다고 생각했습니다.

- Tailwindcss
  - 프론트 팀이 공통적으로 사용해 본 CSS 라이브러리가 tailwindcss였기에 학습비용 및 개발기간 단축을 위해 사용했습니다.
  - 해당 컴포넌트의 HTML element의 className으로 즉시 수정할 수 있다는 편의성이 팀원 파트의 코드를 수정할 때도 이점으로 작용했습니다.

### 🌱 <span style='color: gold; font-weight:bold;'>Context API (useContext)</span>

- 우선 Redux를 사용하기 위한 개발 경험이 충분하지 않았습니다. 그래서 좀 더 익숙하며 프로젝트에 들어가는 학습 비용을 줄일 수 있는 방법을 선택했습니다.
- Redux는 대규모 애플리케이션의 리소스와 전역 상태 관리에 효율적인 것으로 알고 있습니다. 냉장고 연금술사의 경우 유저 데이터 공유와 네비게이션바를 제외하면 컴포넌트 트리 전체에서 전역으로 공유될 상태가 없어 Context API만으로도 충분하다고 생각했습니다.

### 🌱 <span style='color: gold; font-weight:bold;'>Prettier</span>

- VSC의 강력한 코드 포맷팅 확장프로그램인 Prettier를 사용하여 코드 스타일과 가독성을 효율적으로 관리했습니다.

### 🌱 <span style='color: gold; font-weight:bold;'>JWT</span>

- JWT는 쿠키 및 세션에 비해 필요한 모든 정보를 자체적으로 포함하여 별도의 상태 저장이 필요 없습니다.
  서버에있는 Secret-Key를 이용하여 토큰을 만들기에 상대적으로 안정합니다.
  Access 토큰이 만료될 시 Refresh 토큰을 이용하여 Access 토큰을 재발급하여 사용자는 유효기간이 지나도 재로그인을 하지 않고 서비스를 계속 이용 할 수 있게 했습니다.

  Refresh 토큰이 만료 될 시 재로그인 후 토큰들을 재발급하도록 하였습니다. 하지만 jwt.io에서 토큰을 입력하면 디코딩하여 다양한 정보를 볼 수 있기에 필요한 정보만 기입하였습니다.

  현재 트렌드에 맞게 많이 사용하는 기술을 도입해보았습니다.

- 보안 강화 조치도 하였습니다. 사용자가 로그아웃을 하면 클라이언트에서는 캐시에 내장된 JWT를 삭제하면 되지만 서버에서는 이를 무력화 할 방법이 없습니다. 그래서 BlackList라는 것을 만들어서 로그아웃 시 Access 토큰을 Redis에 등록을 합니다.

  만약 타인이 로그아웃 한 사용자의 Access 토큰을 이용하여 악용을 할 시 BlackList에 저장되있는 토큰이라면 서비스 사용을 할 수 없게 조치하였습니다.
  또한 로그아웃 시 Refresh 토큰을 Redis에서 삭제를 합니다.
  만약 Refresh 토큰을 탈취하여 Access 토큰을 재발급 받을 시 해당 Refresh 토큰에 대한 정보가 없기에 Access 토큰을 재발급을 하지 못하도록 조치하였습니다.
  그래서 사용자는 재로그인 시 Access 토큰, Refresh 토큰을 재발급하여 사용합니다.

### 🌱 <span style='color: gold; font-weight:bold;'>OAuth2.0</span>

- Resource Server(구글, 카카오, 네이버)의 ID, PW를 이용해서 간편 로그인을 구현했습니다.
  로그인 후 추가 정보를 기입하는 페이지로 리디렉션하지 않고 유저에게 좀 더 편안한 UX 제공을 위해 바로 로그인 되도록 만들었습니다.

  저희 서비스에서는 Resource Server로부터 이메일과 프로필 이미지를 가져옵니다. 마이페이지에서 프로필을 확인하면 SNS의 프로필 이미지와 동일한 이미지를 사용하는 것을 확인할 수 있습니다.

- _사용자가 서비스 자체 회원가입에서 이메일 인증 후 회원가입을 하는데 이때 소셜로그인의 이메일과 충돌 나지 않는가?_ 라는 의문이 들 수 있습니다.
  그래서 socialType이라는 필드를 이용해서 SNS 간편 로그인인지 자체 회원가입인지 구별을 하기 때문에 DB에서 충돌이 발생하지 않으며, 자체 회원가입을 한 사용자도 SNS 간편 로그인을 사용하면 새로운 계정으로 이용할 수 있습니다.

### 🌱 <span style='color: gold; font-weight:bold;'>Redis</span>

- 회원가입 시 이메일 인증을 하는데 서버에서 인증번호를 발급하면 저장소에 해당 인증번호를 저장하고 사용자가 입력한 인증번호와 발급한 인증번호를 비교합니다. 인증번호를 프론트로 넘겨주면 보안상 위험하기에 서버에서 저장하고있어야 합니다.

  RDB에 저장을 하면 캐시보다 검색 속도도 느리며 데이터를 찾았다 할지라도 인증에 성공하면 DB에 내장된 인증번호 데이터는 쓸모가 없어집니다. 이를 직접 지워주기에는 비효율적이라고 판단하여 Redis의 TTL 기능을 이용하여 특정 시간이 지난 후 데이터가 자동 소멸이 되도록하였습니다.

- 로그인 후 사용자 인증을 확인하기 위해 JWT 토큰을 발급합니다. 엑세스 토큰이 만료되면 리프레시 토큰으로 엑세스 토큰을 재발급을 하는데 RDB(관계형 데이터베이스)는 상대적으로 I/O(입출력)연산이 느립니다. 사용자가 로그아웃할 때 JWT 자체는 클라이언트에서 삭제되지만, 서버 측에서 해당 사용자의 JWT를 더 이상 유효하지 않도록 따로 처리할 필요가 있습니다.

  TTL=(유효시간-경과시간)만큼 설정하여, 재발급하기 전 사용하던 JWT 토큰들을 자동으로 소멸하고 토큰들을 관리하기 효율적입니다. 그래서 Redis를 사용하여 토큰 목록도 관리하였고, 서버는 인증을 위해 들어오는 모든 토큰을 이 목록과 대조하여 검증할 수 있었습니다. Redis의 빠른 데이터 액세스는 JWT 검증 과정을 빠르게 만들어 주었습니다.

## 🧑‍🤝‍🧑 함께한 팀원

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/devkoow">
          <img src="https://avatars.githubusercontent.com/u/112608822?v=4" width="100px;" alt="" style='border-radius:50%'/><br />
          <sub>
            <b>이창욱</b>
          </sub>
        </a><br />
        <sub><b>영남대 경영 17</b></sub><br />
        <sub><b style='color:pink'>FE / 팀장</b></sub>
      </td>
      <td align="center">
        <a href="https://github.com/anhyeryeon2">
          <img src="https://image.fmkorea.com/files/attach/new3/20230621/486616/825924136/5891200629/ee5eb9d0301f6f736f791dce9dc20963.png" width="100px;" alt="" style='border-radius:50%'/><br />
          <sub>
            <b>안혜련</b>
          </sub>
        </a><br />
        <sub><b>한국외대 컴공 21</b></sub><br />
        <sub><b style='color:pink'>FE</b></sub>
      </td>
      <td align="center">
        <a href="https://github.com/anhyeryeon2">
          <img src="https://image.fmkorea.com/files/attach/new3/20230621/486616/825924136/5891200629/ee5eb9d0301f6f736f791dce9dc20963.png" width="100px;" alt="" style='border-radius:50%'/><br />
          <sub>
            <b>김동윤</b>
          </sub>
        </a><br />
        <sub><b>영남대 컴공 19</b></sub><br />
        <sub><b style='color:skyblue'>BE</b></sub>
      </td><td align="center">
        <a href="https://github.com/anhyeryeon2">
          <img src="https://image.fmkorea.com/files/attach/new3/20230621/486616/825924136/5891200629/ee5eb9d0301f6f736f791dce9dc20963.png" width="100px;" alt="" style='border-radius:50%'/><br />
          <sub>
            <b>서효진</b>
          </sub>
        </a><br />
        <sub><b>영남대 컴공 21</b></sub><br />
        <sub><b style='color:skyblue'>BE</b></sub>
      </td><td align="center">
        <a href="https://github.com/anhyeryeon2">
          <img src="https://image.fmkorea.com/files/attach/new3/20230621/486616/825924136/5891200629/ee5eb9d0301f6f736f791dce9dc20963.png" width="100px;" alt="" style='border-radius:50%'/><br />
          <sub>
            <b>조승빈</b>
          </sub>
        </a><br />
        <sub><b>영남대 컴공 23</b></sub><br />
        <sub><b style='color:skyblue'>BE</b></sub>
      </td>
    </tr>
  </tbody>
</table>

### 🧑‍💻 팀원별 역할

<h3 style='font-weight: bold'>✅ 이창욱</h3>

<div>
  <span style='color: gold; font-weight:bold;'>프로젝트 공통 적용</span>

- 피그마를 이용한 목업 디자인, UI 설계
- 프로젝트 로고 이미지 디자인(Dall-E, 미리캔버스)
- 프로젝트 테마 컬러 결정(tailwind.config)
- 프론트 디렉토리 구조 세팅
- 사용할 폰트 결정
- UI(버튼, 인풋박스 등)의 CSS 컨벤션 결정
- 커스텀 에러코드 작성
- README.md 작성
</div><br/>

<div style=''>
  <span style='color: gold; font-weight:bold;'>맡은 파트</span><br/>
  <ul>
    <li>
      페이지 : 
      GetStarted, MainPage, SignUp, Login, LoginSuccess, ResetPassword, EditProfile, EditPost, Mypage, DeleteUser, NotFound, ProtectedRoute
    </li>
    <li>
      컨텍스트 : NavigationContext, UserContext
    </li><br/>
  </ul>
  <span style='color: gold; font-weight:bold;'>기능</span>

  <ul>
    <li>
      이메일 회원가입, 이메일 로그인, SNS 계정 연동 회원가입, SNS 계정 로그인, 로컬 스토리지와 UserContext에서 유저 데이터 관리, 비밀번호 재설정, 프로필 사진 변경, 닉네임 변경, 액세스 토큰 만료시 재발급, 로그인 유저만 접속할 수 있는 페이지에 비로그인 유저의 접근 차단, 네비게이션바를 통한 페이지 이동, 올린 게시물 수정
    </li>
  </ul>

</div>

<h3 style='font-weight: bold'>✅ 안혜련</h3>

<div>
  <span style='color: gold; font-weight:bold;'>프로젝트 공통 적용</span>

- 피그마를 이용한 목업 디자인, UI 설계
- 커스텀 에러코드 작성
- react-toastify 적용을 통한 팝업박스 스타일링
</div><br/>

<div style=''>
  <span style='color: gold; font-weight:bold;'>맡은 파트</span><br/>
  <ul>
      <li>
        페이지 : 
        Board, BoardDetail, UploadBoard, EditPost, GptSearch, GptResult, GptSavedList, GptSavedDetail
      </li>
      <li>
        컴포넌트 : Pagination
      </li><br/>
  </ul>

<span style='color: gold; font-weight:bold;'>기능</span><br/>

  <ul>
    <li>
      게시판 내 게시물 검색, 게시물 좋아요/취소(로그인 유저만 가능), 게시물 작성, 게시물 수정, 게시판과 마이페이지의 게시물들을 페이지네이션으로 구분, 마이페이지에서 '내가 작성한 레시피', '좋아요 누른 레시피'를 버튼 토글로 조회, 레시피 연금술 재료 추가, 레시피 결과 저장, 저장된 레시피 리스트 조회
    </li>
  </ul>
</div>

<h3 style='font-weight: bold'>✅ 김동윤</h3>

<div>
  <span style='color: gold; font-weight:bold;'>프로젝트 공통 적용</span>

- REDIS를 사용한 API 통신
- 커스텀 에러코드 작성
</div><br/>

<span style='color: gold; font-weight:bold;'>기능</span><br/>

- 이메일 회원가입, 이메일 로그인, SNS 계정 연동 회원가입, SNS 계정 로그인, 유저 데이터 관리, 비밀번호 재설정, 프로필 사진 변경, 닉네임 변경, 액세스 토큰 만료시 재발급

</div>

<h3 style='font-weight: bold'>✅ 서효진</h3>

<div style=''>
  <span style='color: gold; font-weight:bold;'>맡은 파트</span><br/>

- 레시피 추천(연금술 실행) 및 저장, 조회

<span style='color: gold; font-weight:bold;'>기능</span><br/>

- 추천 레시피 생성, 레시피 저장, 레시피 목록 조회, 상세 레시피 조회
</div>

<h3 style='font-weight: bold'>✅ 조승빈</h3>

<div>
  <span style='color: gold; font-weight:bold;'>맡은 파트</span>
</div><br/>

<div>

<span style='color: gold; font-weight:bold;'>기능</span><br/>

  <ul>
  </ul>
</div>

## 🪺 냉장고 연금술사 사용법

## 🚸 개선 예정

## 🥞 팀원들의 회고록

### 🌱 조승빈

제대로 된 협업을 처음 경험해 보았는데, 그동안 저의 코딩 스타일은 기능구현에만
초점을 맞춘 방식이었습니다. 그러나 이번 스터디를 통해 완전히 잘못된 방식으로 코딩하고 있었다는 것을 느꼈습니다...
예를 들어 기존에는 http 요청/응답 시 엔티티를 주고받는 로직으로 코딩했는데,
이렇게 되면 엔티티 정보가 그대로 ui층에 노출되어버렸습니다.
또한 제가 구현한 로직에서 발생할 수 있는 잠재적 에러에 대한
예외처리와 프론트와의 API 통신에 대해서도 배울 수 있었습니다.
저는 이번 협업을 통해 잘못된 코딩 습관과 부족한 나의 코딩 실력을
느꼈고(현타가 여러번 왔었습니다😅), 협업을 통해 배우고 느낀 경험으로
조금 더 나은 개발자로 성장하고 싶습니다.

### 🌱 서효진

첫 협업 프로젝트였던 만큼 저의 부족한 부분을 적나라하게 알 수 있었고, 그만큼 얻게 되는 것도 많았던 활동이었습니다. 협업에서의 commit의 중요성과 협업할 때의 깃허브 사용법, API 활용법, 에러 처리는 어떻게 해야 하는지, 또 배포는 어떤 과정을 통해 이뤄지는 지 등 단순히 공부만으로는 알 수 없는 귀한 경험을 얻을 수 있었습니다. 제가 생각한 아쉬운 점은 추천 레시피를 생성할 때 ChatGPT API를 사용하여 적절하지 못한 재료가 입력되었을 때 이를 식별하고 바르게 처리하도록 구현했었는데, GPT API를 사용한 응답이 예상한 것처럼 나오지 않아(ex 버섯을 먹을 수 없다고 판단하는 경우) 동작이 이상해졌고 결국 해당 처리를 하지 못했던 점입니다. 언젠가 유사한 상황을 마주하게 된다면 더 좋은 솔루션을 낼 수 있도록 더욱 더 정진하도록 하겠습니다.
