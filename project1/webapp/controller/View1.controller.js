sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("project1.project1.controller.View1", {

        onInit() {
// Creamos los modelos, llamamos a la vista y llamamos a los modelos correspondientes.
            const oJSONModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONModel.loadData("./model/SelectionScreenMenu.json");
            oView.setModel(oJSONModel, "selection");

            const oJSONModel2 = new sap.ui.model.json.JSONModel();
            oJSONModel2.loadData("./model/invoice.json");
            oView.setModel(oJSONModel2, "invoice"); 
        },

        onFilter: function(oEvent){
            const oData = this.getView().getModel("selection").getData();
            let filters = [];

//Si el shipname tiene valor crea un filtro que busque el shipname y lo añade en el array vacio
            if(oData.ShipName !== ""){
                filters.push(new Filter("ShipName", FilterOperator.Contains, oData.ShipName));
            }
//Si el CountryKey tiene valor crea un filtro que busque el CountryKey y lo añade en el array vacio
            if(oData.CountryKey !== ""){
                filters.push(new Filter("CountryKey", FilterOperator.Contains, oData.CountryKey));
            }

            const oList = this.getView().byId("headerList");//Cogemos el id de la lista
            const oBinding = oList.getBinding("items");//Cogemos los item de la lista
            oBinding.filter(filters); //Aplica los filtros

        },

        onClearFilter: function(){
            const oModelSelScreen = this.getView().getModel("selection");
            oModelSelScreen.setProperty("/ShipName", "");//Busca el ShipName del modelo y lo pone en blanco el input
            oModelSelScreen.setProperty("/CountryKey", ""); //Busca el CountryKey del modelo y lo pone en blanco la lista de select

            //Esto lo que hace es que cuando limpiamos el filtro te actualice la lista desde el principio
            const oList = this.getView().byId("headerList");
            const oBinding = oList.getBinding("items");
            oBinding.filter([]);
        }
    });
});