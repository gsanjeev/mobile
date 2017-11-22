import { Injectable} from '@angular/core';

import { Http, Headers } from '@angular/http';
//import{AuthHttp} from 'angular2-jwt';
import * as appSettings from "application-settings";
import { apiConfig } from '../api.config';
import { Auth0Lock } from "nativescript-auth0";

import 'rxjs/add/operator/map';
import { Task } from './task';

@Injectable()
export class TaskService {

    constructor( private http: Http) {
        console.log( 'Task Service Initialized...' );
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

    getTasks() {
        //var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
        console.log( 'Task Service . getTasks()...' );
        var headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );
        headers.append( "Authorization", "Bearer " + this.getAuthToken() );
        //headers.append('user', userProfile.email);
        headers.append( 'user', this.getUser() );
        console.log("going to call http.get:" + this.getUser());
        return this.http.get( apiConfig.apiURL + '/api/task', { headers: headers })
            .map( res => res.json() );
    }

    addTask( newTask: Task ) {
        var headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );
        headers.append( "Auth", this.getAuthToken() );
        return this.http.post( apiConfig.apiURL + '/api/task', JSON.stringify( newTask ), { headers: headers })
            .map( res => res.json() );
            
        
    }

    deleteTask( id: string ) {
        var headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );
        headers.append( "Auth", this.getAuthToken() );
        return this.http.delete( apiConfig.apiURL + '/api/task/' + id, { headers: headers })
            .map( res => res.json() );
    }

    updateStatus( task: Task ) {
        var headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );
        headers.append( "Auth", this.getAuthToken() );
        return this.http.put( apiConfig.apiURL + '/api/task/' + task._id, JSON.stringify( task ), { headers: headers })
            .map( res => res.json() );
    }


}