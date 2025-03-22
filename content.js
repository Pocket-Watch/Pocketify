
const INSERT_COMMAND = "insert";

let isChromium = false;
if (typeof browser === "undefined") {
    isChromium = true;
    browser = chrome;
}

console.log("Adding content listener")
browser.runtime.onMessage.addListener(async (message, sender) => {
    if (message.type === INSERT_COMMAND) {
        await insertPlayer()
    }
});

function findCandidates() {
    return document.getElementsByTagName("video");
}

async function insertPlayer() {
    let videos = findCandidates();
    logInfo("Found", videos.length, "candidates")
    let resourceURL = browser.runtime.getURL("/player/pocket_player.js");
    let mod = await import(resourceURL);
    for (let video of videos) {
        console.info(video)
        let options = new mod.Options();
        options.hideNextButton = true;
        options.hideSpeedButton = true;
        options.hideSubtitlesButton = true;
        options.inactivityTime = 1500;
        let player = new mod.Player(video, options);
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