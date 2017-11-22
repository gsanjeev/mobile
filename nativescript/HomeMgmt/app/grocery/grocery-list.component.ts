import { Component, ElementRef, OnInit, ViewChild, Input, Output } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as SocialShare from "nativescript-social-share";
import { action } from "ui/dialogs";
import { ListPicker } from "ui/list-picker";
import { Label } from "ui/label";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

import {GroceryService} from './grocery.service';
import {GroceryItem} from './grocery-item';

import { Auth } from '../auth/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: './grocery-list.component.html',
    styleUrls: ["./grocery-list-common.css"]
})
export class GroceryListComponent { 
    //groceryItems: GroceryItem[];
    groceryList: GroceryItem[];
    newGroceryListItem= {_id: '', name:'', qty:null, unit:'',user:'',isPurchased: false,description:''};
    private selectedId: string;
    
    public groceryItems: Array<string>;
    public groceryItemSelectedIndex: number;  
    
    isLoading = false;
    listLoaded = false;
    
    @ViewChild( "groceryItemPicker" ) groceryItemPicker: ElementRef;
    @ViewChild( "groceryItemPickerLabel" ) groceryItemPickerLabel: ElementRef;

    constructor(private groceryService:GroceryService,
            private route: ActivatedRoute,private auth: Auth,
            private router: Router, private routerExtensions: RouterExtensions        
    
    )
    {
        this.groceryService.getGroceryItems()
        .subscribe(groceryItems => {
            //this.groceryItems = groceryItems;  
            //console.log(groceryItems);
            this.groceryItems = [];

            for (let i = 0; i < groceryItems.length; i++) {
                this.groceryItems.push(groceryItems[i].name);
            }
        });
        
        this.groceryService.getGroceryList()
        .subscribe(groceryList => {
            this.groceryList = groceryList; 
            //console.log(groceryList);
            this.listLoaded = true;
        });
        
    }
 
    public groceryItemIndexChanged(groceryItemPicker) {
        this.groceryItemSelectedIndex = groceryItemPicker.selectedIndex;
        console.log("groceryItemPicker selection: " + groceryItemPicker.selectedIndex);
    }
    
    ngOnInit() {
        this.route.params
              .subscribe(params => 
                  this.selectedId = params['id']);
      }


      isSelected(groceryListItem: GroceryItem) { 
          return groceryListItem._id === this.selectedId;         

      }
    
    addGroceryListItem(source:any) {
        //var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
        //console.log('grocery-list.userProfile');
        //console.log(userProfile);
        console.log('this.groceryService.getUser()' + this.groceryService.getUser());
        //event.preventDefault();       
        this.newGroceryListItem.user = this.groceryService.getUser();
        this.newGroceryListItem.name = this.groceryItems[this.groceryItemSelectedIndex];
        if (this.newGroceryListItem.qty == null) {            
            this.newGroceryListItem.qty = 0;
        }
        this.groceryService.addGroceryListItem(this.newGroceryListItem)
            .subscribe(groceryListItem => {
                this.groceryList.push(groceryListItem);
            });
    }
    
    deleteGroceryListItem(_id:string){
        var groceryList = this.groceryList;
        this.groceryService.deleteGroceryListItem(_id)
            .subscribe(data => {
                if(data.n == 1){
                    for(var i = 0; i < groceryList.length; i++) {
                        if(groceryList[i]._id == _id) {
                            groceryList.splice(i,1);
                        }
                    }
                }
            })
    }

    openGroceryItemPicker() {
        console.log("openGroceryItemPicker()");
        let groceryItemPicker:ListPicker = <ListPicker>this.groceryItemPicker.nativeElement;
        let groceryItemPickerLabel:Label = <Label>this.groceryItemPickerLabel.nativeElement;
        console.log("openGroceryItemPicker()");
        groceryItemPicker.visibility = "visible";
        groceryItemPicker.focus();
        groceryItemPickerLabel.visibility = "collapsed";
        //let picker = page.getViewById('picker');
        groceryItemPicker.animate({
             translate: { x: 0, y: 0 },
             duration: 300
         });
     }
    
    onSelect(groceryListItem:GroceryItem) {
        this.router.navigate(['/grocery-item', groceryListItem._id]);
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
        for ( let i = 0, size = this.groceryList.length; i < size; i++ ) {
            list.push( this.groceryList[i].name + ", " + this.groceryList[i].qty);
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
    
    onNavBtnTap() {
        //alert("Go Back");
        this.routerExtensions.back();
        //this.routerExtensions.backToPreviousPage(); \
    }
}
