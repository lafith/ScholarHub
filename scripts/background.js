console.log('Background running...');

let SCIHUB_LINK = '';
//searching for the latest working scihub link
let url = "https://sci-hub.now.sh/";

fetch(url)
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const results = doc.getElementsByClassName('biglink');
        return results[0].href;
    }).then(link => {
        //chrome.storage.local.set({ 'scihub_link': link });
        SCIHUB_LINK = link;
        console.log("latest link : " + SCIHUB_LINK);
    });

chrome.runtime.onMessage.addListener(gotMsg);
function gotMsg(msg, sender, sendResponse) {
    if (msg.status == "getLink") {
        sendResponse({ link: SCIHUB_LINK })
    }
    else if (msg.status == "checkPaper") {
        const heroku = 'https://cors-anywhere.herokuapp.com/';
        let url = heroku + SCIHUB_LINK + msg.paper;
        var status;
        fetch(url).then(r => r.text()).then(d => console.log(d));

    }
}

chrome.browserAction.onClicked.addListener(buttonClicked);
function buttonClicked(tab) {
    chrome.tabs.create(
        { url: SCIHUB_LINK + tab.url });
}

chrome.commands.onCommand.addListener((command) => {
    if (command == "scholarKey") {
        chrome.tabs.create({ url: "https://scholar.google.com/" });
    }
    if (command == "scihubKey") {
        //console.log(SCIHUB_LINK);
        chrome.tabs.create({ url: SCIHUB_LINK });
    }
});


chrome.contextMenus.create({
    "title": "Search on Sci-Hub",
    "contexts": ["link"],
    "onclick": searchScihub
});

chrome.contextMenus.create({
    "title": "Search on Google Scholar",
    "contexts": ["selection"],
    "onclick": searchScholar
});

function searchScihub(info, tab) {
    let url = SCIHUB_LINK + info.linkUrl;
    chrome.tabs.create({ url: url });
}

function searchScholar(info, tab) {
    const url = "https://scholar.google.com/scholar?q=" + info.selectionText;
    chrome.tabs.create({ url: url });
}