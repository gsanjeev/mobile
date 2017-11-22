import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NativeScriptRouterModule } from "nativescript-angular/router";

//import { AuthGuard }  from './auth/auth-gaurd.service';
import {HomeComponent} from './home/home.component';
import {TasksComponent} from './tasks/tasks.component';
import { CookingVideoComponent } from "./videos/cooking-video.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'task-list', component: TasksComponent },
    { path: 'cooking-video', component: CookingVideoComponent},
];


@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot(appRoutes)
  ],
  exports: [
    NativeScriptRouterModule
  ]
})
export class AppRoutingModule {}
