﻿ /*********************************************************************************	
 The Campus Cloud software is available under a dual license of MIT or GPL v3.0
 
 Copyright (C) 2013
 	Benjamin Barann, Arne Cvetkovic, Patrick Janning, Simon Lansmann, 
 	David Middelbeck, Christoph Rieger, Tassilo Tobollik, Jannik Weichert
 
 /********************************************************************************	
 MIT License:
 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:
 
 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 
 See the MIT License for more details: http://opensource.org/licenses/MIT
 /*******************************************************************************
 GPL License:
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 /*******************************************************************************/
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

