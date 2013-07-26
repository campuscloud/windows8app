﻿//Version 1.7.130525

//Specification of the backend interface
var Frontend = new Interface("Frontend",
    [
        //////////////
        // WICHTIG: Keine Änderungen ohne Absprache! 
        // Jede neue Version ist separat nochmal als frontendInterface-Vx.x.yymmdd.js 
        // im Ordner "res" zu speichern (z.B. frontendInterface-V0.1.130514.js)
        // (0=iteration, 1=version inkrementell, 130514=datum)
        //////////////

        //////////////
        // GRUNDLAGEN:
        //- Funktionen nutzen camelCase
        //- Funktionsbenennung: Verb + Beschreibung
        //- Englische Bezeichnung
        //- Parameter und Rückgabewerte sind immer gesammelt als ein Objekt zu übergeben
        //- Nicht-unterstützte Funktionen geben nichts zurück, müssen aber vorhanden sein
        //- Die aufrufende Funktion soll sicherstellen, dass nicht-unterstützte Funktionen 
        //  möglichst gar nicht erst aufgerufen werden
        //////////////

        /**
        Initialize Frontend
        @param obj = {
            backendtype     (string) which backend should be used
            }
        @return (boolean) Result of Initialization
        */
        "doInit",


        /**
        Print debug message if config is set to debug-mode
        ! This function is against the convention on purpose to keep the call short!
        @param msg  (string) Message to print
        @return --
        */
        "debug",


        /**
        Check if the function in question is supported by the backend implementation
        @param = obj = {
            functionkey     (string) identifier of the function to be tested
            }
        @return (boolean) support of this function
        */
        "hasFunctionality",


        /**
        Select the backend
        @param = obj = {
            type        (string)  identifier of the backend, either "owncloud" or "sharepoint" or "config"
            host        (string)  backend host, either predefined name (set in config) or url
            port        (integer) port number of custom backend *optional*
            }
        @return (boolean) support of this function
        */
        "setBackend",


        /**
        Perform all necessary actions to initially authenticate the user, 
        e.g. login, authorization protocol, api-key generation,...
        @param obj = {
            username        (string) user name
            password        (string) password
            }
        @param successCallback      (function) to be called when authentification is done and successful
        @param errorCallback        (function) to be called when authentification is done and with errors
        @return --
        */
        "doAuthentication",


        /**
        Perform all necessary actions to reauthenticate the user, 
        e.g. login-renewal, authorization protocol, api-key refresh,...
        @param obj = {
            username        (string) user name
            password        (string) password
            apikey          (string) apikey
            }
        @return (boolean) Result of Authentication efforts
        */
        "doReAuthentication",


        /**
        Checks if the current authentication is still valid
        @param --
        @return (boolean) login status
        */
        "isLoggedIn",

        /**
        Sets login status
        @param obj = {
            loginStatus     (boolean) login status
        }
        @return --
        */
        "setLoggedIn",

        /**
        Get files and folders of a directory 
        Should include a method to clean the strings it gets from the backend
        @param obj = {
            path            (string) path of target directory
            }
        @return Array(obj) = [{
            path            (string)    full path of an element
            dirName         (string)    path of the element with trailing "/"
            fileName        (string)    filename of the element
            fileType        (string)    filetype of the element
            isDir           (boolean)   is the element a directory itself?
            bestNum         (integer)   filesize in best fitting numerical value (in byte, kb, mb or gb) 
                                        (best = where value between 0 and 999)
            bestText        (string)    filesize in best fitting value with text suffix, e.g. "234 KB"
                                        (best = where value between 0 and 999)
            bNum            (integer)   filesize in bytes
            bText           (integer)   filesize in bytes with text suffix, e.g. "123 Byte"
            kbNum           (integer)   filesize in kilobytes
            kbText          (integer)   filesize in kilobytes with text suffix, e.g. "123 KB"
            mbNum           (integer)   filesize in megabytes
            mbText          (integer)   filesize in megabytes with text suffix, e.g. "123 MB"
            gbNum           (integer)   filesize in gigabytes
            gbText          (integer)   filesize in gigabytes with text suffix, e.g. "123 GB"
            }]
        */
        "getDirectoryContent",


        /**
        Get the remaining space that is allocated to the user
        @param --
        @return (obj) = {
            bestNum         (integer)   filesize in best fitting numerical value (in byte, kb, mb or gb) 
                                        (best = where value between 0 and 999)
            bestText        (string)    filesize in best fitting value with text suffix, e.g. "234 KB"
                                        (best = where value between 0 and 999)
            bNum            (integer)   filesize in bytes
            bText           (integer)   filesize in bytes with text suffix, e.g. "123 Byte"
            kbNum           (integer)   filesize in kilobytes
            kbText          (integer)   filesize in kilobytes with text suffix, e.g. "123 KB"
            mbNum           (integer)   filesize in megabytes
            mbText          (integer)   filesize in megabytes with text suffix, e.g. "123 MB"
            gbNum           (integer)   filesize in gigabytes
            gbText          (integer)   filesize in gigabytes with text suffix, e.g. "123 GB"
            }
        */
        "getRemainingSpace",


        /**
        Tries to retrieve the language of the user's current system

        @param --
        @return (obj) = {
            language        (string)        language key formatted for use in the app, e.g. "de-de", if found
            }
        */
        "getSystemLanguage",


        /**
        Set the user's custom language for translations

        @param (obj) = {
            customLanguage  (string)        language key
            }
        @return --
        */
        "setCustomLanguage",


        /**
        Special function to get the translation for a given key
        ! This function is against the convention on purpose to have a short name and a direct return value !

        @param (obj) = {
            key             (string)        translation key
            parameters      Array(string)   values to be integrated in the string *optional*
            }
        @return (string) translated key
        */
        "translate",


        /**
        Translates the whole document. Requires fields defined by following pattern (for any tag):
        <span lang="key"></span>

        @param --
        @return --
        */
        "translateAll"
    ]);
