//Version 1.2.130515

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
        //- Parameter und Rückgabewerte sind immer gesammelt als ein Objekt zu übergeben
        //- Nicht-unterstützte Funktionen geben nichts zurück, müssen aber vorhanden sein
        //- Die aufrufende Funktion soll sicherstellen, dass nicht-unterstützte Funktionen 
        //  möglichst gar nicht erst aufgerufen werden
        //////////////

        /**
        Initialize Backend
        @param --
        @return (boolean) Result of Initialization
        */
        "doInit",

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
            host        (string)  url
            port        (integer) port number of custom backend
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
        Get files and folders of a directory 
        @param obj = {
            path            (string) path of target directory
            }
        @return Array(obj) = [{
            path            (string)    path of element
            isDir           (boolean)   is the element a directory itself?
            filesize        (integer)   filesize in bytes
            }]
        */
        "getDirectoryContent"

        /**
        Get the remaining space that is allocated to the user
        @param --
        @return (obj) = {
            remaining       (integer)   remaining space in bytes
            }
        */
        //"getRemainingSpace"

    ]);

