sap.ui.define([], function () {
    "use strict";

    return {
        numberState: function (precio) {
            return precio > 100 ? "Success" : "Warning";
        }
    };
});