function onInvite() {
    const emailInputValue = document.getElementById("email").value;
    // 회원가입을 축하합니다. 가입하신 이메일은 code***@gmail.com입니다.

    const emailValue = emailInputValue.split("@")[0];
    const maskEmail =
        emailValue.slice(0, emailValue.length - 4) +
        "****@" +
        emailInputValue.split("@")[1];

    alert(`회원가입을 축하합니다. 가입하신 이메일은 ${maskEmail}입니다.`);
}
