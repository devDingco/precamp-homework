export function isCorrectInfor() {
    const emailNameValue = document.getElementById("email").value;
    const pwValue = document.getElementById("password").value;
    const pwCheckValue = document.getElementById("passwordCheck").value;
    const phoneValue = document.getElementById("phone").value;

    if (
        !emailNameValue.includes("@") ||
        (emailNameValue.split("@")[1] != "gmail.com" &&
            emailNameValue.split("@")[1] != "naver.com" &&
            emailNameValue.split("@")[1] != "hanmail.net")
    ) {
        alert("이메일 입력을 다시해주세요");
        return false;
    } else if (pwValue != pwCheckValue) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    } else if (phoneValue.length !== 13) {
        alert("전화번호를 정확히 적어주세요.");
    } else {
        return true;
    }
}
