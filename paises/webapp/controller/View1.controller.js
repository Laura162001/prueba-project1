sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("paises.controller.View1", {
        onInit() {
            const oModel = new sap.ui.model.json.JSONModel();
            this.getView().getModel(oModel);
        },

        onBuscar(){
            const oView = this.getView();//Llamamos a la vista
            const pais = oView.byId("ciudad").getValue(); //Cogemos el valor del campo
            const url = new URI("https://restcountries.com/v3.1/name/" + pais); //Ponemos la URL de la API

            $.ajax({
                url: url,
                method: "GET",

                success:function(data){

                    //Mostramos los datos que necesitemos de JSON de la API
                    oView.byId("pais").setText(data[0].name.common);
                    oView.byId("oficial").setText(data[0].name.official);
                    oView.byId("capital").setText(data[0].capital);
                    oView.byId("region").setText(data[0].region);

                    //Miramos si el pais tiene moendas definidas
                    if(data[0].currencies && Object.keys(data[0].currencies.length > 0)){
                        //Si hay monedas disponibles acceder a la primera moneda
                        const moneda = Object.values(data[0].currencies)[0].name;
                        const simbolo = Object.values(data[0].currencies)[0].symbol;

                        oView.byId("moneda").setText(moneda);
                        oView.byId("simbolo").setText(simbolo);
                    }else{
                        // Si no tiene moneda definida
                        oView.byId("moneda").setText("Moneda no disponible");
                        oView.byId("simbolo").setText("");
                    }
                    
                    oView.byId("idioma").setText(Object.values(data[0].languages).join(", ")); //En el JSON es un Objeto
                    oView.byId("bandera").setSrc(data[0].flags.png);

                },
                
                error:function(){
                    sap.m.MessageToast.show("Error al coger los datos de la API");
                }
            })
        }
    });
});