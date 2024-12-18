sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("listatabla.controller.View1", {
        onInit() {
            const oJSONModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONModel.loadData("./model/datos.json");
            oView.setModel(oJSONModel, "datos");
        },

        onAgregar(){
            const oModel = this.getView().getModel("datos");//Llamamos la modelo

            //Llamaos al id de cada input y le cogemos le valor insertado
            const nombre = this.getView().byId("name2");
            const valornombre = nombre.getValue();

            const apell1 = this.getView().byId("apell");
            const valorapell = apell1.getValue();

            const apell2 = this.getView().byId("apell2");
            const valorapell2 = apell2.getValue();

            const edad = this.getView().byId("edad2");
            const valoredad = edad.getValue();

            const hombre = this.getView().byId("rb1");
            const mujer = this.getView().byId("rb2");
            let sexo;

            //Comprobamos cual de los 2 radio button se ha seleccionado
            if(hombre.getSelected()){
                sexo = hombre.getText();//Cogemos el texto
            }else{
                sexo = mujer.getText();//Cogemos el texto
            }

            const email = this.getView().byId("mail");
            const valoremail = email.getValue();

            //Si todos los input estan rellenados y algun radio button esta a true añadimos los datos al modelo
            if(valornombre !== "" && valorapell !=="" && valorapell2 !=="" && valoredad !=="" && 
                sexo !== false && valoremail !==""){

                    const datoNuevo = oModel.getProperty("/Datos");
                    datoNuevo.push({nombre: valornombre, apellido1: valorapell, apellido2: valorapell2,
                                edad: valoredad, sexo: sexo, email: valoremail});
                    oModel.setProperty("/Datos", datoNuevo); 
                    //Limpiamos los input
                    nombre.setValue("");
                    apell1.setValue("");
                    apell2.setValue("");
                    edad.setValue("");
                    email.setValue("");
                }else{
                    sap.m.MessageToast.show("Tienen que estar todos los campos rellenos");
                }
        }
    });
});