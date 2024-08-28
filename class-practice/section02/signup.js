function onInvite() {
    const emailInputValue = document.getElementById("email").value;
    // 회원가입을 축하합니다. 가입하신 이메일은 code***@gmail.com입니다.

    const emailValue = emailInputValue.split("@")[0];
    const maskEmail =
        emailValue.slice(0, emailValue.length - 4) +
        "****@" +
        emailInputValue.split("@")[1];

    if (!emailInputValue.includes("@")) {
        alert("제대로 된 이메일이 아닙니다. 이메일에 @가 없습니다.");
    } else if (
        emailInputValue.split("@")[1] != "gmail.com" &&
        emailInputValue.split("@")[1] != "naver.com" &&
        emailInputValue.split("@")[1] != "hanmail.net"
    )
        alert(
            "이메일은 naver.com, gmail.com, hanmail.net 중에서만 가입 가능합니다."
        );
    else {
        alert(`회원가입을 축하합니다.`);
    }
}
