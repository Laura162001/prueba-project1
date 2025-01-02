sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("tienda.controller.View2", {
        onInit() {
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);//Obtenemos el enrutador de esta vista

            oRouter.getRoute("RouteView2").attachPatternMatched(this._onRouteMatched, this);

            // Inicializamos el modelo para el carrito
            let oCarritoModel = this.getOwnerComponent().getModel("carritoModel");
            if(!oCarritoModel){
                oCarritoModel = new JSONModel({
                    productos: []
                });
                this.getOwnerComponent().setModel(oCarritoModel, "carritoModel"); //Le ponemos un nombre al modelo para poder usarlo en el XML
            }
            
        },
        _onRouteMatched(oEvent){
            let oArgs = oEvent.getParameter("arguments");

            //Descodificamos los parametros de la url
            let imagen = decodeURIComponent(oArgs.image);
            let titulo = decodeURIComponent(oArgs.title);
            let precio = decodeURIComponent(oArgs.price);
            let descripcion = decodeURIComponent(oArgs.description);
            let categoria = decodeURIComponent(oArgs.category);

            const oView = this.getView(); //Llamamos a la vista
            //Completamos los elementos del XML con los que nos llega por parametro en la URL
            oView.byId("imagen").setSrc(imagen);
            oView.byId("title").setText(titulo);
            oView.byId("precio2").setText(precio + "€");
            oView.byId("descripcion").setText(descripcion);
            oView.byId("categoria").setText(categoria);

        },
        onComprar(){
            const oView = this.getView();
            const precio = oView.byId("precio2").getText();
            const nombre = oView.byId("title").getText();
            const imagen = oView.byId("imagen").getSrc();

            const oCarritoModel = this.getView().getModel("carritoModel"); //Obtenemos el modelo
            const productos = oCarritoModel.getProperty("/productos");//Obtenemos el array de productos

            //Rellenamos el array con los datos correspondientes
            const producto = {
                image: imagen,
                title: nombre,
                price: precio
            }

            productos.push(producto); //Añadimos el array con los datos a nuestro JSON
            oCarritoModel.setProperty("/productos", productos);//Obtenemos el valor del array

            console.log(precio);
            sap.m.MessageToast.show("Se ha añadido el producto al carrito");
            console.log(producto);
        },
        onCarrito(oEvent) {
            const oView = this.getView();
            const imagen = oView.byId("imagen").getSrc();
            const nombre = oView.byId("title").getText();
            const precio = oView.byId("precio2").getText();
            
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);//Obtenemos el enrutador de la vista
            oRouter.navTo("RouteView3", { //Navegamos hasta la View3 con los parametros codificados.
                image: encodeURIComponent(imagen),
                title: encodeURIComponent(nombre),
                price: encodeURIComponent(precio)
            });
        }
    });
});