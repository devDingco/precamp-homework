const buttonElement = document.getElementById("sign-button");
const timerElement = document.getElementById("timer");

let callStackValue;
let postFlag = false;

function onAuthClick() {
    clearInterval(callStackValue);
    postFlag = true;
    const randomElement = document.getElementById("sign-number");
    const random = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");

    randomElement.innerText = random;

    timerElement.innerText = `03:00`;
    let time = 180;

    callStackValue = setInterval(() => {
        time -= 1;

        const minute = Math.floor(time / 60);
        const second = time % 60 < 10 ? `0${time % 60}` : time % 60;
        timerElement.innerText = `0${minute}:${second}`;

        if (minute == 0 && second == 0) {
            clearInterval(callStackValue);
            buttonElement.style.backgroundColor = "rgba(199, 199, 199, 1)";
            buttonElement.disabled = true;
        }
    }, 1000);
}

function onClickButton() {
    if (!postFlag) {
        preventDefault();
    } else {
        buttonElement.innerText = "인증 완료";
        buttonElement.style.backgroundColor = "rgba(199, 199, 199, 1)";
        buttonElement.disabled = true;

        clearInterval(callStackValue);
        timerElement.remove();
    }
}
