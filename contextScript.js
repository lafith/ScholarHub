browser.contextMenus.create({
    id: "scholar",
    title: "Search on Google Scholar",
    contexts: ["selection"]
});
browser.contextMenus.onClicked.addListener(contextMenuAction);
function contextMenuAction(info, tab) {
    const url = "https://scholar.google.com/scholar?q=" + info.selectionText;
    browser.tabs.create({ url: url });
}
