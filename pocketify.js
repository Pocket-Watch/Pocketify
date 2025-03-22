
if (typeof browser === "undefined") {
    browser = chrome;
}

logInfo("FOREGROUND RUNNING!")

const INSERT_COMMAND = "insert";
const insertButton = document.getElementById("insert");
insertButton.addEventListener("click", _ => {
    browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let activeTab = tabs[0];
        console.debug("Sending info to background tab", activeTab);
        browser.tabs.sendMessage(activeTab.id, {type: INSERT_COMMAND});
    })
})

function hideIfShown(element) {
    if (element.style.display !== "none") {
        element.style.display = "none";
    }
}

function logInfo(...args) {
    const message = args.join(' ');
    console.info("%c[Pocketify]", "color: green;", message);
}

function logWarn(...args) {
    const message = args.join(' ');
    console.warn("%c[Pocketify]", "color: red;", message);
}