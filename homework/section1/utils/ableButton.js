function onAbleButton() {
    const inputNameValue = document.getElementById("name").value;
    const emailNameValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
    const passwordCheckValue = document.getElementById("passwordCheck").value;
    let phoneValue = document.getElementById("phone").value;
    const introduceValue = document.getElementById("introduce").value;
    const checkBoxBoolean = document.getElementById("checkbox").checked;
    const manValue = document.getElementById("man").checked;
    const womanValue = document.getElementById("woman").checked;
    const complete = document.getElementById("sign-button").innerText;

    const buttonValue = document.getElementById("invite-button");

    if (
        inputNameValue &&
        emailNameValue &&
        passwordValue &&
        passwordCheckValue &&
        phoneValue &&
        introduceValue &&
        checkBoxBoolean &&
        (manValue || womanValue) &&
        complete === "인증 완료"
    ) {
        buttonValue.disabled = false;
        buttonValue.style.backgroundColor = "rgba(73, 20, 73, 1)";
    } else {
        buttonValue.disabled = true;
        buttonValue.style.backgroundColor = "rgba(199, 199, 199, 1)";
    }
}
