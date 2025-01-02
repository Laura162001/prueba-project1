sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("tienda.controller.View3", {
        onInit() { 
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this); //Obtenemos en enrutador de la vista

            oRouter.getRoute("RouteView3").attachPatternMatched(this._onRouteMatched, this);

            const sheet = new CSSStyleSheet();
            const sheet2 = new CSSStyleSheet();
            sheet.replaceSync('.total{font-size: 14pt; font-weight: bold; color: #919191}');
            sheet2.replaceSync('.precio{font-size: 12pt; margin-left: 50px}');
            document.adoptedStyleSheets = [sheet, sheet2];

        },
        _onRouteMatched(oEvent){

            //Accedemos al carrito desde el modelo
            const oCarritoModel = this.getOwnerComponent().getModel("carritoModel");
            const productos = oCarritoModel.getProperty("/productos");

            const oView = this.getView();//Llamamos a la vista

            //Miramos si el array tiene elementos
            if(productos && productos.length > 0){
                //Declaramos un nuevo JSON con los productos
                oView.byId("carritoLista").setModel(new sap.ui.model.json.JSONModel({productos: productos}));
                this._calcularCompra(productos); //Calculamos el total de la compra
            }else{
                sap.m.MessageToast.show("El carrito esta vacio");
            }

        },

        _calcularCompra(productos){
            let total = 0;
            //Recorremos el array de productos
            productos.forEach(producto => {
                //Convertimos el precio en numero eliminamos el € y los espacios en blanco
                total += parseFloat(producto.price.replace("€", "").trim());
            });
            this.getView().byId("total").setText("Total: "+total+" €");
        },

        onComprar(){
            const oView = this.getView();
            const total = oView.byId("total").getText();//Cogemos el texto con el id total.

            sap.m.MessageToast.show("Se ha comprado el producto con un total de "+ total);

            const oCarritoModel = this.getOwnerComponent().getModel("carritoModel"); // Accedemos al modelo del carrito
            oCarritoModel.setProperty("/productos", []); // Limpiamos el array de productos en el modelo

            // Actualizamos el modelo en la vista para que esté vacío y me borre los productos de la pantalla
            oView.byId("carritoLista").setModel(new sap.ui.model.json.JSONModel({ productos: [] }));

            // Actualizamos el total en la vista a 0€
            oView.byId("total").setText("Total: 0 €");
        }
    });
});