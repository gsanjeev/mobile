"use strict";
var core_1 = require("@angular/core");
var auth_service_1 = require("../auth/auth.service");
var CookingVideoComponent = (function () {
    function CookingVideoComponent(auth) {
        this.auth = auth;
    }
    return CookingVideoComponent;
}());
CookingVideoComponent = __decorate([
    core_1.Component({
        selector: "home",
        template: "      \n    <StackLayout> \n        <Label class=\"h4 header\" textWrap=\"true\"\n        text=\"Welcome to the Home Management System.\">\n        </Label> \n        <Button text=\"Login Video\" (click)=\"auth.login()\" *ngIf=\"!auth.authenticated()\"   class=\"link\" >\n        </Button>\n        <Button text=\"Log Out Video\"  (tap)=\"auth.logout()\" *ngIf=\"auth.authenticated()\"  class=\"link\">\n        </Button> \n   </StackLayout>\n"
    }),
    __metadata("design:paramtypes", [auth_service_1.Auth])
], CookingVideoComponent);
exports.CookingVideoComponent = CookingVideoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZGVvcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEwQztBQUMxQyxxREFBNEM7QUFpQjVDLElBQWEscUJBQXFCO0lBSTFCLCtCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUc5QixDQUFDO0lBR1QsNEJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLHFCQUFxQjtJQWRqQyxnQkFBUyxDQUFFO1FBQ1IsUUFBUSxFQUFFLE1BQU07UUFDaEIsUUFBUSxFQUFFLDhiQVViO0tBQ0EsQ0FBQztxQ0FLZ0MsbUJBQUk7R0FKekIscUJBQXFCLENBVWpDO0FBVlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEF1dGggfSBmcm9tIFwiLi4vYXV0aC9hdXRoLnNlcnZpY2VcIjtcblxuXG5AQ29tcG9uZW50KCB7XG4gICAgc2VsZWN0b3I6IFwiaG9tZVwiLFxuICAgIHRlbXBsYXRlOiBgICAgICAgXG4gICAgPFN0YWNrTGF5b3V0PiBcbiAgICAgICAgPExhYmVsIGNsYXNzPVwiaDQgaGVhZGVyXCIgdGV4dFdyYXA9XCJ0cnVlXCJcbiAgICAgICAgdGV4dD1cIldlbGNvbWUgdG8gdGhlIEhvbWUgTWFuYWdlbWVudCBTeXN0ZW0uXCI+XG4gICAgICAgIDwvTGFiZWw+IFxuICAgICAgICA8QnV0dG9uIHRleHQ9XCJMb2dpbiBWaWRlb1wiIChjbGljayk9XCJhdXRoLmxvZ2luKClcIiAqbmdJZj1cIiFhdXRoLmF1dGhlbnRpY2F0ZWQoKVwiICAgY2xhc3M9XCJsaW5rXCIgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiB0ZXh0PVwiTG9nIE91dCBWaWRlb1wiICAodGFwKT1cImF1dGgubG9nb3V0KClcIiAqbmdJZj1cImF1dGguYXV0aGVudGljYXRlZCgpXCIgIGNsYXNzPVwibGlua1wiPlxuICAgICAgICA8L0J1dHRvbj4gXG4gICA8L1N0YWNrTGF5b3V0PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBDb29raW5nVmlkZW9Db21wb25lbnQge1xuXG5cblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGgpIHtcbiAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cblxufVxuXG5cblxuXG5cbiJdfQ==