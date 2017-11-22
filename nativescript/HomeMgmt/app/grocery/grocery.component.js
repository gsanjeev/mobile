"use strict";
var core_1 = require("@angular/core");
var auth_service_1 = require("../auth/auth.service");
var GroceryComponent = (function () {
    function GroceryComponent(auth) {
        this.auth = auth;
    }
    return GroceryComponent;
}());
GroceryComponent = __decorate([
    core_1.Component({
        selector: "home",
        template: "      \n    <StackLayout> \n        <Label class=\"h4 header\" textWrap=\"true\"\n        text=\"Welcome to the Home Management System.\">\n        </Label> \n       <Label class=\"h4 header\" textWrap=\"true\"\n        text=\"Authenticated Flag: {auth.authenticated()}\">\n        </Label> \n        <Button text=\"Login Grocery\" (click)=\"auth.login()\" *ngIf=\"!auth.authenticated()\" >\n        </Button>\n        <Button text=\"Log Out Grocery\"  (tap)=\"auth.logout()\" *ngIf=\"auth.authenticated()\"  class=\"link\">\n        </Button>  \n   </StackLayout>\n"
    }),
    __metadata("design:paramtypes", [auth_service_1.Auth])
], GroceryComponent);
exports.GroceryComponent = GroceryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvY2VyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncm9jZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTBDO0FBQzFDLHFEQUE0QztBQW1CNUMsSUFBYSxnQkFBZ0I7SUFFckIsMEJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQzlCLENBQUM7SUFFVCx1QkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksZ0JBQWdCO0lBakI1QixnQkFBUyxDQUFFO1FBQ1IsUUFBUSxFQUFFLE1BQU07UUFDaEIsUUFBUSxFQUFFLHdqQkFhYjtLQUNBLENBQUM7cUNBR2dDLG1CQUFJO0dBRnpCLGdCQUFnQixDQUs1QjtBQUxZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBdXRoIH0gZnJvbSBcIi4uL2F1dGgvYXV0aC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoIHtcbiAgICBzZWxlY3RvcjogXCJob21lXCIsXG4gICAgdGVtcGxhdGU6IGAgICAgICBcbiAgICA8U3RhY2tMYXlvdXQ+IFxuICAgICAgICA8TGFiZWwgY2xhc3M9XCJoNCBoZWFkZXJcIiB0ZXh0V3JhcD1cInRydWVcIlxuICAgICAgICB0ZXh0PVwiV2VsY29tZSB0byB0aGUgSG9tZSBNYW5hZ2VtZW50IFN5c3RlbS5cIj5cbiAgICAgICAgPC9MYWJlbD4gXG4gICAgICAgPExhYmVsIGNsYXNzPVwiaDQgaGVhZGVyXCIgdGV4dFdyYXA9XCJ0cnVlXCJcbiAgICAgICAgdGV4dD1cIkF1dGhlbnRpY2F0ZWQgRmxhZzoge2F1dGguYXV0aGVudGljYXRlZCgpfVwiPlxuICAgICAgICA8L0xhYmVsPiBcbiAgICAgICAgPEJ1dHRvbiB0ZXh0PVwiTG9naW4gR3JvY2VyeVwiIChjbGljayk9XCJhdXRoLmxvZ2luKClcIiAqbmdJZj1cIiFhdXRoLmF1dGhlbnRpY2F0ZWQoKVwiID5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gdGV4dD1cIkxvZyBPdXQgR3JvY2VyeVwiICAodGFwKT1cImF1dGgubG9nb3V0KClcIiAqbmdJZj1cImF1dGguYXV0aGVudGljYXRlZCgpXCIgIGNsYXNzPVwibGlua1wiPlxuICAgICAgICA8L0J1dHRvbj4gIFxuICAgPC9TdGFja0xheW91dD5cbmBcbn0pXG5leHBvcnQgY2xhc3MgR3JvY2VyeUNvbXBvbmVudCB7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoKSB7ICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG59XG5cblxuXG5cblxuIl19