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
//Version 2.11.130603

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
        //- Parameter und Rückgabewerte sind nach Möglichkeit gesammelt als ein Objekt zu übergeben
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
        Generic function to display an error message.
        @param obj = {
            msg  (string) Message to display
            }
        @return --
        */
        "showError",


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
            type                (string)    identifier of the backend, either "owncloud" or "sharepoint" or "config"
            host                (string)    backend host, either predefined name (set in config) or url
            port                (integer)   port number of custom backend *optional*
            downloadFunction    (function)  function to be called for file download
            uploadFunction      (function)  function to be called for file upload
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
        Get files and folders of a directory  (ASYNCHRONOUS)
        Should include a method to clean the strings it gets from the backend
        @param obj = {
            path            (string) path of target directory
            }
        @param  successCallback (function)  function to call if the request is successful
        @param  errorCallback   (function)  function to call if the request is successful
        @return --
        @return ASYNC Array(obj) = [{
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
        Get the remaining space that is allocated to the user (ASYNCHRONOUS)
        @param  successCallback (function)  function to call if the request is successful
        @param  errorCallback   (function)  function to call if the request is successful
        @return --
        @return ASYNC (obj) = {
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
        Get the translation for a given key

        @param (obj) = {
            key             (string)        translation key
            parameters      Array(string)   values to be integrated in the string *optional*
            }
        @return (string) translated key
        */
        "translate",


        /**
        Translates the whole document. Requires fields defined by following pattern (for any tag):
        <span lang="KEY"></span>

        @param --
        @return --
        */
        "translateAll",


        /**
        Format a number with decimal delimiters and thousands separators according to the current
        language settings, e.g. for en-us: 1.234,56

        @param (obj) = {
            key             (number)        translation key
            numDecimals     (integer)       amount of decimal digits to round to *optional*
            }
        @return (string) formatted number
        */
        "formatNumber",


        /**
        Delete the file or folder and its content (ASYNCHRONOUS)

        @param (obj) = {
            path            (string)        path to be deleted
            }
        @param  successCallback (function)  function to call if the request is successful
        @param  errorCallback   (function)  function to call if the request is successful
        @return --
        */
        "deleteObject",


        /**
        Move the file or folder and its content (ASYNCHRONOUS)

        @param (obj) = {
            srcPath         (string)     source path to be moved from
            targetPath      (string)     target path to be moved to
            }
        @param  successCallback (function)  function to call if the request is successful
        @param  errorCallback   (function)  function to call if the request is successful
        @return --
        */
        "moveObject",


        /**
        Rename the file or folder (ASYNCHRONOUS)

        @param (obj) = {
            path            (string)        path to be renamed
            }
        @param  successCallback (function)  function to call if the request is successful
        @param  errorCallback   (function)  function to call if the request is successful
        @return --
        */
        "renameObject",


        /**
        Create a folder on the server (ASYNCHRONOUS)

        @param (obj) = {
            path            (string)     path to the containing folder
            folderName      (string)     name of the folder
            }
        @param  successCallback (function)  function to call if the request is successful
        @param  errorCallback   (function)  function to call if the request is successful
        @return --
        */
        "createFolder",


        /**
        Upload a file (ASYNCHRONOUS)

        @param (obj) = {
            targetPath      (string)    target path to be uploaded to
            }
        @param  successCallback (function)  function to call if the request is successful
        @param  errorCallback   (function)  function to call if the request is successful
        @return --
        */
        "uploadFile",


        /**
        Download a file (ASYNCHRONOUS)

        @param (obj) = {
            path            (string)    target path to be downloaded from
            }
        @param  successCallback (function)  function to call if the request is successful
        @param  errorCallback   (function)  function to call if the request is successful
        @return --
        */
        "downloadFile",


        /**
        Get public link (ASYNCHRONOUS)

        @param (obj) = {
            path        (string)    target path of file or folder to get link from
            }
        @param  successCallback (function)  function to call if the request is successful
        @param  errorCallback   (function)  function to call if the request is successful
        @return --
        @return ASYNC obj = {
            origPath    (string)    target path
            link        (string)    link to the given path
        */
        "getPublicLink",


        /**
        Get a file icon path for a given filetype

        @param (obj) = {
            fileType    (string)    filetype, e.g. ".jpg"
            }
        @return  path   (string)
        */
        "getFileIcon",
    ]);

