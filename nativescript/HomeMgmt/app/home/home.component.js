"use strict";
var core_1 = require("@angular/core");
var auth_service_1 = require("../auth/auth.service");
var page_1 = require("ui/page");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var HomeComponent = (function () {
    function HomeComponent(auth, page, routerExtensions) {
        this.auth = auth;
        this.page = page;
        this.routerExtensions = routerExtensions;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_login";
    };
    HomeComponent.prototype.onNavBtnTap = function () {
        //alert("Go Back");
        this.routerExtensions.back();
        //this.routerExtensions.backToPreviousPage(); \
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./home.component.html"
    }),
    __metadata("design:paramtypes", [auth_service_1.Auth, page_1.Page, router_extensions_1.RouterExtensions])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWtEO0FBQ2xELHFEQUE0QztBQUM1QyxnQ0FBK0I7QUFDL0IsbUZBQWlGO0FBTWpGLElBQWEsYUFBYTtJQU90Qix1QkFBcUIsSUFBVSxFQUFVLElBQVUsRUFBVSxnQkFBa0M7UUFBMUUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBRS9GLENBQUM7SUFQRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDO0lBQ2pELENBQUM7SUFNRCxtQ0FBVyxHQUFYO1FBQ0ksbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QiwrQ0FBK0M7SUFDbkQsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQztBQWpCWSxhQUFhO0lBSnpCLGdCQUFTLENBQUU7UUFDUixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtLQUN2QyxDQUFDO3FDQVE2QixtQkFBSSxFQUFnQixXQUFJLEVBQTRCLG9DQUFnQjtHQVB0RixhQUFhLENBaUJ6QjtBQWpCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEF1dGggfSBmcm9tIFwiLi4vYXV0aC9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9ucyc7XG5cbkBDb21wb25lbnQoIHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQge1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZ2UuYmFja2dyb3VuZEltYWdlID0gXCJyZXM6Ly9iZ19sb2dpblwiO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIGF1dGg6IEF1dGgsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zICkge1xuXG4gICAgfVxuXG4gICAgb25OYXZCdG5UYXAoKSB7XG4gICAgICAgIC8vYWxlcnQoXCJHbyBCYWNrXCIpO1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgICAgICAvL3RoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTsgXFxcbiAgICB9XG5cbn1cblxuXG5cblxuXG4iXX0=