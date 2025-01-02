sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("tienda.controller.View1", {
        onInit() {
        
            const oView = this.getView();//Llamamos a la vista
            const url = "https://fakestoreapi.com/products";//Ponemos la URL de la APIRest
            
            //Hacemos la peticion AJAX
            $.ajax({
                url: url,
                method: "GET",
               
                success:function(data){
                    const oModel = new sap.ui.model.json.JSONModel();//Cogemos el modelo JSON
                    oModel.setData({products: data});//Sacamos los datos del modelo
                    oView.setModel(oModel, "productsModel");//Declaramos un numero a los datos del JSON
                    console.log(oModel.getData()); 
                    
                },
                error:function(){ //Si la peticion AJAX falla sacamos un mensaje
                    sap.m.MessageToast.show("Error al generar el ajax");
                }
            });

            //Accedemos al model global del carrito
            const oCarritoModel = this.getOwnerComponent().getModel("carritoModel");
            if(oCarritoModel){
                //Accedemos al carrito y mostramos los productos si es necesario
                const productos = oCarritoModel.getProperty("/productos");
                console.log("Productos en el carrito al regresar a Vista 1: ", productos);
            }
        },

        //Al darle a la imagen de la lista llamamos a esta funcion
        onNavegar(oEvent){
            const oItem = oEvent.getSource();//Obtiene en que elemento se hizo click
            const oBinding = oItem.getBindingContext("productsModel");//Obtiene el contexto de los datos
            const oData = oBinding.getObject();//Obtiene el control de objetos que muestra la informacion
            
            //Codificamos los parametros antes de pasarlos
            const imagen = encodeURIComponent(oData.image);
            const titulo = encodeURIComponent(oData.title);
            const precio = encodeURIComponent(oData.price);
            const descripcion = encodeURIComponent(oData.description);
            const categoria = encodeURIComponent(oData.category);

            let oRouter = sap.ui.core.UIComponent.getRouterFor(this); //Obtenemos el enrutador de esta vista

            oRouter.navTo("RouteView2", { //Navega a la view2 con los parametros que le pasamos
                image: imagen,
                title: titulo,
                price: precio,
                description: descripcion,
                category: categoria

            });

        },
    });
});