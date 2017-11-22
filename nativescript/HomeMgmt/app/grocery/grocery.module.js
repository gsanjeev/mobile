"use strict";
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var grocery_routing_module_1 = require("./grocery-routing.module");
var grocery_list_component_1 = require("./grocery-list.component");
var grocery_item_detail_component_1 = require("./grocery-item-detail.component");
var grocery_service_1 = require("./grocery.service");
var GroceryModule = (function () {
    function GroceryModule() {
    }
    return GroceryModule;
}());
GroceryModule = __decorate([
    core_1.NgModule({
        imports: [
            //CommonModule,
            nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            grocery_routing_module_1.GroceryRoutingModule
        ],
        declarations: [
            grocery_list_component_1.GroceryListComponent,
            grocery_item_detail_component_1.GroceryItemDetailComponent
        ],
        providers: [
            grocery_service_1.GroceryService
        ]
    })
], GroceryModule);
exports.GroceryModule = GroceryModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvY2VyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncm9jZXJ5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQStDO0FBRy9DLGdGQUE4RTtBQUU5RSxvREFBcUU7QUFFckUsbUVBQWdFO0FBRWhFLG1FQUFtRTtBQUNuRSxpRkFBOEU7QUFFOUUscURBQW1EO0FBa0JuRCxJQUFhLGFBQWE7SUFBMUI7SUFBNEIsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUE3QixJQUE2QjtBQUFoQixhQUFhO0lBZnpCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLGVBQWU7WUFDZix3Q0FBa0I7WUFDbEIsK0JBQXVCO1lBQ3ZCLDZDQUFvQjtTQUNyQjtRQUNELFlBQVksRUFBRTtZQUNaLDZDQUFvQjtZQUNwQiwwREFBMEI7U0FDM0I7UUFDRCxTQUFTLEVBQUU7WUFDVCxnQ0FBYztTQUNmO0tBQ0YsQ0FBQztHQUNXLGFBQWEsQ0FBRztBQUFoQixzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSAgIGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5cbmltcG9ydCB7IEdyb2NlcnlSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9ncm9jZXJ5LXJvdXRpbmcubW9kdWxlJztcblxuaW1wb3J0IHsgR3JvY2VyeUxpc3RDb21wb25lbnQgfSAgICBmcm9tICcuL2dyb2NlcnktbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JvY2VyeUl0ZW1EZXRhaWxDb21wb25lbnQgfSAgZnJvbSAnLi9ncm9jZXJ5LWl0ZW0tZGV0YWlsLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEdyb2NlcnlTZXJ2aWNlIH0gZnJvbSAnLi9ncm9jZXJ5LnNlcnZpY2UnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICAvL0NvbW1vbk1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgR3JvY2VyeVJvdXRpbmdNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR3JvY2VyeUxpc3RDb21wb25lbnQsXG4gICAgR3JvY2VyeUl0ZW1EZXRhaWxDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgR3JvY2VyeVNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBHcm9jZXJ5TW9kdWxlIHt9XG4iXX0=