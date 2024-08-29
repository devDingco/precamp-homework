const user = [];

// 날짜
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const todayDate = `${year}-${month}-${day}`;

// 모든 값을 입력 받아야 하는 기능
function isNotEmpty() {
  const userName = document.getElementById("info-name").value;
  const email = document.getElementById("info-email").value;
  const password = document.getElementById("info-password").value;
  const checkPassword = document.getElementById("info-password-check").value;
  const phoneNumber = document.getElementById("info-phone").value;
  const introduce = document.getElementById("info-intro").value;
  const option1 = document.getElementById("woman").checked;
  const option2 = document.getElementById("man").checked;
  const agree = document.getElementById("agree").checked;

  const gender = option1 || option2;
  const emailCheck = checkEmail(email);
  const phoneCheck = checkPhoneNumber(phoneNumber);
  const allFilled =
    userName !== "" &&
    email !== "" &&
    password !== "" &&
    checkPassword !== "" &&
    phoneNumber !== "" &&
    introduce !== "" &&
    gender &&
    agree &&
    emailCheck &&
    phoneCheck;

  const signupBtn = document.getElementById("signup-btn");

  if (allFilled && password === checkPassword) {
    signupBtn.disabled = false;
    signupBtn.style.backgroundColor = "#491449";
  } else {
    signupBtn.disabled = true;
    signupBtn.style.backgroundColor = "#c7c7c7";
  }
}

// 비번 일치 여부
function checkPasswords() {
  const password = document.getElementById("info-password").value;
  const confirmPassword = document.getElementById("info-password-check").value;
  const messageElement = document.getElementById("warning-text-password");
  const signupBtn = document.getElementById("signup-btn");
  const outline = document.getElementById("signup-list-element");

  if (password === confirmPassword) {
    messageElement.innerHTML = "";
    isNotEmpty();
  } else {
    messageElement.innerText = "비밀번호가 일치하지 않습니다.";
    messageElement.style.color = "#e84f4f";
    messageElement.style.fontSize = "14px";
    messageElement.style.fontWeight = "400";
    signupBtn.disabled = true;
    signupBtn.style.backgroundColor = "#c7c7c7";
  }
}

// 이메일 검증 함수
function checkEmail(email) {
  const messageElement = document.getElementById("warning-text-email");
  const checkEmail = email.split("@");

  if (checkEmail.length !== 2) {
    messageElement.innerText = "제대로 된 이메일이 아닙니다. 이메일에 @가 없습니다.";
    messageElement.style.color = "#e84f4f";
    messageElement.style.fontSize = "14px";
    messageElement.style.fontWeight = "400";
    return false;
  } else {
    const browserEmail = checkEmail[1].split(".");

    if (browserEmail[0] === "naver" || browserEmail[0] === "gmail" || browserEmail[0] === "hanmail") {
      messageElement.innerText = "";
      messageElement.style.color = "#e84f4f";
      messageElement.style.fontSize = "14px";
      messageElement.style.fontWeight = "400";
      return true;
    } else {
      messageElement.innerText = "이메일은 naver.com, gmail.com, hanmail.net 중에서만 가입 가능합니다.";
      messageElement.style.width = "320px";
      messageElement.style.color = "#e84f4f";
      messageElement.style.fontSize = "14px";
      messageElement.style.fontWeight = "400";
      return false;
    }
  }
}

// 전화번호 검증 함수
function checkPhoneNumber(phoneNumber) {
  const messageElement = document.getElementById("warning-text-phone");
  const signupBtn = document.getElementById("signup-btn");

  const phoneParts = phoneNumber.split("-");

  if (phoneParts.length !== 3) {
    messageElement.innerText = "전화번호 입력 시 ‘-’를 입력해주세요.";
    messageElement.style.color = "#e84f4f";
    messageElement.style.fontSize = "14px";
    messageElement.style.fontWeight = "400";
    signupBtn.disabled = true;
    signupBtn.style.backgroundColor = "#c7c7c7";
    return false;
  }

  if (phoneParts[0] !== "010") {
    messageElement.innerText = "전화번호는 010으로 시작해야 합니다.";
    messageElement.style.color = "#e84f4f";
    messageElement.style.fontSize = "14px";
    messageElement.style.fontWeight = "400";
    signupBtn.disabled = true;
    signupBtn.style.backgroundColor = "#c7c7c7";
    return false;
  }

  messageElement.innerText = "";
  return true;
}

