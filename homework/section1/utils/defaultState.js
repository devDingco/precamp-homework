let isBackspacePressedFlag2 = false;
function defaultState(event) {
    if (event.key === "Backspace" || event.key === "Delete") {
        isBackspacePressedFlag2 = true;
        if (event.target.value.length <= 4) {
            event.preventDefault();
        }
    } else {
        isBackspacePressedFlag2 = false;
    }
}

function onDashPlus(event) {
    if (isBackspacePressedFlag2) {
        isBackspacePressedFlag2 = false;
        return;
    }
    if (event.target.value.length === 8) {
        event.target.value += "-";
    }
    if (event.target.value.length === 14) {
        event.target.value = event.target.value.slice(0, -1);
    }
}
