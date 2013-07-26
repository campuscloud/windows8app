(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/settings/html/account.html", {

        ready: function (element, options) {
            // Register the handlers for dismissal
            document.getElementById("programmaticInvocationSettingsFlyout").addEventListener("keydown", handleAltLeft);
            document.getElementById("programmaticInvocationSettingsFlyout").addEventListener("keypress", handleBackspace);

            //Seite befüllen
            document.getElementById("currentUser").innerText = Windows.Storage.ApplicationData.current.roamingSettings.values["username"];
            var service = document.getElementById("currentService");
            if (cloud.session.selectedServer == "") {
                service.innerText = Windows.Storage.ApplicationData.current.roamingSettings.values["manualCloudServer"];
            }
            else{
                service.setAttribute("lang", cloud.config.servers[cloud.session.selectedServer].langKey);
            }

            //Übersetzung aktualisieren
            cloud.functions.translateApp();

            //Event Handler
            document.getElementById("SettingsLogoutButton").addEventListener("click", this.logoutButtonEvent, false);

            var remainingSpace = document.getElementById("remainingSpace");
            //Prüfen ob verbleibender Speicher vom Backend angezeigt werden kann
            if (cloud.hasFunctionality({ functionkey: "getRemainingSpace" })) {
                $(remainingSpace).removeClass("invisible");

                cloud.getRemainingSpace(function (obj) {
                    /* success */
                    cloud.debug(obj.usedPercent);
                    document.getElementById("spaceBar").value = obj.usedPercentNum
                    document.getElementById("freeSpaceText").innerText = obj.usedBestText + " / " + obj.totalBestText
                }, function (obj) { /* error, hide me */ 
                    $(remainingSpace).addClass("invisible");
                });
            } else {
                $(remainingSpace).addClass("invisible");
            }
        },

        unload: function () {
            // Remove the handlers for dismissal
            document.getElementById("programmaticInvocationSettingsFlyout").removeEventListener("keydown", handleAltLeft);
            document.getElementById("programmaticInvocationSettingsFlyout").removeEventListener("keypress", handleBackspace);
        },

        //Logout Funktion
        logoutButtonEvent: function (eventInfo) {
            //Verberge das Einstellungsfenster
            window.focus();
            cloud.functions.logout();
        },
    });

    function handleAltLeft(evt) {
        // Handles Alt+Left in the control and dismisses it
        if (evt.altKey && evt.key === 'Left') {
            WinJS.UI.SettingsFlyout.show();
        }
    };

    function handleBackspace(evt) {
        // Handles the backspace key or alt left arrow in the control and dismisses it
        if (evt.key === 'Backspace') {
            WinJS.UI.SettingsFlyout.show();
        }
    };
})();

