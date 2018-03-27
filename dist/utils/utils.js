"use strict";

let Promise = require("bluebird");

let Utils = module.exports = {
    loadLib: url => {
        return new Promise((resolve, reject) => {
            let isFirstLoad = false;
            let load = () => {
                isFirstLoad = true;
                // Remove the script before appending it to the body
                let currentScriptTag = document.querySelector(`script[src="${url}"]`);

                let currentScriptTagIsAlreadyAppended = currentScriptTag && currentScriptTag.remove;
                if (currentScriptTagIsAlreadyAppended) currentScriptTag.remove();

                let script = document.createElement("script");
                script.type = "text/javascript";
                if (script.readyState) {
                    // IE
                    script.onreadystatechange = () => {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            resolve();
                        }
                    };
                } else {
                    // Others
                    script.onload = () => resolve();
                    script.onerror = () => reject();
                }
                script.src = url;
                document.getElementsByTagName("head")[0].appendChild(script);
            };
            return navigator.onLine ? load() : window.addEventListener("online", e => {
                if (isFirstLoad) load();
            });
        });
    },
    pad: number => {
        return number < 10 ? '0' + number.toString() : number.toString();
    }
};