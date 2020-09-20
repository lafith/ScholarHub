browser.commands.onCommand.addListener((command) => {
    if (command == "scholarKey") {
        browser.tabs.create({ url: "https://scholar.google.com/" });
    }
    if (command == "scihubKey") {
        browser.tabs.create({ url: "https://sci-hub.tw/" });
    }
});