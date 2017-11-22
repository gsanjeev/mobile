import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { GroceryListComponent }    from './grocery-list.component';
import { GroceryItemDetailComponent }  from './grocery-item-detail.component';

//import { AuthGuard }      from '../auth/auth-gaurd.service';


const groceryRoutes: Routes = [
  { path: 'grocery-item/:id', component: GroceryItemDetailComponent },
  { path: 'grocery-list',  component: GroceryListComponent },
];

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild(groceryRoutes)
  ],
  exports: [
    NativeScriptRouterModule
  ]
})
export class GroceryRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/