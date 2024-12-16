sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("listacompra.controller.View1", {
        onInit() {
            const oJSONModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONModel.loadData("./model/productos.json");
            oView.setModel(oJSONModel, "producto");
        },
        onInsertar(){
            const oModel = this.getView().getModel("producto");
            //Cogemos el id del input
            const producto = this.getView().byId("item");
            const itemCantidad = this.getView().byId("itemCantidad");
            const valor = producto.getValue(); //Guardamos el valor que le metemos en el input
            const cantidad = itemCantidad.getValue();

            if(valor !== "" && cantidad !==""){
                //Obtenemos la lista de productos del json
                const productoNuevo = oModel.getProperty("/Producto");
                productoNuevo.push({nombre:valor, cantidad: cantidad}); //Añadimos el producto nuevo en la lista de json
                oModel.setProperty("/Producto", productoNuevo); //Actualizamos el modelo con el producto
                producto.setValue("");//Limpiamos el campor del input
                itemCantidad.setValue("");//Limpiamos el campor del input

            }else{ //Si el input esta vacio mostramos un mensaje
                console.log("El campo de entrada esta vacio");
            }

           
        }
    });
});