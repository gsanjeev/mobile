"use strict";
var core_1 = require("@angular/core");
var appSettings = require("application-settings");
var router_1 = require("@angular/router");
var auth_config_1 = require("./auth.config");
require("rxjs/add/operator/take");
var nativescript_auth0_1 = require("nativescript-auth0");
var angular2_jwt_1 = require("angular2-jwt");
var Auth = Auth_1 = (function () {
    function Auth(router) {
        this.router = router;
        console.log('Auth.console()');
        /*        // Set userProfile attribute of already saved profile
                // Add callback for the Lock `authenticated` event
                this.lock.on( "authenticated", ( authResult ) => {
                    appSettings.setString( "id_token", authResult.idToken);
                    // Fetch profile information
                    this.lock.getProfile( authResult.idToken, ( error, profile ) => {
                        if ( error ) {
                            // Handle error
                            alert( error );
                            return;
                        }
        
                        appSettings.setString( "profile", JSON.stringify( profile ) );
                        this.userProfile = profile;
                        // Redirect to the saved URL, if present.
                        var redirectUrl: string = appSettings.getString( "redirect_url" );
                        if ( redirectUrl != undefined ) {
                            console.log( redirectUrl );
                            this.router.navigate( [redirectUrl] );
                            appSettings.remove("redirect_url");
                        }
                    });
                });
                this.lock.on( 'authorization_error', authResult => {
                    console.log( authResult );
                });*/
        if (Auth_1.lock == null) {
            Auth_1.lock = new nativescript_auth0_1.Auth0Lock({
                clientId: auth_config_1.myConfig.clientID,
                domain: auth_config_1.myConfig.domain,
            });
        }
    }
    Auth.prototype.login = function () {
        var _this = this;
        // Call the show method to display the widget.
        console.log('login()');
        Auth_1.lock.show().then(function (res) {
            console.log(JSON.stringify(res));
            //console.log( appSettings.getString(Auth0Lock._tokenKey) );          
            if (appSettings.getString(nativescript_auth0_1.Auth0Lock._tokenKey) != null) {
                var data = JSON.parse(appSettings.getString(nativescript_auth0_1.Auth0Lock._tokenKey));
                console.log('accessToken:::1::::' + data.accessToken);
                console.log('idToken:::2::::' + data.idToken);
            }
            //console.log( '*****' + Auth.lock.credientials + '*****');
            /* console.log( '**********');
             console.log( 'accessToken c:' + Auth.lock.credientials.accessToken);
             console.log( 'idToken c:' + Auth.lock.credientials.idToken);*/
            /*
                        console.log( 'getTokenInfo');
                        Auth.lock.getTokenInfo().then((resToken) => {
                            console.log(JSON.stringify(resToken));
                        });*/
            console.log('Going to call getUserInfo()...');
            Auth_1.lock.getUserInfo().then(function (resUser) {
                console.log("userInfo::::3:::" + JSON.stringify(resUser));
                appSettings.setString("userInfo", JSON.stringify(resUser));
                _this.router.navigate(["/task-list"]);
                return;
            }).catch(function (ex) {
                console.error('Error geting userInfo', ex);
            });
            _this.wait(5000);
            /*            setTimeout( () => {
                            console.log( "userInfo::::4:::"+appSettings.getString("userInfo") );
                            this.router.navigate( ["/task-list"] );
                        }, 10000);*/
            if (appSettings.getString("userInfo") != null) {
                _this.router.navigate(["/task-list"]);
                return;
            }
            else {
                _this.router.navigate(["/home"]);
            }
        }, function (error) {
            console.log(error);
        });
        this.router.navigate(["/home"]);
    };
    Auth.prototype.wait = function (timeInMS) {
        var counter = 0, start = new Date().getTime(), end = 0;
        while (counter < timeInMS) {
            end = new Date().getTime();
            counter = end - start;
        }
    };
    /*    public authenticated() {
            //console.log( 'Auth:authenticated()......' );
            //console.log( tokenNotExpired() );
            // Check if there's an unexpired JWT
            // It searches for an item in appSettings with key == 'id_token'
            let token:string = appSettings.getString( "id_token" );
            return token != null && tokenNotExpired(token);
        };
    
        public logout() {
            // Remove token and profile from appSettings
            appSettings.remove( "id_token" );
            appSettings.remove( "profile" );
            this.userProfile = undefined;
        }*/
    Auth.prototype.logout = function () {
        console.log('logout()');
        console.log(nativescript_auth0_1.Auth0Lock._tokenKey + "|||l1|||||" + appSettings.getString(nativescript_auth0_1.Auth0Lock._tokenKey));
        console.log("userInfo:||||l2||||" + appSettings.getString("userInfo"));
        Auth_1.lock.clearTokens();
        appSettings.remove("userInfo");
        console.log(nativescript_auth0_1.Auth0Lock._tokenKey + "||||l3||||" + appSettings.getString(nativescript_auth0_1.Auth0Lock._tokenKey));
        console.log("userInfo:" + "||||l4||||" + appSettings.getString("userInfo"));
        this.router.navigate(["/home"]);
    };
    Auth.prototype.isLoggedIn = function () {
        console.log(Auth_1.lock.hasValidToken());
        return Auth_1.lock.hasValidToken();
    };
    Auth.prototype.authenticated = function () {
        var authenticated = false;
        /*console.log( Auth.lock.hasValidToken() );
        console.log( Auth0Lock._tokenKey );*/
        // console.log( appSettings.getString(Auth0Lock._tokenKey) );          
        if (appSettings.getString(nativescript_auth0_1.Auth0Lock._tokenKey) != null) {
            var tokens = JSON.parse(appSettings.getString(nativescript_auth0_1.Auth0Lock._tokenKey));
            /*console.log( 'accessToken' + tokens.accessToken);
            console.log( 'idToken' + tokens.idToken);*/
            authenticated = this.hasValidToken(tokens);
        }
        //console.log( Auth.lock.credientials );
        console.log('**********');
        /* console.log( 'accessToken c:' + Auth.lock.credientials.accessToken);
         console.log( 'idToken c:' + Auth.lock.credientials.idToken);*/
        //return Auth.lock.hasValidToken();
        return authenticated;
    };
    Auth.prototype.hasValidToken = function (tokens) {
        var accessToken = tokens.accessToken;
        if (accessToken === "")
            return false;
        var jwtHelper = new angular2_jwt_1.JwtHelper();
        if (jwtHelper.isTokenExpired(tokens.idToken))
            return false;
        return true;
    };
    return Auth;
}());
Auth = Auth_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], Auth);
exports.Auth = Auth;
var Auth_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0Msa0RBQW9EO0FBQ3BELDBDQUF5QztBQUN6Qyw2Q0FBeUM7QUFDekMsa0NBQWdDO0FBRWhDLHlEQUErQztBQUMvQyw2Q0FBeUM7QUFLekMsSUFBYSxJQUFJO0lBR2IsY0FBcUIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFL0IsT0FBTyxDQUFDLEdBQUcsQ0FBRSxnQkFBZ0IsQ0FBRSxDQUFDO1FBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQXlCYTtRQUNMLEVBQUUsQ0FBQyxDQUFDLE1BQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFJLENBQUMsSUFBSSxHQUFHLElBQUksOEJBQVMsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLHNCQUFRLENBQUMsUUFBUTtnQkFDM0IsTUFBTSxFQUFDLHNCQUFRLENBQUMsTUFBTTthQUV6QixDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVNLG9CQUFLLEdBQVo7UUFBQSxpQkErQ0M7UUE5Q0csOENBQThDO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUUsU0FBUyxDQUFFLENBQUM7UUFDekIsTUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRWpDLHNFQUFzRTtZQUN0RSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLDhCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDcEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMs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QUFXLEtBQUssRUFBRSxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixJQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFTLEVBQUUsQ0FBQztRQUNsQyxFQUFFLENBQUEsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRWYsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRVAsV0FBQztBQUFELENBQUMsQUFuS0QsSUFtS0M7QUFuS1ksSUFBSTtJQURoQixpQkFBVSxFQUFFO3FDQUlvQixlQUFNO0dBSDFCLElBQUksQ0FtS2hCO0FBbktZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgbXlDb25maWcgfSBmcm9tICcuL2F1dGguY29uZmlnJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90YWtlJztcclxuXHJcbmltcG9ydCB7IEF1dGgwTG9jayB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYXV0aDBcIjtcclxuaW1wb3J0IHsgSnd0SGVscGVyIH0gZnJvbSAnYW5ndWxhcjItand0JztcclxuXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aCB7XHJcbiAgICBzdGF0aWMgbG9jazpBdXRoMExvY2s7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIgKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coICdBdXRoLmNvbnNvbGUoKScgKTtcclxuLyogICAgICAgIC8vIFNldCB1c2VyUHJvZmlsZSBhdHRyaWJ1dGUgb2YgYWxyZWFkeSBzYXZlZCBwcm9maWxlXHJcbiAgICAgICAgLy8gQWRkIGNhbGxiYWNrIGZvciB0aGUgTG9jayBgYXV0aGVudGljYXRlZGAgZXZlbnRcclxuICAgICAgICB0aGlzLmxvY2sub24oIFwiYXV0aGVudGljYXRlZFwiLCAoIGF1dGhSZXN1bHQgKSA9PiB7XHJcbiAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyggXCJpZF90b2tlblwiLCBhdXRoUmVzdWx0LmlkVG9rZW4pO1xyXG4gICAgICAgICAgICAvLyBGZXRjaCBwcm9maWxlIGluZm9ybWF0aW9uXHJcbiAgICAgICAgICAgIHRoaXMubG9jay5nZXRQcm9maWxlKCBhdXRoUmVzdWx0LmlkVG9rZW4sICggZXJyb3IsIHByb2ZpbGUgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGVycm9yICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCBlcnJvciApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoIFwicHJvZmlsZVwiLCBKU09OLnN0cmluZ2lmeSggcHJvZmlsZSApICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJQcm9maWxlID0gcHJvZmlsZTtcclxuICAgICAgICAgICAgICAgIC8vIFJlZGlyZWN0IHRvIHRoZSBzYXZlZCBVUkwsIGlmIHByZXNlbnQuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVkaXJlY3RVcmw6IHN0cmluZyA9IGFwcFNldHRpbmdzLmdldFN0cmluZyggXCJyZWRpcmVjdF91cmxcIiApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCByZWRpcmVjdFVybCAhPSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIHJlZGlyZWN0VXJsICk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoIFtyZWRpcmVjdFVybF0gKTtcclxuICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5yZW1vdmUoXCJyZWRpcmVjdF91cmxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubG9jay5vbiggJ2F1dGhvcml6YXRpb25fZXJyb3InLCBhdXRoUmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coIGF1dGhSZXN1bHQgKTtcclxuICAgICAgICB9KTsqL1xyXG4gICAgICAgIGlmIChBdXRoLmxvY2sgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBBdXRoLmxvY2sgPSBuZXcgQXV0aDBMb2NrKHtcclxuICAgICAgICAgICAgICAgIGNsaWVudElkOiBteUNvbmZpZy5jbGllbnRJRCxcclxuICAgICAgICAgICAgICAgIGRvbWFpbjpteUNvbmZpZy5kb21haW4sXHJcbiAgICAgICAgICAgICAgIC8vc2NvcGVzOiBbIFwib2ZmbGluZV9hY2Nlc3Mgb3BlbmlkXCJdIC8vT3B0aW9uYWwgcGFyYW0sIGNoZWNrIHRoZSBhdXRoMCBkb2NzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW4oKSB7XHJcbiAgICAgICAgLy8gQ2FsbCB0aGUgc2hvdyBtZXRob2QgdG8gZGlzcGxheSB0aGUgd2lkZ2V0LlxyXG4gICAgICAgIGNvbnNvbGUubG9nKCAnbG9naW4oKScgKTtcclxuICAgICAgICBBdXRoLmxvY2suc2hvdygpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coIGFwcFNldHRpbmdzLmdldFN0cmluZyhBdXRoMExvY2suX3Rva2VuS2V5KSApOyAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGFwcFNldHRpbmdzLmdldFN0cmluZyhBdXRoMExvY2suX3Rva2VuS2V5KSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShhcHBTZXR0aW5ncy5nZXRTdHJpbmcoQXV0aDBMb2NrLl90b2tlbktleSkpOyAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCAnYWNjZXNzVG9rZW46OjoxOjo6OicgKyBkYXRhLmFjY2Vzc1Rva2VuKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCAnaWRUb2tlbjo6OjI6Ojo6JyArIGRhdGEuaWRUb2tlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyggJyoqKioqJyArIEF1dGgubG9jay5jcmVkaWVudGlhbHMgKyAnKioqKionKTtcclxuICAgICAgICAgICAvKiBjb25zb2xlLmxvZyggJyoqKioqKioqKionKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coICdhY2Nlc3NUb2tlbiBjOicgKyBBdXRoLmxvY2suY3JlZGllbnRpYWxzLmFjY2Vzc1Rva2VuKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coICdpZFRva2VuIGM6JyArIEF1dGgubG9jay5jcmVkaWVudGlhbHMuaWRUb2tlbik7Ki9cclxuLyogICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coICdnZXRUb2tlbkluZm8nKTtcclxuICAgICAgICAgICAgQXV0aC5sb2NrLmdldFRva2VuSW5mbygpLnRoZW4oKHJlc1Rva2VuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNUb2tlbikpO1xyXG4gICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyggJ0dvaW5nIHRvIGNhbGwgZ2V0VXNlckluZm8oKS4uLicpO1xyXG4gICAgICAgICAgICBBdXRoLmxvY2suZ2V0VXNlckluZm8oKS50aGVuKChyZXNVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXJJbmZvOjo6OjM6OjpcIitKU09OLnN0cmluZ2lmeShyZXNVc2VyKSk7XHJcbiAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ1c2VySW5mb1wiLCBKU09OLnN0cmluZ2lmeShyZXNVc2VyKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSggW1wiL3Rhc2stbGlzdFwiXSApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGdldGluZyB1c2VySW5mbycsIGV4KTtcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgICB0aGlzLndhaXQoNTAwMCk7XHJcbi8qICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwidXNlckluZm86Ojo6NDo6OlwiK2FwcFNldHRpbmdzLmdldFN0cmluZyhcInVzZXJJbmZvXCIpICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSggW1wiL3Rhc2stbGlzdFwiXSApO1xyXG4gICAgICAgICAgICB9LCAxMDAwMCk7Ki9cclxuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidXNlckluZm9cIikgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKCBbXCIvdGFzay1saXN0XCJdICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSggW1wiL2hvbWVcIl0gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSggW1wiL2hvbWVcIl0gKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSB3YWl0KCB0aW1lSW5NUyApIHtcclxuICAgICAgICB2YXIgY291bnRlciA9IDBcclxuICAgICAgICAgICAgLCBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgICAgICwgZW5kID0gMDtcclxuICAgICAgICB3aGlsZSAoIGNvdW50ZXIgPCB0aW1lSW5NUyApIHtcclxuICAgICAgICAgICAgZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvdW50ZXIgPSBlbmQgLSBzdGFydDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4vKiAgICBwdWJsaWMgYXV0aGVudGljYXRlZCgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCAnQXV0aDphdXRoZW50aWNhdGVkKCkuLi4uLi4nICk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyggdG9rZW5Ob3RFeHBpcmVkKCkgKTtcclxuICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSdzIGFuIHVuZXhwaXJlZCBKV1RcclxuICAgICAgICAvLyBJdCBzZWFyY2hlcyBmb3IgYW4gaXRlbSBpbiBhcHBTZXR0aW5ncyB3aXRoIGtleSA9PSAnaWRfdG9rZW4nXHJcbiAgICAgICAgbGV0IHRva2VuOnN0cmluZyA9IGFwcFNldHRpbmdzLmdldFN0cmluZyggXCJpZF90b2tlblwiICk7XHJcbiAgICAgICAgcmV0dXJuIHRva2VuICE9IG51bGwgJiYgdG9rZW5Ob3RFeHBpcmVkKHRva2VuKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGxvZ291dCgpIHtcclxuICAgICAgICAvLyBSZW1vdmUgdG9rZW4gYW5kIHByb2ZpbGUgZnJvbSBhcHBTZXR0aW5nc1xyXG4gICAgICAgIGFwcFNldHRpbmdzLnJlbW92ZSggXCJpZF90b2tlblwiICk7XHJcbiAgICAgICAgYXBwU2V0dGluZ3MucmVtb3ZlKCBcInByb2ZpbGVcIiApO1xyXG4gICAgICAgIHRoaXMudXNlclByb2ZpbGUgPSB1bmRlZmluZWQ7XHJcbiAgICB9Ki9cclxuICAgIHB1YmxpYyBsb2dvdXQoKSB7ICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyggJ2xvZ291dCgpJyApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCBBdXRoMExvY2suX3Rva2VuS2V5K1wifHx8bDF8fHx8fFwiK2FwcFNldHRpbmdzLmdldFN0cmluZyhBdXRoMExvY2suX3Rva2VuS2V5KSApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCBcInVzZXJJbmZvOnx8fHxsMnx8fHxcIithcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ1c2VySW5mb1wiKSApO1xyXG4gICAgICAgIEF1dGgubG9jay5jbGVhclRva2VucygpO1xyXG4gICAgICAgIGFwcFNldHRpbmdzLnJlbW92ZShcInVzZXJJbmZvXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCBBdXRoMExvY2suX3Rva2VuS2V5K1wifHx8fGwzfHx8fFwiK2FwcFNldHRpbmdzLmdldFN0cmluZyhBdXRoMExvY2suX3Rva2VuS2V5KSApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCBcInVzZXJJbmZvOlwiK1wifHx8fGw0fHx8fFwiK2FwcFNldHRpbmdzLmdldFN0cmluZyhcInVzZXJJbmZvXCIpICk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoIFtcIi9ob21lXCJdICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTG9nZ2VkSW4oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coIEF1dGgubG9jay5oYXNWYWxpZFRva2VuKCkgKTtcclxuICAgICAgICByZXR1cm4gQXV0aC5sb2NrLmhhc1ZhbGlkVG9rZW4oKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgcHVibGljIGF1dGhlbnRpY2F0ZWQoKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGxldCBhdXRoZW50aWNhdGVkOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgIC8qY29uc29sZS5sb2coIEF1dGgubG9jay5oYXNWYWxpZFRva2VuKCkgKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCBBdXRoMExvY2suX3Rva2VuS2V5ICk7Ki9cclxuICAgICAgICAgLy8gY29uc29sZS5sb2coIGFwcFNldHRpbmdzLmdldFN0cmluZyhBdXRoMExvY2suX3Rva2VuS2V5KSApOyAgICAgICAgICBcclxuICAgICAgICAgIGlmIChhcHBTZXR0aW5ncy5nZXRTdHJpbmcoQXV0aDBMb2NrLl90b2tlbktleSkgIT0gbnVsbCApe1xyXG4gICAgICAgICAgICAgIGxldCB0b2tlbnMgPSBKU09OLnBhcnNlKGFwcFNldHRpbmdzLmdldFN0cmluZyhBdXRoMExvY2suX3Rva2VuS2V5KSk7ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8qY29uc29sZS5sb2coICdhY2Nlc3NUb2tlbicgKyB0b2tlbnMuYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCAnaWRUb2tlbicgKyB0b2tlbnMuaWRUb2tlbik7Ki9cclxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGVkID10aGlzLmhhc1ZhbGlkVG9rZW4odG9rZW5zKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyggQXV0aC5sb2NrLmNyZWRpZW50aWFscyApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coICcqKioqKioqKioqJyk7XHJcbiAgICAgICAgIC8qIGNvbnNvbGUubG9nKCAnYWNjZXNzVG9rZW4gYzonICsgQXV0aC5sb2NrLmNyZWRpZW50aWFscy5hY2Nlc3NUb2tlbik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyggJ2lkVG9rZW4gYzonICsgQXV0aC5sb2NrLmNyZWRpZW50aWFscy5pZFRva2VuKTsqL1xyXG4gICAgICAgICAgLy9yZXR1cm4gQXV0aC5sb2NrLmhhc1ZhbGlkVG9rZW4oKTtcclxuICAgICAgICAgIHJldHVybiBhdXRoZW50aWNhdGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHByaXZhdGUgaGFzVmFsaWRUb2tlbih0b2tlbnMpOiBib29sZWFue1xyXG4gICAgICAgICAgdmFyIGFjY2Vzc1Rva2VuID0gdG9rZW5zLmFjY2Vzc1Rva2VuO1xyXG5cclxuICAgICAgICAgIGlmKGFjY2Vzc1Rva2VuID09PSBcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICBjb25zdCBqd3RIZWxwZXIgPSBuZXcgSnd0SGVscGVyKCk7XHJcbiAgICAgICAgICBpZihqd3RIZWxwZXIuaXNUb2tlbkV4cGlyZWQodG9rZW5zLmlkVG9rZW4pKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbn1cclxuIl19