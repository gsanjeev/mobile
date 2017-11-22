import { Component, OnInit } from "@angular/core";
import { Auth } from "../auth/auth.service";
import { Page } from "ui/page";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

@Component( {
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent {

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_login";
    }

    constructor( private auth: Auth, private page: Page, private routerExtensions: RouterExtensions ) {

    }

    onNavBtnTap() {
        //alert("Go Back");
        this.routerExtensions.back();
        //this.routerExtensions.backToPreviousPage(); \
    }

}





