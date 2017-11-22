import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule }   from '@angular/common';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { GroceryModule } from './grocery/grocery.module';

import {  AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { TasksComponent } from "./tasks/tasks.component";
//import { GroceryComponent } from "./grocery/grocery.component";
import { CookingVideoComponent } from "./videos/cooking-video.component";
import { Auth } from "./auth/auth.service";
import { TaskService } from "./tasks/task.service";
import { CookingVideoService } from "./videos/cooking-video.service";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown);

@NgModule({
  declarations: [AppComponent, HomeComponent, CookingVideoComponent, TasksComponent],
  bootstrap: [AppComponent],
  imports: [CommonModule, NativeScriptModule, NativeScriptHttpModule,NativeScriptFormsModule, 
            GroceryModule, AppRoutingModule],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
              Auth, TaskService, CookingVideoService
            ]
})
export class AppModule {}
