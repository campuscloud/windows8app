(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/settings/html/general.html", {

        ready: function (element, options) {
            // Register the handlers for dismissal
            document.getElementById("programmaticInvocationSettingsFlyout").addEventListener("keydown", handleAltLeft);
            document.getElementById("programmaticInvocationSettingsFlyout").addEventListener("keypress", handleBackspace);

            //Sprache
            var languageSelection = document.getElementById("languageSelection");
            var languageCode = Windows.Storage.ApplicationData.current.roamingSettings.values["language"];

            if (languageCode) {
                if (languageCode == "de-de") {
                    languageSelection.value = 1;
                }
                else if (languageCode == "en-us") {
                    languageSelection.value = 2;
                }
                else {
                    languageSelection.value = 2;
                }
            }

            //AutoScroll
            var autoscrollCheckbox = document.getElementById("autoscrollCheckbox");
            var autoScroll = Windows.Storage.ApplicationData.current.roamingSettings.values["autoScroll"];
            autoscrollCheckbox.checked = autoScroll;
            

            //Event Handler
            var languageSelection = document.getElementById("languageSelection");
            languageSelection.addEventListener("change", this.buttonChangeLanguage, false);

            autoscrollCheckbox.addEventListener("click", this.changeScrollType, false);

            var resetButton = document.getElementById("resetButton");
            resetButton.addEventListener("click", this.resetAllSettings, false);

            //Übersetzung aktualisieren
            cloud.functions.translateApp();

            //Autoscroll-Handling
            document.getElementById("autoscrollCheckbox").addEventListener("click", this.changeScrollType, false);
        },

        changeScrollType: function (eventInfo) {
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;

            roamingSettings.values["autoScroll"] = autoscrollCheckbox.checked;
    },

        unload: function () {
            // Remove the handlers for dismissal
            document.getElementById("programmaticInvocationSettingsFlyout").removeEventListener("keydown", handleAltLeft);
            document.getElementById("programmaticInvocationSettingsFlyout").removeEventListener("keypress", handleBackspace);
        },

        buttonChangeLanguage: function (eventInfo) {
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;
            var languageSelection = document.getElementById("languageSelection").value;

            //Speichern der Sprachauswahl
            

            //SPRACHAUSWAHL aktuallisieren
            if (languageSelection == 1) {
                cloud.setCustomLanguage({ customLanguage: "de-de" });
                roamingSettings.values["language"] = "de-de";
            }
            else if (languageSelection == 2) {
                cloud.setCustomLanguage({ customLanguage: "en-us" });
                roamingSettings.values["language"] = "en-us";
            }
            else {
                cloud.setCustomLanguage({ customLanguage: "en-us" });
                roamingSettings.values["language"] = "en-us";
            }

            //Sprache aktualisieren
            cloud.functions.translateApp();

            //Verhindere Crash auf Loginseite
            try{
                cloud.pages.directoryView.loadFolder();
            } catch (e) {
            }
        },

        resetAllSettings: function () {
            cloud.functions.resetSettings();
            //Leere Session Variablen --> Verhindere Dauer-Crash sofern ein Server gewählt wurde, alle Daten zurückgesetzt wurden und anschließend ohne neue Wahl des Servers ein Login stattfindet
            //In diesem Fall wird ein Autologin versucht ohne dass ein BackendTyp in den Appdaten vorhanden ist...
            //Daher Login wie angedacht verhindern sofern keine Serverauswahl getroffen wurde
            cloud.session.selectedServer = "";
            cloud.session.selectedServerType
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

