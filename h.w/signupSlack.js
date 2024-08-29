let isAuthBtnActioned = false;

function registerFunc() {
  const memberName = document.getElementById('memberName').value;
  const emailInfo = document.getElementById('emailInfo').value;
  const pw = document.getElementById('pw').value;
  const confirmPW = document.getElementById('confirmPW').value;
  const phone = document.getElementById('phone').value;
  const userInfo = document.getElementById('userInfo').value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const agree = document.querySelector('input[id="info"]:checked');

  const todayDate = new Date();
  let year = todayDate.getFullYear();
  let month = String(todayDate.getMonth() + 1).padStart(2, '0');
  let day = String(todayDate.getDate()).padStart(2, '0');

  if (
    memberName.length === 0 ||
    emailInfo.length === 0 ||
    pw.length === 0 ||
    confirmPW.length === 0 ||
    phone.length === 0 ||
    userInfo.length === 0 ||
    gender === null ||
    !agree
  ) {
    alert('모든 값을 입력해주세요.');

    return;
  }

  //유효성 검사
  const { emailError, pwError, phoneError } = errorMsgFunc(
    emailInfo,
    pw,
    confirmPW,
    phone
  );

  if (emailError || pwError || phoneError) {
    return; // 이메일, 비밀번호, 전화번호가 유효하지 않으면 가입 중단
  }

  if (!isAuthBtnActioned) {
    alert('인증을 진행해주세요.');
    return;
  }

  //성별 값 추출
  const selectGender = gender.value;

  //회원정보 객체 저장
  const userInfoList = {
    name: memberName,
    email: emailInfo,
    password: pw,
    phone: phone,
    userInfo: userInfo,
    gender: selectGender,
    agree: agree.checked,
    registrationDate: `${year}-${month}-${day}`,
  };

  displayMember(userInfoList);

  alert(`
  ${memberName}님, 회원가입을 축하합니다.
  (가입일시 : ${year}-${month}-${day})`);

  // 모든 입력 필드를 초기화
  document.getElementById('memberName').value = '';
  document.getElementById('emailInfo').value = '';
  document.getElementById('pw').value = '';
  document.getElementById('confirmPW').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('userInfo').value = '';
  document.getElementById('authNum').innerText = '';

  // 체크박스와 라디오 버튼 선택 해제
  document.querySelector('input[name="gender"]:checked').checked = false;
  document.getElementById('info').checked = false;

  // 인증하기 버튼 초기화
  const verifyBtn = document.getElementById('verifyBtn');
  verifyBtn.disabled = true; // 인증하기 버튼 비활성화
  verifyBtn.innerText = '인증 하기'; // 버튼 텍스트 변경
  verifyBtn.style.backgroundColor = '#491449'; // 버튼 색상 초기화

  // 인증 상태 초기화
  isAuthNumRequested = false;
  isAuthBtnActioned = false;

  invalidBtnFunc();
}
//회원추가한거 leftMenu에 보이게 하는 함수
function displayMember(userInfo) {
  const memberInfoDiv = document.querySelector('.memberInfo');

  if (userInfo) {
    document.getElementById('defaultMsg').innerHTML = '';
  }

  // 전화번호 가운데 ***
  const phoneNum = userInfo.phone;
  const dash = phoneNum.split('-');
  const newPhone = dash[0] + '-' + '****' + '-' + dash[2];

  // 비밀번호 ****표시
  const pw = userInfo.password;
  const changePwStr = pw.toString();
  const length = changePwStr.length;
  const changePw = '*'.repeat(length);

  // 새로운 회원 정보를 위한 div 생성
  const memberListDiv = document.createElement('div');
  memberListDiv.className = 'member-list';
  memberListDiv.innerHTML = `
    <img src="./img/circleProfile.png">
    <p>${userInfo.name}</p>`;

  memberListDiv.addEventListener('click', function () {
    alert(`
    이름 : ${userInfo.name}
    이메일 : ${userInfo.email}
    비밀번호 : ${changePw}
    성별 : ${userInfo.gender}
    전화번호 : ${newPhone}
    동의여부 : ${userInfo.agree ? 'Y' : 'N'}
    자기소개 : ${userInfo.userInfo}
    (가입일시 : ${userInfo.registrationDate})`);
  });

  // 회원 정보를 memberInfoDiv에 추가
  memberInfoDiv.appendChild(memberListDiv);
}

