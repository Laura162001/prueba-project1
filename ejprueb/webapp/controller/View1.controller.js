sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ejprueb.controller.View1", {
        onInit() {
            const oView = this.getView();
            const oModel = new sap.ui.model.json.JSONModel();
            oModel.loadData("./model/datos.json");
            oView.setModel(oModel, "datos");

            const oModel2 = new sap.ui.model.json.JSONModel();
            oModel2.loadData("./model/comunidad.json");
            oView.setModel(oModel2, "comunidad");
        },
        onGo(){
            
            const oView = this.getView();

            //Cogemos los valores que les metemos en el input
            const nombre = oView.byId("txtNombre").getValue();
            const telefono = oView.byId("txtTelf").getValue();
            const comunidad = oView.byId("comboBox");
            const seleccionado = comunidad.getSelectedItem();//Obtenemos el valor seleccionado del comboBox
            let elemento = "";

            if(seleccionado){
                elemento = seleccionado.getText();//Obtenemos el texto del valor seleccionado
                console.log(elemento);
            }else{
                sap.m.MessageToast.show("No puede quedar vacio");
            }

            //Mostramos el mensaje con los datos
            sap.m.MessageToast.show(" Nombre: " + nombre + "\n Telefono: "+ telefono + "\n Comunidad: "+elemento);
        },

        onFiltrar(){
            const comboBox = this.getView().byId("comboBox"); //Cogemos el id del comboBox
            const seleccionado = comboBox.getSelectedItem();//Obtenemos el valor seleccionado del comboBox

            if(seleccionado != ""){
                const comunidad = seleccionado.getText(); //Obtenemos el texto del valor seleccionado
                const tabla = this.getView().byId("tabla"); //Obtenemos el id de la tabla

                //Creamos el filtro
                let oFilter = new Filter ({
                    path: "comunidad", //El campo por el que filtras
                    operator: FilterOperator.Contains, //Operador del filtro
                    value1: comunidad //Valor a filtrar
                });
    
                const oBinding = tabla.getBinding("items"); //Obtenemos el binding de las filas
                oBinding.filter(oFilter); //Aplicar el filtro

            }
        }
    });
});