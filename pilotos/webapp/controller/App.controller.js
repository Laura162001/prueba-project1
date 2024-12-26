sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent"
], (BaseController, UIComponent) => {
  "use strict";

  return BaseController.extend("pilotos.controller.App", {
      onInit() {
        // Obtener el enrutador y navegar a la vista inicial (View1)
        var oRouter = UIComponent.getRouterFor(this);
        oRouter.initialize();
        oRouter.navTo("RouteView1");  // Navegar a View1 al cargar
      }
  });
});