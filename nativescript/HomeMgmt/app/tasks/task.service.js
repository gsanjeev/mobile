"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
//import{AuthHttp} from 'angular2-jwt';
var appSettings = require("application-settings");
var api_config_1 = require("../api.config");
var nativescript_auth0_1 = require("nativescript-auth0");
require("rxjs/add/operator/map");
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
        console.log('Task Service Initialized...');
    }
    TaskService.prototype.getUser = function () {
        var email = 'ysanjeev@yahoo.com';
        console.log("userInfo" + "***t1***" + appSettings.getString("userInfo"));
        if (appSettings.getString("userInfo") != null) {
            var userInfo = JSON.parse(appSettings.getString("userInfo"));
            email = userInfo.email;
        }
        return email;
        //let tokens = JSON.parse(appSettings.getString(Auth0Lock._tokenKey));      
    };
    TaskService.prototype.getAuthToken = function () {
        console.log(nativescript_auth0_1.Auth0Lock._tokenKey + "***t3***" + appSettings.getString(nativescript_auth0_1.Auth0Lock._tokenKey));
        var tokens = JSON.parse(appSettings.getString(nativescript_auth0_1.Auth0Lock._tokenKey));
        //console.log(Auth0Lock._tokenKey+"****t4**"+tokens );
        return tokens.idToken;
    };
    TaskService.prototype.getTasks = function () {
        //var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
        console.log('Task Service . getTasks()...');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Bearer " + this.getAuthToken());
        //headers.append('user', userProfile.email);
        headers.append('user', this.getUser());
        console.log("going to call http.get:" + this.getUser());
        return this.http.get(api_config_1.apiConfig.apiURL + '/api/task', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TaskService.prototype.addTask = function (newTask) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Auth", this.getAuthToken());
        return this.http.post(api_config_1.apiConfig.apiURL + '/api/task', JSON.stringify(newTask), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TaskService.prototype.deleteTask = function (id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Auth", this.getAuthToken());
        return this.http.delete(api_config_1.apiConfig.apiURL + '/api/task/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TaskService.prototype.updateStatus = function (task) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Auth", this.getAuthToken());
        return this.http.put(api_config_1.apiConfig.apiURL + '/api/task/' + task._id, JSON.stringify(task), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return TaskService;
}());
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMEM7QUFFMUMsc0NBQThDO0FBQzlDLHVDQUF1QztBQUN2QyxrREFBb0Q7QUFDcEQsNENBQTBDO0FBQzFDLHlEQUErQztBQUUvQyxpQ0FBK0I7QUFJL0IsSUFBYSxXQUFXO0lBRXBCLHFCQUFxQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFFLDZCQUE2QixDQUFFLENBQUM7SUFDakQsQ0FBQztJQUNELDZCQUFPLEdBQVA7UUFDSSxJQUFJLEtBQUssR0FBVSxvQkFBb0IsQ0FBQztRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxVQUFVLEdBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBRSxVQUFVLENBQUUsQ0FBRSxDQUFDO1FBQ3hFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUUsVUFBVSxDQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUUsVUFBVSxDQUFFLENBQUUsQ0FBQztZQUNqRSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUMzQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNiLDRFQUE0RTtJQUNoRixDQUFDO0lBRU8sa0NBQVksR0FBcEI7UUFFSSxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUFTLENBQUMsU0FBUyxHQUFDLFVBQVUsR0FBQyxXQUFXLENBQUMsU0FBUyxDQUFFLDhCQUFTLENBQUMsU0FBUyxDQUFFLENBQUUsQ0FBQztRQUMxRixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUUsOEJBQVMsQ0FBQyxTQUFTLENB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QUUsQ0FBQzthQUMxRyxHQUFHLENBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFFLENBQUM7SUFDbEMsQ0FBQztJQUdMLGtCQUFDO0FBQUQsQ0FBQyxBQWhFRCxJQWdFQztBQWhFWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBR2tCLFdBQUk7R0FGdEIsV0FBVyxDQWdFdkI7QUFoRVksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuLy9pbXBvcnR7QXV0aEh0dHB9IGZyb20gJ2FuZ3VsYXIyLWp3dCc7XHJcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBhcGlDb25maWcgfSBmcm9tICcuLi9hcGkuY29uZmlnJztcclxuaW1wb3J0IHsgQXV0aDBMb2NrIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hdXRoMFwiO1xyXG5cclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi90YXNrJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRhc2tTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBodHRwOiBIdHRwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coICdUYXNrIFNlcnZpY2UgSW5pdGlhbGl6ZWQuLi4nICk7XHJcbiAgICB9XHJcbiAgICBnZXRVc2VyKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGVtYWlsOnN0cmluZyA9ICd5c2FuamVldkB5YWhvby5jb20nO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXNlckluZm9cIitcIioqKnQxKioqXCIrYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKCBcInVzZXJJbmZvXCIgKSApO1xyXG4gICAgICAgIGlmIChhcHBTZXR0aW5ncy5nZXRTdHJpbmcoIFwidXNlckluZm9cIiApICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0gSlNPTi5wYXJzZSggYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKCBcInVzZXJJbmZvXCIgKSApO1xyXG4gICAgICAgICAgICBlbWFpbCA9IHVzZXJJbmZvLmVtYWlsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW1haWw7XHJcbiAgICAgICAgLy9sZXQgdG9rZW5zID0gSlNPTi5wYXJzZShhcHBTZXR0aW5ncy5nZXRTdHJpbmcoQXV0aDBMb2NrLl90b2tlbktleSkpOyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QXV0aFRva2VuKCk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKEF1dGgwTG9jay5fdG9rZW5LZXkrXCIqKip0MyoqKlwiK2FwcFNldHRpbmdzLmdldFN0cmluZyggQXV0aDBMb2NrLl90b2tlbktleSApICk7XHJcbiAgICAgICAgbGV0IHRva2VucyA9IEpTT04ucGFyc2UoIGFwcFNldHRpbmdzLmdldFN0cmluZyggQXV0aDBMb2NrLl90b2tlbktleSApICk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhBdXRoMExvY2suX3Rva2VuS2V5K1wiKioqKnQ0KipcIit0b2tlbnMgKTtcclxuICAgICAgICByZXR1cm4gdG9rZW5zLmlkVG9rZW5cclxuICAgIH1cclxuXHJcbiAgICBnZXRUYXNrcygpIHtcclxuICAgICAgICAvL3ZhciB1c2VyUHJvZmlsZSA9IEpTT04ucGFyc2UoIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCAncHJvZmlsZScgKSApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCAnVGFzayBTZXJ2aWNlIC4gZ2V0VGFza3MoKS4uLicgKTtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoICdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicgKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCggXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdGhpcy5nZXRBdXRoVG9rZW4oKSApO1xyXG4gICAgICAgIC8vaGVhZGVycy5hcHBlbmQoJ3VzZXInLCB1c2VyUHJvZmlsZS5lbWFpbCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoICd1c2VyJywgdGhpcy5nZXRVc2VyKCkgKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdvaW5nIHRvIGNhbGwgaHR0cC5nZXQ6XCIgKyB0aGlzLmdldFVzZXIoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoIGFwaUNvbmZpZy5hcGlVUkwgKyAnL2FwaS90YXNrJywgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoIHJlcyA9PiByZXMuanNvbigpICk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGFzayggbmV3VGFzazogVGFzayApIHtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoICdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicgKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCggXCJBdXRoXCIsIHRoaXMuZ2V0QXV0aFRva2VuKCkgKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoIGFwaUNvbmZpZy5hcGlVUkwgKyAnL2FwaS90YXNrJywgSlNPTi5zdHJpbmdpZnkoIG5ld1Rhc2sgKSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoIHJlcyA9PiByZXMuanNvbigpICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRhc2soIGlkOiBzdHJpbmcgKSB7XHJcbiAgICAgICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCAnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nICk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoIFwiQXV0aFwiLCB0aGlzLmdldEF1dGhUb2tlbigpICk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoIGFwaUNvbmZpZy5hcGlVUkwgKyAnL2FwaS90YXNrLycgKyBpZCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAoIHJlcyA9PiByZXMuanNvbigpICk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU3RhdHVzKCB0YXNrOiBUYXNrICkge1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCggJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyApO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCBcIkF1dGhcIiwgdGhpcy5nZXRBdXRoVG9rZW4oKSApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KCBhcGlDb25maWcuYXBpVVJMICsgJy9hcGkvdGFzay8nICsgdGFzay5faWQsIEpTT04uc3RyaW5naWZ5KCB0YXNrICksIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKCByZXMgPT4gcmVzLmpzb24oKSApO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0=