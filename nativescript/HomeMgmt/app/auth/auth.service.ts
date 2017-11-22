import { Injectable } from '@angular/core';
import * as appSettings from "application-settings";
import { Router } from '@angular/router';
import { myConfig } from './auth.config';
import 'rxjs/add/operator/take';

import { Auth0Lock } from "nativescript-auth0";
import { JwtHelper } from 'angular2-jwt';



@Injectable()
export class Auth {
    static lock:Auth0Lock;

    constructor( private router: Router ) {
        
        console.log( 'Auth.console()' );
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
        if (Auth.lock == null) {
            Auth.lock = new Auth0Lock({
                clientId: myConfig.clientID,
                domain:myConfig.domain,
               //scopes: [ "offline_access openid"] //Optional param, check the auth0 docs
            });
        }
    }

    public login() {
        // Call the show method to display the widget.
        console.log( 'login()' );
        Auth.lock.show().then((res) => {
            console.log(JSON.stringify(res));
            
            //console.log( appSettings.getString(Auth0Lock._tokenKey) );          
            if (appSettings.getString(Auth0Lock._tokenKey) != null){
                let data = JSON.parse(appSettings.getString(Auth0Lock._tokenKey));          
                console.log( 'accessToken:::1::::' + data.accessToken);
                console.log( 'idToken:::2::::' + data.idToken);
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
            console.log( 'Going to call getUserInfo()...');
            Auth.lock.getUserInfo().then((resUser) => {
                console.log("userInfo::::3:::"+JSON.stringify(resUser));
                appSettings.setString("userInfo", JSON.stringify(resUser));
                this.router.navigate( ["/task-list"] );
                return;
            }).catch((ex) => {
                console.error('Error geting userInfo', ex);
            }); 
            this.wait(5000);
/*            setTimeout( () => {
                console.log( "userInfo::::4:::"+appSettings.getString("userInfo") );
                this.router.navigate( ["/task-list"] );
            }, 10000);*/
        if (appSettings.getString("userInfo") != null){
            this.router.navigate( ["/task-list"] );
            return;
        } else {
            this.router.navigate( ["/home"] );
        }
            
                
        }, function (error) {
            console.log(error);
        });
        this.router.navigate( ["/home"] );
    }
    
    private wait( timeInMS ) {
        var counter = 0
            , start = new Date().getTime()
            , end = 0;
        while ( counter < timeInMS ) {
            end = new Date().getTime();
            counter = end - start;
        }
    }

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
    public logout() {        
        console.log( 'logout()' );
        console.log( Auth0Lock._tokenKey+"|||l1|||||"+appSettings.getString(Auth0Lock._tokenKey) );
        console.log( "userInfo:||||l2||||"+appSettings.getString("userInfo") );
        Auth.lock.clearTokens();
        appSettings.remove("userInfo");
        console.log( Auth0Lock._tokenKey+"||||l3||||"+appSettings.getString(Auth0Lock._tokenKey) );
        console.log( "userInfo:"+"||||l4||||"+appSettings.getString("userInfo") );
        this.router.navigate( ["/home"] );
    }

    public isLoggedIn() {
        console.log( Auth.lock.hasValidToken() );
        return Auth.lock.hasValidToken();
      }
      
      public authenticated() {
          
          let authenticated:boolean = false;
          /*console.log( Auth.lock.hasValidToken() );
          console.log( Auth0Lock._tokenKey );*/
         // console.log( appSettings.getString(Auth0Lock._tokenKey) );          
          if (appSettings.getString(Auth0Lock._tokenKey) != null ){
              let tokens = JSON.parse(appSettings.getString(Auth0Lock._tokenKey));          
              /*console.log( 'accessToken' + tokens.accessToken);
              console.log( 'idToken' + tokens.idToken);*/
              authenticated =this.hasValidToken(tokens)
          }
          //console.log( Auth.lock.credientials );
          console.log( '**********');
         /* console.log( 'accessToken c:' + Auth.lock.credientials.accessToken);
          console.log( 'idToken c:' + Auth.lock.credientials.idToken);*/
          //return Auth.lock.hasValidToken();
          return authenticated;
        }
      
      private hasValidToken(tokens): boolean{
          var accessToken = tokens.accessToken;

          if(accessToken === "")
            return false;
          const jwtHelper = new JwtHelper();
          if(jwtHelper.isTokenExpired(tokens.idToken))
            return false;

          return true;
      }

}
