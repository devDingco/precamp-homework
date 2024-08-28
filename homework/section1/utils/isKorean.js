let isBackspacePressedFlag = false;

function handleKeyDown(event) {
    if (event.key === "Backspace" || event.key === "Delete") {
        isBackspacePressedFlag = true;
    } else {
        isBackspacePressedFlag = false;
    }
}

function isKorean() {
    const inputNameValue = document.getElementById("name").value;

    const koreanPattern = /^[\u3131-\u318E\uAC00-\uD7A3]+$/;

    if (!isBackspacePressedFlag && !koreanPattern.test(inputNameValue)) {
        document.getElementById("name").value = inputNameValue.slice(0, -1);
        alert("이름은 한글만 입력해주세요.");
    }
}
