sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("publicacionuser.controller.View1", {
        onInit() {

            const sheet = new CSSStyleSheet();
            sheet.replaceSync('.box{padding-left: 20px; padding-top: 10px; padding-bottom: 10px}');
            document.adoptedStyleSheets = [sheet];

            const oView = this.getView();
            const url = "https://jsonplaceholder.typicode.com/users";

            $.ajax({
                url: url,
                method: "GET",

                success: function(data){
                    const oModel = new sap.ui.model.json.JSONModel(); //Creamos el JSON
                    oModel.setData(data);//Cogemos los datos directamente del JSON
                    oView.setModel(oModel, "usuarios");//Le ponemos un nombre al modelo para usarlo en XML
                    console.log(oModel.getData());

                },
                error:function(){
                    sap.m.MessageToast.show("Error al cargar la peticion de ajax");
                }
            });

            const url2 = "https://jsonplaceholder.typicode.com/posts";

            $.ajax({
                url: url2,
                method: "GET",

                success: function(data){
                    const oModel = new sap.ui.model.json.JSONModel(); //Creamos el modelo
                    oModel.setData(data);//Cogemos los datos del modelo
                    oView.setModel(oModel, "posts"); //Cogemos el modelo y le ponemos un nombre
                    console.log(oModel.getData());
                },
                error: function(){
                    sap.m.MessageToast.show("Error al cargar la peticion Ajax"); 
                }
            });

            const url3 = "https://jsonplaceholder.typicode.com/albums";

            $.ajax({
                url: url3,
                method: "GET",

                success: function(data){
                    const oModel = new sap.ui.model.json.JSONModel(); //Creamos el modelo
                    oModel.setData(data);//Cogemos los datos del modelo
                    oView.setModel(oModel, "albums"); //Cogemos el modelo y le ponemos un nombre
                    console.log(oModel.getData());
                },
                error: function(){
                    sap.m.MessageToast.show("Error al cargar la peticion Ajax"); 
                }
            });
        }, 

        onClicar: function(oEvent){
            console.log("Click");
            
            const oItem = oEvent.getSource();  // Obtener el ítem de la lista en el que se hizo clic
            console.log("Item", oItem);

            // Obtener el contexto de binding del ítem
            const oBinding = oItem.getBindingContext("usuarios");  // Debemos usar el nombre del modelo 'usuarios'
            console.log(oBinding);

            const oView = this.getView();
            const oModelPosts = oView.getModel("posts");
            const oDataPosts = oModelPosts.getData();

            const oModelAlbum = oView.getModel("albums");
            const oDataAlbum = oModelAlbum.getData();

            if(oBinding && oDataPosts && oDataAlbum){
                
                const oData = oBinding.getObject();//Obtiene el control de objetos que muestra la informacion

                //Buscamos el posts con el mismo id que el usuario
                const userId = oData.id; //Suponemos que userId en posts es el mismo que id de user
                const post = oDataPosts.filter(post => post.userId === userId); //Buscamos todos los posts que tenga ese id de usuario
                const album = oDataAlbum.filter(album => album.userId === userId);//Buscamos todos los album que tengan ese id de usuario
                
                if(post.length > 0 && album.length> 0){

                    //Codificamos los parametros
                    const nombre = encodeURIComponent(oData.name+" "+oData.username);
                    const email = encodeURIComponent(oData.email);
                    const calle = encodeURIComponent(oData.address.street);
                    const ciudad = encodeURIComponent(oData.address.city);
                    const telefono = encodeURIComponent(oData.phone);
                    const userId = encodeURIComponent(oData.id);
                    const postsData = encodeURIComponent(JSON.stringify(post)) //Pasar los datos completos de los posts como string
                    const albumData = encodeURIComponent(JSON.stringify(album)) // Pasar los datos compeltos de los album como string

                    let oRouter = new sap.ui.core.UIComponent.getRouterFor(this);

                    oRouter.navTo("RouteView2", {
                        nombre: nombre,
                        email: email,
                        calle: calle,
                        ciudad: ciudad,
                        telefono: telefono,
                        userId: userId,
                        postsData: postsData,
                        albumData: albumData
                    });
                }else{
                    sap.m.MessageToast.show("No se ha encontrado un post con ese id");
                }

            }else{
                sap.m.MessageToast.show("No se encontro el Binding");
            }
            
        }
    });
});