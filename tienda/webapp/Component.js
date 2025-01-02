sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], (UIComponent, JSONModel, Device) => {
    "use strict";

    return UIComponent.extend("tienda.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            //Creamos el model para el carrito
            const oCarritoModel = new JSONModel({
                productos: [] //Array vacio inicialmente
            })

            // Establecemos el modelo global para el carrito
            this.setModel(oCarritoModel, "carritoModel");

            // enable routing
            this.getRouter().initialize();
        }
    });
});