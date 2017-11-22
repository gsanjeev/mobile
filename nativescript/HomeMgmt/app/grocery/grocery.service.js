"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
//import{AuthHttp} from 'angular2-jwt';
require("rxjs/add/operator/map");
var appSettings = require("application-settings");
var nativescript_auth0_1 = require("nativescript-auth0");
var api_config_1 = require("../api.config");
var GroceryService = (function () {
    function GroceryService(http) {
        this.http = http;
        console.log('Grocery Service Initialized...');
    }
    GroceryService.prototype.getUser = function () {
        var email = 'ysanjeev@yahoo.com';
        console.log("userInfo" + "***t1***" + appSettings.getString("userInfo"));
        if (appSettings.getString("userInfo") != null) {
            var userInfo = JSON.parse(appSettings.getString("userInfo"));
            email = userInfo.email;
        }
        return email;
        //let tokens = JSON.parse(appSettings.getString(Auth0Lock._tokenKey));      
    };
    GroceryService.prototype.getAuthToken = function () {
        console.log(nativescript_auth0_1.Auth0Lock._tokenKey + "***t3***" + appSettings.getString(nativescript_auth0_1.Auth0Lock._tokenKey));
        var tokens = JSON.parse(appSettings.getString(nativescript_auth0_1.Auth0Lock._tokenKey));
        //console.log(Auth0Lock._tokenKey+"****t4**"+tokens );
        return tokens.idToken;
    };
    GroceryService.prototype.getGroceryItems = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Bearer " + this.getAuthToken());
        return this.http.get(api_config_1.apiConfig.apiURL + '/api/grocery/item', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    GroceryService.prototype.getGroceryList = function () {
        //var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
        //console.log('GroceryService.userProfile');
        //console.log(userProfile);
        //console.log(userProfile.email);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Bearer " + this.getAuthToken());
        headers.append('user', this.getUser());
        return this.http.get(api_config_1.apiConfig.apiURL + '/api/grocery', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    GroceryService.prototype.getGroceryListItem = function (id) {
        console.log('id');
        console.log(id);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Bearer " + this.getAuthToken());
        return this.http.get(api_config_1.apiConfig.apiURL + '/api/grocery/' + id, { headers: headers })
            .map(function (res) { return res.json()[0]; });
    };
    GroceryService.prototype.addGroceryListItem = function (newGroceryListItem) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Bearer " + this.getAuthToken());
        return this.http.post(api_config_1.apiConfig.apiURL + '/api/grocery', JSON.stringify(newGroceryListItem), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    GroceryService.prototype.deleteGroceryListItem = function (id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Bearer " + this.getAuthToken());
        return this.http.delete(api_config_1.apiConfig.apiURL + '/api/grocery/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    GroceryService.prototype.updateGroceryListItem = function (groceryListItem) {
        console.log("GroceryService.updateGroceryListItem()");
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Bearer " + this.getAuthToken());
        return this.http.put(api_config_1.apiConfig.apiURL + '/api/grocery/' + groceryListItem._id, JSON.stringify(groceryListItem), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return GroceryService;
}());
GroceryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], GroceryService);
exports.GroceryService = GroceryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvY2VyeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ3JvY2VyeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUM7QUFDekMsc0NBQTJDO0FBQzNDLHVDQUF1QztBQUN2QyxpQ0FBK0I7QUFDL0Isa0RBQW9EO0FBQ3BELHlEQUErQztBQUUvQyw0Q0FBMEM7QUFJMUMsSUFBYSxjQUFjO0lBRXZCLHdCQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGdDQUFPLEdBQVA7UUFDSSxJQUFJLEtBQUssR0FBVSxvQkFBb0IsQ0FBQztRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxVQUFVLEdBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBRSxVQUFVLENBQUUsQ0FBRSxDQUFDO1FBQ3hFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUUsVUFBVSxDQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUUsVUFBVSxDQUFFLENBQUUsQ0FBQztZQUNqRSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUMzQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNiLDRFQUE0RTtJQUNoRixDQUFDO0lBRU8scUNBQVksR0FBcEI7UUFFSSxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUFTLENBQUMsU0FBUyxHQUFDLFVBQVUsR0FBQyxXQUFXLENBQUMsU0FBUyxDQUFFLDhCQUFTLENBQUMsU0FBUyxDQUFFLENBQUUsQ0FBQztRQUMxRixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUUsOEJBQVMsQ0FBQyxT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N0gsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUFsRkQsSUFrRkM7QUFsRlksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQUdnQixXQUFJO0dBRnBCLGNBQWMsQ0FrRjFCO0FBbEZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0e0h0dHAsIEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG4vL2ltcG9ydHtBdXRoSHR0cH0gZnJvbSAnYW5ndWxhcjItand0JztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQXV0aDBMb2NrIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hdXRoMFwiO1xyXG5cclxuaW1wb3J0IHsgYXBpQ29uZmlnIH0gZnJvbSAnLi4vYXBpLmNvbmZpZyc7XHJcbmltcG9ydCB7R3JvY2VyeUl0ZW19IGZyb20gJy4vZ3JvY2VyeS1pdGVtJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdyb2NlcnlTZXJ2aWNlIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHApIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnR3JvY2VyeSBTZXJ2aWNlIEluaXRpYWxpemVkLi4uJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldFVzZXIoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZW1haWw6c3RyaW5nID0gJ3lzYW5qZWV2QHlhaG9vLmNvbSc7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1c2VySW5mb1wiK1wiKioqdDEqKipcIithcHBTZXR0aW5ncy5nZXRTdHJpbmcoIFwidXNlckluZm9cIiApICk7XHJcbiAgICAgICAgaWYgKGFwcFNldHRpbmdzLmdldFN0cmluZyggXCJ1c2VySW5mb1wiICkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgdXNlckluZm8gPSBKU09OLnBhcnNlKCBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoIFwidXNlckluZm9cIiApICk7XHJcbiAgICAgICAgICAgIGVtYWlsID0gdXNlckluZm8uZW1haWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbWFpbDtcclxuICAgICAgICAvL2xldCB0b2tlbnMgPSBKU09OLnBhcnNlKGFwcFNldHRpbmdzLmdldFN0cmluZyhBdXRoMExvY2suX3Rva2VuS2V5KSk7ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBdXRoVG9rZW4oKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coQXV0aDBMb2NrLl90b2tlbktleStcIioqKnQzKioqXCIrYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKCBBdXRoMExvY2suX3Rva2VuS2V5ICkgKTtcclxuICAgICAgICBsZXQgdG9rZW5zID0gSlNPTi5wYXJzZSggYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKCBBdXRoMExvY2suX3Rva2VuS2V5ICkgKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKEF1dGgwTG9jay5fdG9rZW5LZXkrXCIqKioqdDQqKlwiK3Rva2VucyApO1xyXG4gICAgICAgIHJldHVybiB0b2tlbnMuaWRUb2tlblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRHcm9jZXJ5SXRlbXMoKSB7XHJcbiAgICAgICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCAnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nICk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoIFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRoaXMuZ2V0QXV0aFRva2VuKCkgKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChhcGlDb25maWcuYXBpVVJMICsgJy9hcGkvZ3JvY2VyeS9pdGVtJywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+cmVzLmpzb24oKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldEdyb2NlcnlMaXN0KCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdmFyIHVzZXJQcm9maWxlID0gSlNPTi5wYXJzZSggbG9jYWxTdG9yYWdlLmdldEl0ZW0oICdwcm9maWxlJyApICk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnR3JvY2VyeVNlcnZpY2UudXNlclByb2ZpbGUnKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHVzZXJQcm9maWxlKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHVzZXJQcm9maWxlLmVtYWlsKTtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoIFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRoaXMuZ2V0QXV0aFRva2VuKCkgKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCgndXNlcicsIHRoaXMuZ2V0VXNlcigpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChhcGlDb25maWcuYXBpVVJMICsgJy9hcGkvZ3JvY2VyeScsIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT5yZXMuanNvbigpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0R3JvY2VyeUxpc3RJdGVtKGlkOnN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpZCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlkKTtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoICdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicgKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCggXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdGhpcy5nZXRBdXRoVG9rZW4oKSApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGFwaUNvbmZpZy5hcGlVUkwgKyAnL2FwaS9ncm9jZXJ5LycraWQsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PnJlcy5qc29uKClbMF0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhZGRHcm9jZXJ5TGlzdEl0ZW0obmV3R3JvY2VyeUxpc3RJdGVtOkdyb2NlcnlJdGVtKSB7XHJcbiAgICAgICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCBcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0aGlzLmdldEF1dGhUb2tlbigpICk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGFwaUNvbmZpZy5hcGlVUkwgKyAnL2FwaS9ncm9jZXJ5JywgSlNPTi5zdHJpbmdpZnkobmV3R3JvY2VyeUxpc3RJdGVtKSwge2hlYWRlcnM6IGhlYWRlcnN9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZGVsZXRlR3JvY2VyeUxpc3RJdGVtIChpZDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCggJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyApO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCBcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0aGlzLmdldEF1dGhUb2tlbigpICk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYXBpQ29uZmlnLmFwaVVSTCArICcvYXBpL2dyb2NlcnkvJytpZCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVHcm9jZXJ5TGlzdEl0ZW0oZ3JvY2VyeUxpc3RJdGVtOkdyb2NlcnlJdGVtKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHcm9jZXJ5U2VydmljZS51cGRhdGVHcm9jZXJ5TGlzdEl0ZW0oKVwiKTtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoIFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRoaXMuZ2V0QXV0aFRva2VuKCkgKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChhcGlDb25maWcuYXBpVVJMICsgJy9hcGkvZ3JvY2VyeS8nICtncm9jZXJ5TGlzdEl0ZW0uX2lkLCBKU09OLnN0cmluZ2lmeShncm9jZXJ5TGlzdEl0ZW0pLCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iXX0=