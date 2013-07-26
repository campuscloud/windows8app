(function () {
    "use strict";

    //Liste der Dateiversionen
    var listViewItems;

    var historyView = WinJS.UI.Pages.define("/settings/html/history.html", {

        ready: function (element, options) {
            //Funktionen
            cloud.pages.history.restore = this.restoreFile;
            cloud.pages.history.cancel = this.cancelRestore;

            document.getElementById("historyProgressRing").style.visibility = 'hidden';

            //Seitentitel
            document.getElementById("filename").innerText = cloud.context.history.file.title;

            //Init Listview
            var listView = document.getElementById("historyView").winControl;
            //LAYOUT
            listView.layout = new WinJS.UI.ListLayout({ horizontal: false });
            listView.addEventListener("selectionchanged", historyView.prototype.selectionChangedEvent);
            this.loadHistory();
            this.selectionChangedEvent();

            //Übersetzung aktualisieren
            cloud.functions.translateApp();

            // History Tastatur-Kontext
            cloud.setKeystrokeContext({
                context: "directoryHistory",
                actions: {
                    restore: cloud.pages.history.restore,
                }
            });

            this.addEventListener("beforehide", function ()
            {
                //Tastaturkontext zurück setzen
                cloud.getPreviousKeystrokeContext();
            });
        },

        unload: function () {
            // Remove the handlers for dismissal
        },

        selectionChangedEvent: function(){
            var listView = document.getElementById("historyView").winControl;
            if (listView.selection.count() == 1) {
                var indices = listView.selection.getIndices();
                var selectedItem = listViewItems.getAt(indices[0]);
                if (selectedItem.versionId == "current") {
                    //Verhindere Selektion
                    listView.selection.set([]);
                } else{
                    document.getElementById("restoreSelectedFile").disabled = false;
                }
            } else {
                document.getElementById("restoreSelectedFile").disabled = true;
            }
        },

        loadHistory: function () {
            document.getElementById("historyProgressRing").style.visibility = 'visible';
            //Dateihistorie laden
            cloud.getVersions({
                path: cloud.context.history.file.path,
            },
                historyView.prototype.reloadHistoryView,
                function () {
                    cloud.functions.showMessageDialog("HISTORYERROR");
                    document.getElementById("historyProgressRing").style.visibility = 'hidden';
                    cloud.showError();
                });
        },

        reloadHistoryView: function (historyList) {
            //Loading Indicator anzeigen
            document.getElementById("historyProgressRing").style.visibility = 'visible';
            var listView = document.getElementById("historyView").winControl;
            //Auslesen der Dateihistorie
            var items = [];

            var versionCounter = historyList.length + 1;

            //Aktuelle Version
            items[0] = {
                title: cloud.translate("VERSION") + ": " + versionCounter + " (" + cloud.translate("CURRENT") + ")",
                versionId: "current",
                date: cloud.context.history.file.date,
                picture: cloud.getFileIcon({ fileType: cloud.context.history.file.fileType }),
            };

            var index = 1;
            for (var i in historyList) {
                items[index] = {
                    title: cloud.translate("VERSION") + ": " + (versionCounter - index),
                    path: historyList[i].path,
                    versionId: historyList[i].versionId,
                    date: historyList[i].date,
                    picture: cloud.getFileIcon({ fileType: cloud.context.history.file.fileType }),
                };
                index++;
            }

            //Übertragen der Title-Liste in ListView
            listViewItems = new WinJS.Binding.List(items);

            //ListView Listeninhalt übergeben
            listView.itemDataSource = listViewItems.dataSource;

            //Loading Indicator ausblenden
            document.getElementById("historyProgressRing").style.visibility = 'hidden';
        },

        restoreFile: function (e) {
            var listView = document.getElementById("historyView").winControl;
            if (listView.selection.count() == 1) {
                var indices = listView.selection.getIndices();
                var selectedItem = listViewItems.getAt(indices[0]);

                if (selectedItem.versionId != "current") {

                    cloud.restoreVersion(
                        {
                            path: selectedItem.path,
                            versionId: selectedItem.versionId
                        },
                        function () {
                            cloud.functions.showNotification(cloud.translate("ACTIONCOMPLETE"), cloud.translate("FILERESTOREDFROMHISTORY"), "/images/notifications/success.png");
                            //Sofern eine Datei wiederhergestellt wird, die gerade angezeigt wird:
                            //Vorschau ggf. aktuallisieren
                            if (document.getElementById("previewHeader").innerText == cloud.context.history.file.title) {
                                cloud.context.history.file.hasTemporaryFile = false;
                                cloud.context.history.file.temporaryFile = null;
                                cloud.pages.directoryView.updatePreview();
                            }

                            cloud.pages.directoryView.loadFolder();
                            window.focus();
                        },
                        function () {
                            //error
                            cloud.functions.showMessageDialog("FILERESTOREERROR");
                            window.focus();
                        });
                } else {
                    //UNUSED
                    cloud.functions.showMessageDialog("FILEALREADYCURRENT");
                }
            }
        },
    });
})();

