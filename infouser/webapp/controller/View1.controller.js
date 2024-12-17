sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("infouser.controller.View1", {
        onInit() {
            const oJSONModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONModel.loadData("./model/usuarios.json");
            oView.setModel(oJSONModel, "usuario");
        },
        onGuardar(){
            const oModel = this.getView().getModel("usuario");//Llamamos al modelo
            const oData = oModel.getData();//Obtenemos los datos del modelo

            console.log("Datos del Usuario Guardados: ", oData.usuario); //Mostramos el objeto con los datos cambiados

            sap.m.MessageToast.show("Datos guardados exitosamente.");
        }
    });
});