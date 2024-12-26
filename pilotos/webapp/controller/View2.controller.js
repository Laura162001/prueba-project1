sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("pilotos.controller.View2", {
        onInit() {
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            //Capturamos los parametros de la URL que vienen de la view 1
            oRouter.getRoute("RouteView2").attachPatternMatched(this._onRouteMatched, this);

            const oJSONModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONModel.loadData("./model/pilotos.json");
            oView.setModel(oJSONModel, "escuderias");
            console.log(oJSONModel);

           
        },
        _onRouteMatched(oEvent){

            let oArgs = oEvent.getParameter("arguments");

            //Descodificamos los parametros de la url
            let imagen = decodeURIComponent(oArgs.imagen);
            let nombre = decodeURIComponent(oArgs.nombre);
            let oView = this.getView();//Llamamos a la vista


            const oModel = oView.getModel("escuderias");//Cogemos el modelo json
            const aEscuderias = oModel.getProperty("/escuderias");//Obtenemos el array del modelo json
            let oEscuderiaSeleccionada = null; //Variables para almacenar la escuderia encontrada
            console.log(aEscuderias);

            //Reccorremos las escuderias para encontrar al piloto
            for(let i = 0; i < aEscuderias.length; i++){
                if(aEscuderias[i].key === nombre){ //Comparamos el nombre de la escuderia con la que le pasamos de View1
                    oEscuderiaSeleccionada = aEscuderias[i];//Encontramos la escuderia
                    break;
                }
            }

            if(oEscuderiaSeleccionada){//Si se encontro la escuderia mostramos los datos
                oView.byId("imagen").setSrc(imagen);//Cogemos la url de la imagen
                oView.byId("txt").setText(nombre);//Cogemos el valor del nombre

                //Creamos un modelo de la escuderia seleccionada
                const oPilotosModel = new sap.ui.model.json.JSONModel(oEscuderiaSeleccionada.pilotos);
                oView.setModel(oPilotosModel, "pilotos"); //Mostramos los datos de la escuderia seleccionada

            }

            console.log(imagen, nombre);   
        }
    });
});