
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

function logInfo(...args) {
    const message = args.join(' ');
    console.info("%c[Pocketify]", "color: green;", message);
}

function logWarn(...args) {
    const message = args.join(' ');
    console.warn("%c[Pocketify]", "color: red;", message);
}

main();