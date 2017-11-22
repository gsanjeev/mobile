import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild, ChangeDetectionStrategy, EventEmitter, Input, Output } from "@angular/core";
import { TextField } from "ui/text-field";
import {Http} from '@angular/http';
import { CookingVideoService } from './cooking-video.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as SocialShare from "nativescript-social-share";
import { action } from "ui/dialogs";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

import { Auth } from '../auth/auth.service';
var utilityModule = require("utils/utils");

@Component( {
    moduleId: module.id,
    templateUrl: './cooking-video.component.html'
})
export class CookingVideoComponent implements OnInit {

    
    isLoading = false;
    listLoaded = false;
    //selecteVideoId: any;
    //search = new FormControl();
    search:string = "";
    //@ViewChild( "searchTextField" ) searchTextField: ElementRef;
    //seachResults: Observable<any>;
    seachResults: any[] =[];
    private selectedVideoId: string = 'gtS84etMrKA';

    constructor( private videoService: CookingVideoService, private http:Http, 
            private router: Router, private auth: Auth, private routerExtensions: RouterExtensions) {
       
        //observable of results
       // this.seachResults =
            //input value change observable
        //let textField = <TextField>this.taskTextField.nativeElement;
        
/*            this.search.valueChanges
                .debounceTime( 200 ) //debounce for 200ms
                .switchMap( query => videoService.search( query ) )
                .subscribe(result => {
                this.seachResults = result;
                this.listLoaded = true;
            }); */                      
    }
    
    onSearchChanged(event) {
        //this.listLoaded = false;
        //console.log(event.value);
        //console.log('onSearchChanged:' + this.search);
        setTimeout(() => {
            //console.log('setTimeout:' + this.search);
            this.searchVideo(this.search, event)}, 200);                              
    }
    
    searchVideo(query:string, event:any) {
        //console.log('searchVideo:' + query);
            this.videoService.search( query ) 
            .subscribe(result => {
                this.seachResults = result;
                //this.listLoaded = true;
                this.onSearchBarLoaded(event);
            });                              
    }

    ngOnInit() {
        this.videoService.search( "sanjeev kapoor" ).subscribe(result => {
            this.seachResults = result;
            this.listLoaded = true;
            //console.log( JSON.stringify(this.seachResults) ); 
        });
    }
    
    openCookingVideo(videoId:string) {
        utilityModule.openUrl("https://youtu.be/"+ videoId);
        console.log( "https://youtu.be/"+ videoId ); 
    }
    
    showMenu() {
        action( {
            message: "What would you like to do?",
            actions: ["Share", "Log Off"],
            cancelButtonText: "Cancel"
        }).then(( result ) => {
            if ( result === "Share" ) {
                this.share();
            } else if ( result === "Log Off" ) {
                this.logoff();
            }
        });
    }

    share() {
        let list = [];
        for ( let i = 0, size = this.seachResults.length; i < size; i++ ) {
            list.push( "https://youtu.be/" + this.seachResults[i].id.videoId + " , ");
        }
        console.log( "List for Sharing: " + list.join( ",".trim() ) );
        SocialShare.shareText( list.join( ", " ).trim() );
    }

    logoff() {
        this.auth.logout();
        this.router.navigate( ["/home"] );
    }

    imageSource( task ) {
        return task.isDone ? "res://checked" : "res://unchecked";
    }

    handleAndroidFocus( textField, container ) {
/*        console.log('***************:' );
        console.log('container:' + container);
        console.log('container.android' + container.android);
        if ( container.android ) {
            container.android.setFocusableInTouchMode( true );
            container.android.setFocusable( true );
            textField.android.clearFocus();
        }*/
    }

    showActivityIndicator() {
        this.isLoading = true;
    }
    hideActivityIndicator() {
        this.isLoading = false;
    }
    
    onSearchBarLoaded(event) {
        if (event.object.android) {
            event.object.dismissSoftInput();
            event.object.android.clearFocus();
            event.object.android.setFocusable(false);
        }
    }
    
    public onClear(event) {
        this.search = "";
        this.onSearchBarLoaded(event);
    }
    
    onNavBtnTap() {
        //alert("Go Back");
        this.routerExtensions.back();
        //this.routerExtensions.backToPreviousPage(); \
    }

}

@Pipe({
    name: 'videoFilter',
    //pure: false
  })
  export class VideoFilter implements PipeTransform {
    transform(seachResults: any[]): any {
        return seachResults.filter(video => {
         if (!video.id.videoId)  {
             return false;
         }             
          return true;
        });
    }
    

  }
