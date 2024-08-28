function onDashPlus(event) {
    if (event.target.value.length === 8) {
        event.target.value += "-";
    }
    if (event.target.value.length === 14) {
        event.target.value = event.target.value.slice(0, -1);
    }
}
