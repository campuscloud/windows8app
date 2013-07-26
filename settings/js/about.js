(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/settings/html/about.html", {

        ready: function (element, options) {
            // Register the handlers for dismissal
            document.getElementById("programmaticInvocationSettingsFlyout").addEventListener("keydown", handleAltLeft);
            document.getElementById("programmaticInvocationSettingsFlyout").addEventListener("keypress", handleBackspace);

            //Übersetzung aktualisieren
            cloud.functions.translateApp();
        },

        unload: function () {
            // Remove the handlers for dismissal
            document.getElementById("programmaticInvocationSettingsFlyout").removeEventListener("keydown", handleAltLeft);
            document.getElementById("programmaticInvocationSettingsFlyout").removeEventListener("keypress", handleBackspace);
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

