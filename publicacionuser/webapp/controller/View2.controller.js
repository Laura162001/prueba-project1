sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("publicacionuser.controller.View2", {
        onInit() {
            let oRouter = new sap.ui.core.UIComponent.getRouterFor(this);

            oRouter.getRoute("RouteView2").attachPatternMatched(this._onRouterMatched, this);

            const sheet = new CSSStyleSheet();

            sheet.replaceSync('.box5{padding-left: 40px; padding-bottom: 20px;}');

            document.adoptedStyleSheets = [sheet];

        },
        _onRouterMatched(oEvent){
            let oArgs = oEvent.getParameter("arguments");

            //Decodificamos los parametros recibidos en la URL
            let nombre = decodeURIComponent(oArgs.nombre);
            let email = decodeURIComponent(oArgs.email);
            let calle = decodeURIComponent(oArgs.calle);
            let ciudad = decodeURIComponent(oArgs.ciudad);
            let telefono = decodeURIComponent(oArgs.telefono);
            let userId = decodeURIComponent(oArgs.userId);
            let postData = JSON.parse(decodeURIComponent(oArgs.postsData)); //Convertimos la cadena un un array
            let albumData = JSON.parse(decodeURIComponent(oArgs.albumData)); //Convertimos la cadena un un array
            
            const oView = this.getView();

            oView.byId("nombre").setText(nombre);
            oView.byId("email").setText("Email: " + email);
            oView.byId("calle").setText("Calle: " + calle);
            oView.byId("ciudad").setText("Ciudad: " + ciudad);
            oView.byId("telefono").setText("Telefono: " + telefono);

            //Filtrar los posts por el userId
            const postForUser = postData.filter(posts => posts.userId == userId);

            //Filtrar los albumnes por el userId
            const albumForUser = albumData.filter(album => album.userId == userId);

            //Creamos el modelo para los posts y album
            const oModel = new sap.ui.model.json.JSONModel({
                posts: postForUser,
                album: albumForUser
            });

            oView.setModel(oModel, "viewModel");

            // Asociamos el modelo a las tablas en la vista
            console.log("Posts filtrados:", postForUser);
            console.log("Álbumes filtrados:", albumForUser);
        
        }

    });
});
