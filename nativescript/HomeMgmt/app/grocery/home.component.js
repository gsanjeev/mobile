"use strict";
var core_1 = require("@angular/core");
var auth_service_1 = require("../services/auth.service");
var GroceryComponent = (function () {
    function GroceryComponent(auth) {
        this.auth = auth;
    }
    return GroceryComponent;
}());
GroceryComponent = __decorate([
    core_1.Component({
        selector: "home",
        template: "      \n    <StackLayout> \n        <Label class=\"h4 header\" textWrap=\"true\"\n        text=\"Welcome to the Home Management System.\">\n        </Label> \n        <Button text=\"Login Grocery\" (click)=\"auth.login()\" *ngIf=\"!auth.authenticated()\" class=\"link\" pageTransition=\"flip\">\n        </Button>\n   </StackLayout>\n"
    }),
    __metadata("design:paramtypes", [auth_service_1.Auth])
], GroceryComponent);
exports.GroceryComponent = GroceryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTBDO0FBQzFDLHlEQUFnRDtBQWVoRCxJQUFhLGdCQUFnQjtJQUlyQiwwQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFHOUIsQ0FBQztJQUdULHVCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSxnQkFBZ0I7SUFaNUIsZ0JBQVMsQ0FBRTtRQUNSLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFFBQVEsRUFBRSxnVkFRYjtLQUNBLENBQUM7cUNBS2dDLG1CQUFJO0dBSnpCLGdCQUFnQixDQVU1QjtBQVZZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBdXRoIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xuXG5cbkBDb21wb25lbnQoIHtcbiAgICBzZWxlY3RvcjogXCJob21lXCIsXG4gICAgdGVtcGxhdGU6IGAgICAgICBcbiAgICA8U3RhY2tMYXlvdXQ+IFxuICAgICAgICA8TGFiZWwgY2xhc3M9XCJoNCBoZWFkZXJcIiB0ZXh0V3JhcD1cInRydWVcIlxuICAgICAgICB0ZXh0PVwiV2VsY29tZSB0byB0aGUgSG9tZSBNYW5hZ2VtZW50IFN5c3RlbS5cIj5cbiAgICAgICAgPC9MYWJlbD4gXG4gICAgICAgIDxCdXR0b24gdGV4dD1cIkxvZ2luIEdyb2NlcnlcIiAoY2xpY2spPVwiYXV0aC5sb2dpbigpXCIgKm5nSWY9XCIhYXV0aC5hdXRoZW50aWNhdGVkKClcIiBjbGFzcz1cImxpbmtcIiBwYWdlVHJhbnNpdGlvbj1cImZsaXBcIj5cbiAgICAgICAgPC9CdXR0b24+XG4gICA8L1N0YWNrTGF5b3V0PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBHcm9jZXJ5Q29tcG9uZW50IHtcblxuXG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoKSB7XG4gICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG5cbn1cblxuXG5cblxuXG4iXX0=