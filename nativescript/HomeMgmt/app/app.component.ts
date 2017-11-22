import { Component, OnInit } from "@angular/core";
import { Page } from 'ui/page';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';


@Component( {
    moduleId: module.id,
    selector: "my-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

    constructor(private page: Page, private routerExtensions: RouterExtensions) {
    }
    
    ngOnInit() {
        //this.page.actionBarHidden = false;
        //this.page.backgroundImage = "res://bg_login";
      }

}
