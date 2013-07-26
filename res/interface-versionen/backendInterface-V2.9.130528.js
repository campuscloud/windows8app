﻿//Version 2.9.130528

//Specification of the backend interface
var Backend = new Interface("Backend",
    [
        //////////////
        // WICHTIG: Keine Änderungen ohne Absprache! 
        // Jede neue Version ist separat nochmal als backendInterface-Vx.x.yymmdd.js 
        // im Ordner "res" zu speichern (z.B. backendInterface-V0.1.130514.js)
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
        Initialize Backend
        @param = obj = {
            host        (string)  url
            port        (integer) port number of custom backend
            }
        @return (boolean) Result of Initialization
        */
        "doInit",

        /**
        Print debug message if config is set to debug-mode
        ! This function is against the convention on purpose to keep the call short!
        @param msg  (string) Message to print
        @return -
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
        Perform all necessary actions to initially authenticate the user, 
        e.g. login, authorization protocol, api-key generation,...
        @param obj = {
            username        (string) user name
            password        (string) password
            }
        @return (boolean) Result of Authentication efforts
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
        @param obj = {
            path            (string) path of target directory
            }
        @return Array(obj) = [{
            path            (string)    path of element from root element
            isDir           (boolean)   is the element a directory itself?
            fileSize        (integer)   filesize in bytes
            }]
        */
        "getDirectoryContent",


        /**
        Get the remaining space that is allocated to the user
        @param --
        @return (obj) = {
            remaining       (integer)   remaining space in bytes
            }
        */
        "getRemainingSpace",


        /**
        Delete the file or folder (and its content)

        @param (obj) = {
            path            (string)        path to be deleted
            }
        @return (boolean) result of deletion
        */
        "deleteObject",


        /**
        Move the file or folder (and its content)

        @param (obj) = {
            srcPath         (string)     source path to be moved from
            targetPath      (string)     target path to be moved to
            }
        @return (boolean) result of action
        */
        "moveObject",


        /**
        Create a folder on the server

        @param (obj) = {
            path            (string)     path to the containing folder
            folderName      (string)     name of the folder
            }
        @return (boolean) result of action
        */
        "createFolder",


        /**
        Upload a file

        @param (obj) = {
            file            (????)      file to be uploaded
            targetPath      (string)    target path to be uploaded to
            }
        @return (boolean) result of action
        */
        "uploadFile",


        /**
        Download a file

        @param (obj) = {
            path            (string)    target path to be uploaded to
            }
        @return (boolean) result of action
        */
        "downloadFile",
    ]);
