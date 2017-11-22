import {Injectable} from '@angular/core';
import{Http, Headers} from '@angular/http';
//import{AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import * as appSettings from "application-settings";
import { Auth0Lock } from "nativescript-auth0";

import { apiConfig } from '../api.config';
import {GroceryItem} from './grocery-item';

@Injectable()
export class GroceryService {
    
    constructor(private http:Http) {
        console.log('Grocery Service Initialized...');
    }
    
    getUser(): string {
        let email:string = 'ysanjeev@yahoo.com';
        console.log("userInfo"+"***t1***"+appSettings.getString( "userInfo" ) );
        if (appSettings.getString( "userInfo" ) != null) {
            let userInfo = JSON.parse( appSettings.getString( "userInfo" ) );
            email = userInfo.email;
        }
        return email;
        //let tokens = JSON.parse(appSettings.getString(Auth0Lock._tokenKey));      
    }

    private getAuthToken(): string {

        console.log(Auth0Lock._tokenKey+"***t3***"+appSettings.getString( Auth0Lock._tokenKey ) );
        let tokens = JSON.parse( appSettings.getString( Auth0Lock._tokenKey ) );
        //console.log(Auth0Lock._tokenKey+"****t4**"+tokens );
        return tokens.idToken
    }
    
    getGroceryItems() {
        var headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );
        headers.append( "Authorization", "Bearer " + this.getAuthToken() );
        return this.http.get(apiConfig.apiURL + '/api/grocery/item', { headers: headers })
            .map(res =>res.json());
    }
    
    getGroceryList() {
        
        //var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
        //console.log('GroceryService.userProfile');
        //console.log(userProfile);
        //console.log(userProfile.email);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append( "Authorization", "Bearer " + this.getAuthToken() );
        headers.append('user', this.getUser());
        return this.http.get(apiConfig.apiURL + '/api/grocery', {headers: headers})
            .map(res =>res.json());
    }
    
    getGroceryListItem(id:string) {
        console.log('id');
        console.log(id);
        var headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );
        headers.append( "Authorization", "Bearer " + this.getAuthToken() );
        return this.http.get(apiConfig.apiURL + '/api/grocery/'+id, { headers: headers })
            .map(res =>res.json()[0]);
    }
    
    addGroceryListItem(newGroceryListItem:GroceryItem) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append( "Authorization", "Bearer " + this.getAuthToken() );
        return this.http.post(apiConfig.apiURL + '/api/grocery', JSON.stringify(newGroceryListItem), {headers: headers})
            .map(res => res.json());
    }
    
    deleteGroceryListItem (id:string){
        var headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );
        headers.append( "Authorization", "Bearer " + this.getAuthToken() );
        return this.http.delete(apiConfig.apiURL + '/api/grocery/'+id, { headers: headers })
            .map(res => res.json());
    }
    
    updateGroceryListItem(groceryListItem:GroceryItem) {
        console.log("GroceryService.updateGroceryListItem()");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append( "Authorization", "Bearer " + this.getAuthToken() );
        return this.http.put(apiConfig.apiURL + '/api/grocery/' +groceryListItem._id, JSON.stringify(groceryListItem), {headers: headers})
            .map(res => res.json());
    }
    
}