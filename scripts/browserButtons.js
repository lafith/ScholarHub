//run when the scholarhub button get clicked.
//It search the url of active tab in scihub
browser.browserAction.onClicked.addListener((tab) => {
    browser.tabs.create({ url: "https://sci-hub.tw/"+tab.url });
});