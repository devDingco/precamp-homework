// closer variable
let isSetInterval;

// 날짜 계산
const d = new Date();
const year = String(d.getFullYear());
const month = String(d.getMonth() + 1).padStart(2, '0');
const date = String(d.getDate()).padStart(2, '0');

// 입력 정보 가져오기
let [$userName, $userEmail, $userPW, $uerPW2, $] =
  document.getElementsByClassName('CSS_사이드바_회원가입_인풋');
console.log($input);

let $bio = document.getElementsByClassName('CSS_사이드바_회원가입_인풋');
let $gender = document.getElementById('male');
let $phone;
let $agreement = document.getElementById('agreement');

function onSignUpButton() {
  // '가입' 버튼을 누르면, 가입 축하 문구와 입력 정보를 alert 창에 출력
  printWelcomMessage();
  printUserInfo();
}

function printUserInfo() {
  let userInfo;
  alert(userInfo);
}

function printWelcomMessage() {
  // 날짜 출력
  const welcomMsg = '회원가입을 축하합니다.';
  const detailMsg = `(가입일시: ${year}-${month}-${date})`;
  alert(welcomMsg + '\n' + detailMsg);
}

function registerWithTimer() {
  // 무한클릭 방지
  if (isSetInterval) {
    clearInterval(isSetInterval);
  }
  // 인증번호 생성기 실행
  register();

  // 남은시간 표기할 태그 생성
  document.getElementsByClassName(
    'CSS_사이드바_회원가입_인증번호요청구역'
  )[1].innerHTML = `
      <div class="CSS_사이드바_회원가입_남은시간_노출">3:00</div>
      <div>
          <button class="인증하기_활성화" onclick="auth()">
              <img src="./assets/button_primary2.png" />
          </button>
      </div>
    `;

  // 3분 타이머 실행
  timer();
}

function auth() {
  // '인증 완료' 문구로 변경하고, 버튼 상태를 disabled로 변경
  document.getElementsByClassName('인증하기_활성화')[0].innerHTML = `
    <button class="인증완료_비활성화" disabled>
        <img src="./assets/button_primary3.png" />
    </button>
  `;

  // setTimer 해제
  clearInterval(isSetInterval);

  // 타이머 미노출
  document.getElementsByClassName(
    'CSS_사이드바_회원가입_남은시간_노출'
  )[0].className = 'CSS_사이드바_회원가입_남은시간_숨김';
}

function register() {
  // 인증번호 계산
  const r = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

  // 계산된 랜덤 인증번호 렌더링
  document.getElementsByClassName(
    'CSS_사이드바_회원가입_인증번호'
  )[0].innerText = r;
}

function timer() {
  // 180초
  let timeLimit = 5 - 1;

  // 타이머 본문, 1초마다 실행
  isSetInterval = setInterval(() => {
    // 타이머 종료 시,
    if (timeLimit < 0) {
      // 인증번호 영역 초기화
      document.getElementsByClassName(
        'CSS_사이드바_회원가입_인증번호'
      )[0].innerText = '000000';

      // 인증하기 버튼 및 잔여 시간 초기화
      document.getElementsByClassName(
        'CSS_사이드바_회원가입_인증번호요청구역'
      )[1].innerHTML = `
        <div class="CSS_사이드바_회원가입_남은시간_숨김">3:00</div>
        <div>
            <button class="인증하기_비활성화">
                <img src="./assets/button_primary.png" />
            </button>
        </div>
      `;
      return;
    }

    // 잔여 시간 계산
    let min = String(Math.floor(timeLimit / 60));
    let sec = String(timeLimit % 60).padStart(2, '0');

    // 잔여 시간 렌더링
    document.getElementsByClassName(
      'CSS_사이드바_회원가입_남은시간_노출'
    )[0].innerText = `${min}:${sec}`;

    // 잔여 시간 차감
    timeLimit = timeLimit - 1;
  }, 1000);
}
