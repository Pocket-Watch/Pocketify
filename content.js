
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

const POCKET_PLAYER_JS = "/pocket_player.js";
const POCKET_PLAYER_CSS = "/pocket_player.css";
const POCKET_PLAYER_SVG = "/pocket_player.svg";
let playerModule = null;
let PLAYER_DIR = browser.runtime.getURL("player");

logInfo("PLAYER_DIR", PLAYER_DIR)

// Checks if player css is loaded in the current active tab
function isPlayerCssLoaded(head) {
    let links = head.getElementsByTagName("link");
    for (let link of links) {
        if (link.href.endsWith(POCKET_PLAYER_CSS)) {
            return true;
        }
    }
    return false;
}

async function insertPlayer() {
    let videos = findCandidates();
    logInfo("Found", videos.length, "candidates")

    let head = document.getElementsByTagName("head")[0];
    if(!isPlayerCssLoaded(head)) {
        logInfo("Loading player css")
        let css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = PLAYER_DIR + POCKET_PLAYER_CSS;

        head.appendChild(css)
    }

    if (!playerModule) {
        logInfo("Loading player js")
        playerModule = await import(PLAYER_DIR + POCKET_PLAYER_JS);
    }

    for (let video of videos) {
        if (video.injected) {
            console.info("Skipping ", video)
            continue;
        }
        console.info(video)
        let options = new playerModule.Options();
        options.hideNextButton = true;
        options.hideSpeedButton = true;
        options.hideSubtitlesButton = true;
        options.inactivityTime = 1500;
        options.hideTimestamps = true;
        options.iconsPath = PLAYER_DIR + POCKET_PLAYER_SVG;
        let player = new playerModule.Player(video, options);
        // Marker to prevent re-attaching
        video.injected = true;
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
