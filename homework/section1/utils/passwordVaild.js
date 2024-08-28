let flag = false;

function changePwType() {
    flag = true;
    const pwElement = document.getElementById("password");

    pwElement.type = pwElement.type === "text" ? "password" : "text";
}

function changePwCheckType() {
    flag = true;
    const pwElement = document.getElementById("passwordCheck");

    pwElement.type = pwElement.type === "text" ? "password" : "text";
}

function onPasswordVaild() {
    if (flag) {
        flag = false;
        return;
    }
    const pwValue = document.getElementById("password").value;
    const pwCheckValue = document.getElementById("passwordCheck").value;

    if (pwCheckValue && pwValue) {
        if (pwCheckValue !== pwValue) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }
    }
}
