sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("registraruser.controller.View1", {
        onInit() {
            const oJSONModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONModel.loadData("./model/datos.json");
            oView.setModel(oJSONModel, "datos");
        },

        onRegistrar(){
            const oModel = this.getView().getModel("datos");

            const correo = /^[A-Za-z0-9]+@[A-Za-z]+\.(com|es)$/;
            const contrasenia = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;
            /*La expresion regular de la contraseña:
            significa que el primer () mira que haya al menos 1 letra
            el segundo () mira que tenga al menos 1 numero, el tercer
            () mira al menos que tenga 1 caracters especial
            despues de los () mira que la contraseña pueda contener letras, numero y caracter especial
            {8,} esto al final quiere decir que tenga como minio 8 caracteres*/

            const nombre = this.getView().byId("nombre");
            const valorNombre = nombre.getValue();

            const apellido = this.getView().byId("apellido");
            const valorApell = apellido.getValue();

            const email =  this.getView().byId("email");
            const valorEmail = email.getValue();

            const password = this.getView().byId("contra");
            const valorPassw = password.getValue();

            //Comprobamos que esten los campos rellenos y validamos la expresion regular
            if(valorNombre !=="" && valorApell !=="" && valorEmail !=="" && valorPassw !=""){
                if(!correo.test(valorEmail)){
                    sap.m.MessageToast.show("Tienes que insertar un '@' y el final solo puede ser '.com' o '.es'");
                }else if(!contrasenia.test(valorPassw)){
                    sap.m.MessageToast.show("La contraseña tiene que tener minimo 8 caracteres, una letra mayuscula, numero y caracteres especiales como @ # . *");
                }else{
                    const datosNuevos = oModel.getProperty("/Info");
                    //Añadimos los datos nuevos en cada campo del modelo
                    datosNuevos.push({nombre: valorNombre, apellido: valorApell, email: valorEmail, contra: valorPassw});

                    oModel.setProperty("/Info", datosNuevos);//Sacamos los nuevos datos

                    //Limpiamos las variables
                    nombre.setValue("");
                    apellido.setValue("");
                    email.setValue("");
                    password.setValue("");

                    //Sacamos el ultimo usuario del modelo JSON, es decir el que acabamos de añadir
                    const ultimoUsuario = datosNuevos[datosNuevos.length - 1];
                    const objeto = JSON.stringify(ultimoUsuario);//Convertimos el objeto en una cadena de string
                    sap.m.MessageToast.show("El usuario se registro con exito: " + objeto);
                }

            }else{
                sap.m.MessageToast.show("Tienen que estar todos los campos rellenos");
            }

        },

        onBorrar(){

            //Llamamos a los ID para coger el valor de cada input
            const nombre = this.getView().byId("nombre");
            const valorNombre = nombre.getValue();

            const apell = this.getView().byId("apellido");
            const valorApell = apell.getValue();

            const email = this.getView().byId("email");
            const valorEmail = email.getValue();

            const contra = this.getView().byId("contra");
            const valorPassw = contra.getValue();

            //Si alguno de los campos esta rellenado lo borramos
            if(valorNombre !== "" || valorApell !=="" || valorEmail !=="" || valorPassw !==""){

                //Vaciamos los campos
                nombre.setValue("");
                apell.setValue("");
                email.setValue("");
                contra.setValue("");
            }
        }

    });
});