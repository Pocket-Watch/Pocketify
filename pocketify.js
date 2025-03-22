
if (typeof browser === "undefined") {
    browser = chrome;
}

logInfo("FOREGROUND RUNNING!")

const insertButton = document.getElementById("insert");

function hideIfShown(element) {
    if (element.style.display !== "none") {
        element.style.display = "none";
    }
}

function main() {
}

main();