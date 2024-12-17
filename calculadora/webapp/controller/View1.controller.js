sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("calculadora.controller.View1", {
        onInit() {
            const oJSONModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONModel.loadData("./model/calculadora.json");
            oView.setModel(oJSONModel, "calculadora");

        },
        onNumber(oEvent){
            const boton = oEvent.getSource().getText();//Cogemos el texto del boton seleccionado
            const oModel = this.getView().getModel("calculadora");//Llamamos al modelo
            let numero = oModel.getProperty("/Calculadora/numero");//Cogemos el valor dle numero
           
            //Si el numero es igual a 0, le ponemos al numero el valor del boton
            if(numero === "0"){
                numero = boton;
            }else{
                numero += boton;
            }

            //Agregar el numero presionado
            oModel.setProperty("/Calculadora/numero", numero);

            //Actualizar la pantalla con la entrada actual
            oModel.setProperty("/Calculadora/result", numero);

            //Refrescamos manualmente la pantalla
            this.getView().getModel("calculadora").refresh(true);
            

        },
        //Funcion para coger del modelo los valor de los numeros
        _getInputValues(){
            const oModel = this.getView().getModel("calculadora");
            const numero = oModel.getProperty("/Calculadora/numero");
            const numero2 = oModel.getProperty("/Calculadora/numero2");
            return{numero, numero2};
        },

        //Funcion para mostrar el resultado final de la operacion
        _mostrarResultado(resultado){
            const oModel = this.getView().getModel("calculadora");
            oModel.setProperty("/Calculadora/result", resultado);

            //Refrescamos manualmente la pantalla
            this.getView().getModel("calculadora").refresh(true);
        },

        //Funcion para hacer la suma
        onSumar(){
            const valores = this._getInputValues();
            const numero = parseFloat(valores.numero);//Pasamos el valor a un numero
            const numero2 = parseFloat(valores.numero2);//Pasamos el valor a un numero
            const resultado = numero + numero2;
            this._mostrarResultado(resultado);//Llamamos a la funcion de mostrar el resultado
            MessageToast.show("Suma realizada");
            return resultado;//Devolemos el resultado para mostrarlo
        },
        //Funcion para hacer la resta
        onRestar(){
            const valores = this._getInputValues();
            const numero = parseFloat(valores.numero);
            const numero2 = parseFloat(valores.numero2);
            const resultado = numero - numero2;
            this._mostrarResultado(resultado);
            MessageToast.show("Resta realizada");
            return resultado;
        },
        //Funcion para hacer la multiplicacion
        onMulti(){
            const valores = this._getInputValues();
            const numero = parseFloat(valores.numero);
            const numero2 = parseFloat(valores.numero2);
            const resultado = numero * numero2;
            this._mostrarResultado(resultado);
            MessageToast.show("Multiplicacion realizada");
            return resultado;
        },
        //Funcion para hacer la division
        onDividir(){
            const valores = this._getInputValues();
            const numero = parseFloat(valores.numero);
            const numero2 = parseFloat(valores.numero2);
            if(numero2 === 0){//Si el numero se divide entre 0 muestra un mensaje
                MessageToast.show("No se puede dividir entre 0");
                return;//Finaliza la ejecucion del programa
            }
            const resultado = numero / numero2;
            this._mostrarResultado(resultado);
            MessageToast.show("Division realizada");
            return resultado;
        },
        //Funcion para borrar los datos de la pantalla
        onBorrar(){
            const oModel = this.getView().getModel("calculadora");
            oModel.setProperty("/Calculadora/numero", "0");
            oModel.setProperty("/Calculadora/numero2", "0");
            oModel.setProperty("/Calculadora/operador", "");
            oModel.setProperty("/Calculadora/result", "0");

            this.getView().getModel("calculadora").refresh(true);
            
            MessageToast.show("Operacion borrada");
        },

        onOperador(oEvent){
            const boton = oEvent.getSource().getText();//Cogemos el texto del boton
            const oModel = this.getView().getModel("calculadora");//Llamamos al modulo
            const operador = oModel.getProperty("/Calculadora/operador");//Cogemos del modulo el valor de operador
            let numero = oModel.getProperty("/Calculadora/numero");//Cogemos del modulo el valor de numero
            let resultado;

            console.log("El operador es: ", operador);
            console.log("El numero es: ", numero);

            if(boton === "+" || boton === "-" || boton === "X" || boton === "/" || boton == "C"){
                if(boton === "C"){//Si el boton es la C llamamos al metodo de borrar
                    this.onBorrar();
                    return;//Finaliza la ejecucion del programa
                }
                //Guardar la operacion y el valor actual
                oModel.setProperty("/Calculadora/numero2", numero);//Guardamos en el modelo el numero seleccionado
                oModel.setProperty("/Calculadora/operador", boton);//Guardamos en el modelo el operador seleccionado
                oModel.setProperty("/Calculadora/numero", ""); //Vaciamos el numero 1 para coger otro y que no lo concatene
            }else{
                //Segun el operador que seleccionemos llama a una funcion o a otra para hacer las operaciones
                switch(operador){
                    case "+":
                        resultado = this.onSumar();
                        break;
                    case "-":
                        resultado = this.onRestar();
                        break;
                    case "X":
                        resultado = this.onMulti();
                        break;
                    case "/":
                        resultado = this.onDividir();
                        break;
                    default:
                        resultado = numero;
                        break;
                }

                oModel.setProperty("/Calculadora/operador", "");// Limpiamos el operador

                // Refrescar el modelo para asegurar que se actualice la vista
                this.getView().getModel("calculadora").refresh(true);
            }
        }

    });
});