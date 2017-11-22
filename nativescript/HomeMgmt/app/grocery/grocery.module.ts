import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { GroceryRoutingModule } from './grocery-routing.module';

import { GroceryListComponent }    from './grocery-list.component';
import { GroceryItemDetailComponent }  from './grocery-item-detail.component';

import { GroceryService } from './grocery.service';


@NgModule({
  imports: [
    //CommonModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    GroceryRoutingModule
  ],
  declarations: [
    GroceryListComponent,
    GroceryItemDetailComponent
  ],
  providers: [
    GroceryService
  ]
})
export class GroceryModule {}
