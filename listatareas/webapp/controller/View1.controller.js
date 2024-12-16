sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("listatareas.controller.View1", {
        onInit() {
            const oJSONModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONModel.loadData("./model/tareas.json", null, false);
            oView.setModel(oJSONModel, "tareas");

            // Verificamos que los datos se hayan cargado correctamente
            console.log("Datos cargados del modelo:", oJSONModel.getData());
        },
        onInsertar(){
            const oModel = this.getView().getModel("tareas");
            const tarea = this.getView().byId("inputTarea");
            const valor = tarea.getValue();

            if(valor !== ""){
                const tareaNueva = oModel.getProperty("/Tareas");
                tareaNueva.push({nombre:valor, status:"Pendiente"});
                oModel.setProperty("/Tareas", tareaNueva);

                tarea.setValue("");
            }else{
                sap.m.MessageToast.show("Los campos no pueden estar vacios");
            }
        },
        onCambiar: function (oEvent){
            sap.m.MessageToast.show("Clic en el botón de la tarea");

            const oListItem = oEvent.getSource();//Obtenemos el item de lista que contiene el boton
            const oBindingContext = oListItem.getBindingContext("tareas"); //Cogemos el enlace del elemento
        
            if (oBindingContext) {
                const oTask = oBindingContext.getObject();
            
                // Cambiar el estado de la tarea
                if (oTask.status === "Completada") {
                    oTask.status = "Pendiente";
                } else {
                    oTask.status = "Completada";
                }
            
                oBindingContext.getModel().refresh(); // Actualizamos el modelo

                // Actualizamos la clase CSS del StandardListItem según el nuevo estado
                this._actualizarColorStatus(oListItem, oTask.status);
            } else {
                sap.m.MessageToast.show("No se pudo obtener el contexto de la tarea.");
            }
        },

        //Funcion para actualizar el color del texto de la descripcion del estado
        _actualizarColorStatus: function(oListItem, status){
            const oDescription = oListItem.getDescription();  // Obtener la descripción actual

            //Limpiamos cualquier clase anterior
            oListItem.removeStyleClass("textGreen");
            oListItem.removeStyleClass("textYellow");

            // Agregamos la clase correspondiente según el estado
            if(status === "Completada"){
                oListItem.addStyleClass("textGreen");
                oListItem.setDescription("Completada");
            }else{
                oListItem.addStyleClass("textYellow");
                oListItem.setDescription("Pendiente");
            }
            
        }
    });
});