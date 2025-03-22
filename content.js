
function logInfo(...args) {
    const message = args.join(' ');
    console.info("%c[Pocketify]", "color: green;", message);
}

function logWarn(...args) {
    const message = args.join(' ');
    console.warn("%c[Pocketify]", "color: red;", message);
}

