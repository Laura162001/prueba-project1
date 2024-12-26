sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("pilotos.controller.View1", {
        onInit() {
            const oJSONModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONModel.loadData("./model/equipos.json"); //Cargamos el modelo
            oView.setModel(oJSONModel, "escuderia");//Mostramos los datos del modelo

        },

        onItem(oEvent){
            console.log("Has hecho click");

            const oItem = oEvent.getSource();//Obtenemos el contexto del item presionado
            const oBinding = oItem.getBindingContext("escuderia");//Cogemos el enlace del elemento
            const oData = oBinding.getObject(); //Obtener los datos del item

            console.log(oData);

            //Codificamos los parametros antes de pasarlos
            const imagen = encodeURIComponent(oData.imagen);
            const nombre = encodeURIComponent(oData.nombre);

            //Navegamos a la segunda vista y le pasamos el nombre y la imagen del elemento seleccionado
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView2", { //Navegamos a la view2 con el objeto de la imagen y del nombre para luego mostrarlo
                imagen: imagen,
                nombre: nombre
            });
            console.log(oRouter);
        }
    });
});