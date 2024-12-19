sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("apiclima.controller.View1", {
        onInit() {

            const oModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oModel);
        },
        onBuscar(){
            const oView = this.getView();//Llamamos a la vista
            const ciudad = oView.byId("ciudad").getValue(); //Cogemos el valor del campo
            const apiKey = "268ac4959cfa45285d13ef8dbd5a150b"; //Declaramos la api key
            //Montamos la url con la ciudad, api key, la unidad metrica y el idioma
            const url = new URI("https://api.openweathermap.org/data/2.5/weather").setSearch("q", ciudad)
                                                                                .setSearch("appid", apiKey)
                                                                                .setSearch("units", "metric")//Temperatura en ºC
                                                                                .setSearch("lang", "es"); //Obtener la respuesta en español
            //Le hacemos la llamada a la API
            $.ajax({
                url: url,
                method: "GET",

                
                success: function(data){
                    //Actualizamos la vista con los datos que necesitamos que cogemos del JSON  de la API
                    oView.byId("city").setText(": "+ data.name);
                    oView.byId("temperatura").setText(": "+data.main.temp + "ºC");
                    oView.byId("descripcion").setText(": "+data.weather[0].description);
                    oView.byId("humedad").setText(": "+data.main.humidity + "%");
                },

                error:function(){
                    sap.m.MessageToast.show("Error al coger los datos de la API");
                }
            })
        }
    });
});