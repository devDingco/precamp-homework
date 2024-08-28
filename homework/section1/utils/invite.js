import { isCorrectInfor } from "./isCorrectInfor.js";
function onInvite() {
    const inputNameValue = document.getElementById("name").value;
    const emailNameValue = document.getElementById("email").value;
    const passwordValue = "*".repeat(
        document.getElementById("password").value.length
    );
    let phoneValue = document.getElementById("phone").value;
    const introduceValue = document.getElementById("introduce").value;
    const checkboxValue = document.getElementById("checkbox").checked
        ? "Y"
        : "N";
    const genderValue = document.getElementById("man").checked
        ? "남성"
        : "여성";

    if (isCorrectInfor()) {
        if (phoneValue) {
            phoneValue =
                phoneValue.split("-")[0] + "-****-" + phoneValue.split("-")[2];
        }

        const deleteText = document.getElementById("text-delete");
        if (deleteText) deleteText.remove();

        const deleteButton = document.getElementById("button-delete");
        if (deleteButton) deleteButton.remove();

        const createElement = document.createElement("div");
        createElement.classList.add("student");

        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", "./img/Mask_group.png");
        imgElement.classList.add("img-studetn");
        createElement.appendChild(imgElement);

        const attendeeElement = document.createElement("div");
        attendeeElement.innerText = inputNameValue;
        attendeeElement.onclick = function () {
            alert(`이름: ${inputNameValue}
이메일: ${emailNameValue}
비밀번호: ${passwordValue}
성별: ${genderValue}
전화번호: ${phoneValue}
동의여부: ${checkboxValue}
자기소개: ${introduceValue}
(가입일시: ${year}-${month}-${day})`);
        };
        createElement.appendChild(attendeeElement);

        const studentElement = document.getElementById("student");
        studentElement.appendChild(createElement);

        const date = new Date();
        const year = date.getFullYear();
        const month =
            date.getMonth() + 1 < 10
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

        alert(`회원가입을 축하합니다.
(가입일시: ${year}-${month}-${day})`);
    }
}

const inviteButton = document.getElementById("invite-button");
inviteButton.addEventListener("click", onInvite);
