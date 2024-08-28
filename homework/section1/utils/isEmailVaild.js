function isEmailVaild() {
    const emailValue = document.getElementById("email").value;
    if (emailValue) {
        if (!emailValue.includes("@")) {
            alert("제대로 된 이메일이 아닙니다. 이메일에 @가 없습니다.");
        } else if (
            emailValue.split("@")[1] != "gmail.com" &&
            emailValue.split("@")[1] != "naver.com" &&
            emailValue.split("@")[1] != "hanmail.net"
        )
            alert(
                "이메일은 naver.com, gmail.com, hanmail.net 중에서만 가입 가능합니다."
            );
    }
}
