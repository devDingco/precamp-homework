// closer variable
let isSetInterval;

// 날짜 계산
const d = new Date();
const year = String(d.getFullYear());
const month = String(d.getMonth() + 1).padStart(2, '0');
const date = String(d.getDate()).padStart(2, '0');

// 수강생 리스트
const userList = [];

function checkValidation() {
  return true;
}

function emailValidation() {
  let [$userName, $userEmail, $userPW, $userPW2, $userPhoneNumber] =
    document.getElementsByClassName('CSS_사이드바_회원가입_인풋');

  if (!$userEmail.value.includes('@')) {
    let temp = `
      <div class="CSS_입력값오류">
        <div class="CSS_입력값오류_아이템">
          비밀번호와 비밀번호 확인이 일치하지 않습니다.
        </div>
      </div>
    `;
  }

  // email 영역 검사
  const [userName, domain] = $userEmail.value.split('@');
  // @가 없거나, (naver, gmail, hanmail.net, kakao.com) 이 아니면
}
function passwordValidation() {
  let [$userName, $userEmail, $userPW, $userPW2, $userPhoneNumber] =
    document.getElementsByClassName('CSS_사이드바_회원가입_인풋');

  // 비밀번호 영역 검사
  if ($userPW.value !== $userPW2.value) {
    let temp = `
      <div class="CSS_입력값오류">
        <div class="CSS_입력값오류_아이템">
          비밀번호와 비밀번호 확인이 일치하지 않습니다.
        </div>
      </div>
    `;
    document.getElementById('비밀번호값오류안내').innerHTML = temp;
    document.getElementsByClassName('CSS_사이드바_회원가입_인풋')[2].style =
      'border: 1px solid #E84F4F;';
    document.getElementsByClassName('CSS_사이드바_회원가입_인풋')[3].style =
      'border: 1px solid #E84F4F;';
  } else {
    document.getElementById('비밀번호값오류안내').innerHTML = '';
    document.getElementsByClassName('CSS_사이드바_회원가입_인풋')[2].style = '';
    document.getElementsByClassName('CSS_사이드바_회원가입_인풋')[3].style = '';
  }
}

function phoneValidation() {
  let [$userName, $userEmail, $userPW, $userPW2, $userPhoneNumber] =
    document.getElementsByClassName('CSS_사이드바_회원가입_인풋');

  // 전화번호 영역 검사
  // 전화번호가 '-'를 갖지 않으면, 경고 문구 출력
  if ($userPhoneNumber.value && !$userPhoneNumber.value.includes('-')) {
    let temp = `
      <div class="CSS_입력값오류">
        <div class="CSS_입력값오류_아이템">
          전화번호 입력시 ‘-’를 입력해주세요 ex)010-1234-5678
        </div>
      </div>
    `;
    document.getElementById('전화번호값오류안내').innerHTML = temp;
    document.getElementsByClassName('CSS_사이드바_회원가입_인풋')[4].style =
      'border: 1px solid #E84F4F;';
  } else {
    document.getElementById('전화번호값오류안내').innerHTML = '';
    document.getElementsByClassName('CSS_사이드바_회원가입_인풋')[4].style = '';
  }
}

function appendUserList() {
  // user 데이터 추가
  userList.push(1);

  // 업데이트된 태그를 담을 변수
  let updatedUserList = '';

  // 추가된 userList만큼 업데이트
  for (let i = 0; i < userList.length; i++) {
    const user = `<div>수강생${i + 1}</div>`;
    updatedUserList += user;
  }

  // 업데이트 반영
  document.getElementsByClassName(
    'CSS_사이드바_왼쪽부분_항목_제목'
  )[1].innerHTML = `${updatedUserList}`;
}

function onSignUpButton() {
  // '가입' 버튼을 누르면,
  // 가입 축하 문구와 입력 정보를 alert 창에 출력
  // 수강생 추가
  printWelcomMessage();
  appendUserList();
}

function printUserInfo() {
  // 입력 정보 가져오기
  let [$userName, $userEmail, $userPW, $uerPW2, $userPhoneNumber] =
    document.getElementsByClassName('CSS_사이드바_회원가입_인풋');
  $userPW.value = '*'.repeat($userPW.value.length);

  let $bio =
    document.getElementsByClassName('CSS_사이드바_회원가입_자기소개')[0];
  let $gender = document.getElementById('male');
  let $agreement = document.getElementById('agreement');
  const userInfo =
    `이름: ${$userName.value ?? ''}\n` +
    `이메일: ${$userEmail.value ?? ''}\n` +
    `비밀번호: ${$userPW.value ?? ''}\n` +
    `성별: ${
      $gender.value === '남성' ? '남성' : $gender.value === '여성' ? '여성' : ''
    }\n` +
    `전화번호: ${$userPhoneNumber.value}\n` +
    `동의여부: ${$agreement.value === true ? 'Y' : 'N'}\n` +
    `자기소개: ${$bio.value ?? ''}\n` +
    `(가입일시: ${year}-${month}-${date})`;
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
