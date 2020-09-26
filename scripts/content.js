console.log("content.js started!");

var SCIHUB_LINK;

document.addEventListener('DOMContentLoaded', function () {

    chrome.runtime.sendMessage(
        { status: "getLink" }, gotLink);


    function gotLink(response) {
        SCIHUB_LINK = response.link;
        processPage(SCIHUB_LINK);
    }


    function processPage(SCIHUB_LINK) {
        console.log("link recieved from background : " + SCIHUB_LINK);

        let selector =
            '#gs_top>#gs_bdy>#gs_bdy_ccl>'
            + '#gs_res_ccl>#gs_res_ccl_mid>'
            + 'div.gs_r.gs_or.gs_scl';
        let paperdivs = document.querySelectorAll(selector);
        const heroku = 'https://cors-anywhere.herokuapp.com/';

        //div = paperdivs[4];
        for (let div of paperdivs) {
            let tag = div.querySelectorAll(
                'div.gs_ggs.gs_fl');
            if (tag.length == 0) {

                let paperLink = div.querySelector('div.gs_ri>h3.gs_rt>a').href;
                label = createDiv('gs_ggs gs_fl');
                let a = document.createElement('a');
                a.href = SCIHUB_LINK + paperLink;
                a.target = "_blank";
                //scihub-logo
                let file = "icons/scihub.png";
                let filePath = chrome.extension.getURL(file);
                let img = document.createElement('img');
                img.src = filePath;
                img.width = 20;
                img.height = 20;
                //finalizing the label div
                a.append(img);
                label.append(a);
                div.prepend(label);

            }
        }
    }

    function createDiv(className) {
        let div = document.createElement('div');
        div.className = className;
        return div;
    }

});
