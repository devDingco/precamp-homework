const student = [];
const errorMessage = {
  email: {
    domain:
      "이메일은 naver.com, gmail.com, hanmail.net,\nkakao.com 만 사용 가능합니다.",
    form: "제대로 된 이메일이 아닙니다. 이메일에 @가 없습니다.",
  },
  password: {
    auth: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
  },
  tel: {
    hypn: "전화번호 입력시 '-'를 입력해주세요\nex)010-1234-5678",
    stt: "전화번호는 010으로 시작해야 합니다.",
  },
};
let auth = false;

// 전화번호 검증 및 에러메시지 리턴
function inputTelValidation(tel) {
  let condition1 = false;
  for (let i = 0; i < tel.length; i++) {
    if (tel[i] === "-") condition1 = true;
  }
  if (condition1 === false) return errorMessage.tel.hypn;
  else if (tel.split("-")[0] !== "010") return errorMessage.tel.stt;
  else return "";
}

// 패스워드 검증 및 에러메시지 리턴
function inputPasswordValidation(password, password_val) {
  return password === password_val ? "" : errorMessage.password.auth;
}

// 이메일 검증 및 에러메시지 리턴
function inputEmailValidation(email) {
  let condition1, condition2;
  condition1 = false;
  condition2 = false;

  for (let i = 0; i < email.length; i++) {
    if (email[i] === "@") {
      condition1 = true;
      break;
    }
  }
  const domain = email.split("@")[1];
  if (
    domain === "naver.com" ||
    domain === "gmail.com" ||
    domain === "hanmail.net" ||
    domain === "kakao.com"
  )
    condition2 = true;

  if (condition1 === false) return errorMessage.email.form;
  else if (condition2 === false) return errorMessage.email.domain;
  else return "";
}

// 가입 버튼 활성화
function inputStatus() {
  const name = document.getElementById("input-name").value;
  const email = document.getElementById("input-email").value;
  const password = document.getElementById("input-password").value;
  const password_val = document.getElementById("input-password-val").value;
  const tel = document.getElementById("input-tel").value;
  const intro = document.getElementById("input-intro").value;
  const agreement = document.getElementById("agreement").checked;

  document.getElementById("register-button").disabled =
    name !== "" &&
    email !== "" &&
    password !== "" &&
    password_val !== "" &&
    tel !== "" &&
    intro !== "" &&
    auth !== false &&
    agreement !== false
      ? false
      : true;
}

// 학생 추가
function addStudent() {
  const name = document.getElementById("input-name").value;
  const email = document.getElementById("input-email").value;
  const password = document.getElementById("input-password").value;
  const password_val = document.getElementById("input-password-val").value;
  const tel = document.getElementById("input-tel").value;
  const intro = document.getElementById("input-intro").value;
  const male = document.getElementById("male").checked;
  const female = document.getElementById("female").checked;
  const gender = male === true ? "남성" : female === true ? "여성" : "";
  const today = new Date();

  const emailVal = inputEmailValidation(email);
  const passwordVal = inputPasswordValidation(password, password_val);
  const telVal = inputTelValidation(tel);

  document.getElementById("error-email").innerText = emailVal;
  document.getElementById("error-password").innerText = passwordVal;
  document.getElementById("error-tel").innerText = telVal;

  if (emailVal !== "") {
    document.getElementById("input-email").style = "border: 1px solid #e84f4f";
  } else {
    document.getElementById("input-email").style = "border: none";
  }

  if (passwordVal !== "") {
    document.getElementById("input-password").style =
      "border: 1px solid #e84f4f";
    document.getElementById("input-password-val").style =
      "border: 1px solid #e84f4f";
  } else {
    document.getElementById("input-password").style = "none";
    document.getElementById("input-password-val").style = "none";
  }

  if (telVal !== "") {
    document.getElementById("input-tel").style = "border: 1px solid #e84f4f";
  } else {
    document.getElementById("input-tel").style = "none";
  }
  if (emailVal === "" && passwordVal === "" && telVal === "") {
    const person = new Object();
    person.name = name;
    person.email = email;
    person.password = password;
    person.tel = tel;
    person.intro = intro;
    person.gender = gender;
    person.date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    console.log(person);

    student.push(person);

    alert(`회원가입을 축하합니다.\n(가입일시 : ${person.date})`);
    renderStudentList(student);
  }
}

// 학생 리스트 화면에 표시
function renderStudentList(student) {
  let divString = "";
  for (let i = 0; i < student.length; i++) {
    const alertString = `
    이름 : ${student[i].name}
    이메일 : ${student[i].email}
    비밀번호 : ${"*".repeat(student[i].password.length)}
    성별 : ${student[i].gender}
    전화번호 : ${maskTel(student[i].tel)}
    동의여부 : Y
    자기소개 : ${student[i].intro}
    `;
    divString += `<div class='list-profile' onclick="alert(\`${alertString}\`)">
      <img src='./assets/프로필 이미지.png'/>
      ${student[i].name}
    </div>`;
  }
  document.getElementById("student-list").innerHTML = divString;
}

// 전화번호 가운데 마스킹
function maskTel(tel) {
  const telArr = tel.split("-");
  return `${telArr[0]}-****-${telArr[2]}`;
}

// 인증번호 얻기
let timer;
function getAuthNum() {
  const authNum = String(Math.floor(Math.random() * 1000000)).padStart(6, 0);
  document.getElementById("auth-num").innerText = authNum;

  document.getElementById("auth-button").disabled = false;

  // 타이머
  clearInterval(timer);

  let t = 180;
  document.getElementById("timer").innerText = `03:00`;

  timer = setInterval(function () {
    t -= 1;
    const m = String(Math.floor(t / 60)).padStart(2, 0);
    const s = String(t % 60).padStart(2, 0);

    document.getElementById("timer").innerText = `${m}:${s}`;

    if (m == 0 && s == 0) {
      clearInterval(timer);
      document.getElementById("timer").innerText = `시간초과`;
      document.getElementById("auth-button").disabled = "true";
    }
  }, 1000);
}

function authButtonClick() {
  document.getElementById("auth-button").innerText = "인증 완료";
  document.getElementById("auth-button").disabled = "true";
  auth = true;
  document.getElementById("auth-num-request").disabled = "true";
  inputStatus();
  clearInterval(timer);
}