let isAuthNumRequested = false;
let intervalId;
function requestAuthNum() {

  // 기존 타이머가 실행 중이라면 정지
  if (intervalId) {
    clearInterval(intervalId);
    disableVerifyButton(); // 버튼 비활성화
  }

  let time = 180;
  const randomNum = String(Math.floor(Math.random() * 1000000)).padStart(
    6,
    '0'
  );
  document.getElementById('authNum').innerText = randomNum;

  const verifyBtn = document.getElementById('verifyBtn');
  verifyBtn.disabled = false;
  verifyBtn.innerText = '인증 하기';
  verifyBtn.style.backgroundColor = ' #491449';

  document.getElementById('timer').style.display = 'block';

  updateTimer(time);

   intervalId = setInterval(function () {
    time = time - 1;
    updateTimer(time);
    if (time <= 0) {
      clearInterval(intervalId);
      disableVerifyButton();
    }
  }, 1000);
  isAuthNumRequested = true;
}
function disableVerifyButton() {
  const verifyBtn = document.getElementById('verifyBtn');
  verifyBtn.disabled = true;
  verifyBtn.style.backgroundColor = '#C7C7C7';
  verifyBtn.style.color = '#F2F2F2';
}
function updateTimer(time) {
  const minute = Math.floor(time / 60);
  const second = String(time % 60).padStart(2, '0');
  document.getElementById('timer').innerHTML = `<div>${minute}:${second}</div>`;
}

function authFunc() {
  const verifyBtn = document.getElementById('verifyBtn');

  if (!verifyBtn.disabled && isAuthNumRequested) {
    isAuthBtnActioned = true;
    // 버튼이 비활성화되지 않았을 때만 실행
    verifyBtn.disabled = true;
    verifyBtn.style.backgroundColor = '#C7C7C7';
    verifyBtn.innerText = '인증 완료';
    document.getElementById('timer').style.display = 'none';
    // return true; // 인증 완료
  }
  // return false; // 인증 미완료
}

//모든 값을 입력해야 btn 활성화
function invalidBtnFunc() {
  const memberName = document.getElementById('memberName').value;
  const emailInfo = document.getElementById('emailInfo').value;
  const pw = document.getElementById('pw').value;
  const confirmPW = document.getElementById('confirmPW').value;
  const phone = document.getElementById('phone').value;
  const userInfo = document.getElementById('userInfo').value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const agree = document.querySelector('input[id="info"]:checked');

  const registerBtn = document.getElementsByClassName('registerBtn')[0];

  if (
    memberName.length > 0 &&
    emailInfo.length > 0 &&
    pw.length > 0 &&
    confirmPW.length > 0 &&
    phone.length > 0 &&
    userInfo.length > 0 &&
    gender !== null &&
    agree
  ) {
    registerBtn.disabled = false;
    registerBtn.style.backgroundColor = '#491449';
    registerBtn.style.cursor = 'pointer';
  } else {
    registerBtn.disabled = true;
    registerBtn.style.backgroundColor = '';
  }
}

//input 에러메시지
function errorMsgFunc(email, pw, checkPw, phone) {
  const emailErrorInput = document.getElementById('emailError');
  const pwErrorInput = document.getElementById('pwError');
  const phoneErrorInput = document.getElementById('phoneError');

  const validDomains = ['naver.com', 'gmail.com', 'hanmail.net', 'kakao.com'];
  let emailParts = email.split('@');
  let value = phone.replace(/[^0-9]/g, '');

  let emailError = false;
  let pwError = false;
  let phoneError = false;

  //이메일 확인
  if (emailParts.length !== 2 || !validDomains.includes(emailParts[1])) {
    emailErrorInput.innerHTML = `
    이메일은 naver.com, gmail.com, hanmail.net, kakao.com 만 사용 가능합니다.
    `;
    emailError = true;
  } else {
    emailErrorInput.innerHTML = '';
  }

  // 비밀번호 확인
  if (pw !== checkPw) {
    pwErrorInput.innerText = '비밀번호가 일치하지 않습니다.';
    pwError = true;
  } else {
    pwErrorInput.innerText = '';
  }

  //전화번호
  if (value.slice(0, 3) !== '010' || value.length !== 11) {
    phoneErrorInput.innerText =
      '전화번호는 010으로 시작해야 하며, 11자리여야 합니다.';
    phoneError = true;
  } else {
    phoneErrorInput.innerText = '';
  }

  return { emailError, pwError, phoneError };
}

//비밀번호 실시간으로 에러메시지 나오게 하기

function checkPwFunc() {
  const pw = document.getElementById('pw').value;
  const confirmPW = document.getElementById('confirmPW').value;
  const pwErrorInput = document.getElementById('pwError');

  let pwError = false;

  if (pw !== confirmPW) {
    pwErrorInput.innerText = '비밀번호가 일치하지 않습니다.';
    pwError = true;
  } else {
    pwErrorInput.innerText = '';
  }
  return pwError;
}

//전화번호 '-' 형식 , 전화번호 에러메시지 실시간으로 나오게 하기
function formatPhoneNumber() {
  const phone = document.getElementById('phone');
  const phoneError = document.getElementById('phoneError');
  let value = phone.value.replace(/[^0-9]/g, ''); // 숫자만 남기기

  // 전화번호 형식에 맞게 하이픈 추가
  if (value.length > 11) {
    value = value.slice(0, 11); // 최대 11자리로 제한
  }

  if (value.length === 11) {
    phone.value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 010-xxxx-xxxx
    phoneError.textContent = '';
  } else {
    phoneError.innerText = '11자리의 전화번호를 모두 입력해주세요.';
  }
}
