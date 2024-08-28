function changePwCheckType(event) {
    event.stopPropagation();
    const pwElement = document.getElementById("passwordCheck");

    pwElement.type == "text"
        ? (pwElement.type = "password")
        : (pwElement.type = "text");
}