// 가입 버튼 클릭시
function newProfileCreate() {
  if (document.getElementById("signup-btn").disabled) {
    return;
  }

  const userName = document.getElementById("info-name").value;
  const email = document.getElementById("info-email").value;
  const password = document.getElementById("info-password").value;
  const phoneNumber = document.getElementById("info-phone").value;
  const introduce = document.getElementById("info-intro").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const agree = document.getElementById("agree").checked ? "Y" : "N";

  // 전화번호 암호화
  let hiddenPhoneNumber = "";
  if (phoneNumber !== "") {
    const shortNumber = phoneNumber.split("-");
    const firstNumber = shortNumber[0];
    const lastNumber = shortNumber[shortNumber.length - 1];
    const hiddenNumber = "****";
    hiddenPhoneNumber = firstNumber + "-" + hiddenNumber + "-" + lastNumber;
  }

  const newProfile = {
    name: userName,
    email: email,
    password: password,
    gender: gender,
    phone: hiddenPhoneNumber,
    agree: agree,
    introduce: introduce,
    date: todayDate,
  };

  user.push(newProfile);
  console.log(user);

  updateProfileList();

  alert(`회원가입을 축하합니다.
(가입일시: ${todayDate})`);

  // 회원가입 입력 초기화
  document.getElementById("info-name").value = "";
  document.getElementById("info-email").value = "";
  document.getElementById("info-password").value = "";
  document.getElementById("info-password-check").value = "";
  document.getElementById("info-phone").value = "";
  document.getElementById("info-intro").value = "";
  document.getElementById("woman").checked = false;
  document.getElementById("man").checked = false;
  document.getElementById("agree").checked = false;

  // 가입 후 다시 버튼 비활성화
  document.getElementById("signup-btn").disabled = true;
  document.getElementById("signup-btn").style.backgroundColor = "#c7c7c7";
}

function updateProfileList() {
  const studentList = document.getElementById("student-list-open");
  studentList.innerHTML = "";

  for (let index = 0; index < user.length; index++) {
    const profile = user[index];
    const profileButton = document.createElement("button");
    profileButton.innerHTML = `<img src="./icon/프로필 이미지.png"/>수강생 ${index + 1}`;
    profileButton.onclick = function () {
      showInfomation(index);
    };
    studentList.appendChild(profileButton);
  }
}

// 사용자 정보 팝업
function showInfomation(index) {
  const profile = user[index];
  alert(
    `이름: ${profile.name}
이메일: ${profile.email}
비밀번호: ${profile.password}
성별: ${profile.gender}
전화번호: ${profile.phone}
동의여부: ${profile.agree}
자기소개: ${profile.introduce}
(가입일시: ${profile.date})`
  );
}

// 페이지 로드 시 초기 버튼 상태 설정
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("signup-btn").disabled = true;
  document.getElementById("signup-btn").style.backgroundColor = "#c7c7c7";
});

// 인증번호 요청 -> 인증번호 및 타이머
let timerFun;

function authButton() {
  clearInterval(timerFun);
  const randomAuthNum = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  document.getElementById("auth-num").innerText = randomAuthNum;

  document.getElementById("agree-btn").style = "background-color: #491449";

  document.getElementById("auth-time").innerText = "3:00";

  let time = 179;
  timerFun = setInterval(function () {
    const min = String(Math.floor(time / 60)).padStart(1, "0");
    const sec = String(time % 60).padStart(2, "0");

    if (min === "0" && sec === "00") {
      clearInterval(timerFun);
      document.getElementById("agree-btn").disabled = true;
      document.getElementById("agree-btn").style = "background-color: #c7c7c7";
    }
    document.getElementById("auth-time").innerText = `${min}:${sec}`;
    time--;
  }, 1000);
}

// 인증 완료
function authCheckButton() {
  document.getElementById("agree-btn").disabled = true;
  document.getElementById("agree-btn").innerText = "인증완료";
  document.getElementById("agree-btn").style = "background-color: #c7c7c7";
  clearInterval(timerFun);
  document.getElementById("auth-time").innerText = "";
}
