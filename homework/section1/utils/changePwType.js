function changePwType(event) {
    const pwElement = document.getElementById("password");

    pwElement.type == "text"
        ? (pwElement.type = "password")
        : (pwElement.type = "text");
}
