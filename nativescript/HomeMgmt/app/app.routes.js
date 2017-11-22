"use strict";
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
//import { AuthGuard }  from './auth/auth-gaurd.service';
var home_component_1 = require("./home/home.component");
var tasks_component_1 = require("./tasks/tasks.component");
var cooking_video_component_1 = require("./videos/cooking-video.component");
var appRoutes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'task-list', component: tasks_component_1.TasksComponent },
    { path: 'cooking-video', component: cooking_video_component_1.CookingVideoComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.NativeScriptRouterModule.forRoot(appRoutes)
        ],
        exports: [
            router_1.NativeScriptRouterModule
        ]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFxRDtBQUVyRCxzREFBdUU7QUFFdkUseURBQXlEO0FBQ3pELHdEQUFvRDtBQUNwRCwyREFBdUQ7QUFDdkQsNEVBQXlFO0FBRXpFLElBQU0sU0FBUyxHQUFXO0lBQ3RCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUM7SUFDbkQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSw4QkFBYSxFQUFFO0lBQzFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtJQUNoRCxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLCtDQUFxQixFQUFDO0NBQzdELENBQUM7QUFXRixJQUFhLGdCQUFnQjtJQUE3QjtJQUErQixDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBQWhDLElBQWdDO0FBQW5CLGdCQUFnQjtJQVI1QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsaUNBQXdCO1NBQ3pCO0tBQ0YsQ0FBQztHQUNXLGdCQUFnQixDQUFHO0FBQW5CLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuLy9pbXBvcnQgeyBBdXRoR3VhcmQgfSAgZnJvbSAnLi9hdXRoL2F1dGgtZ2F1cmQuc2VydmljZSc7XHJcbmltcG9ydCB7SG9tZUNvbXBvbmVudH0gZnJvbSAnLi9ob21lL2hvbWUuY29tcG9uZW50JztcclxuaW1wb3J0IHtUYXNrc0NvbXBvbmVudH0gZnJvbSAnLi90YXNrcy90YXNrcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb29raW5nVmlkZW9Db21wb25lbnQgfSBmcm9tIFwiLi92aWRlb3MvY29va2luZy12aWRlby5jb21wb25lbnRcIjtcclxuXHJcbmNvbnN0IGFwcFJvdXRlczogUm91dGVzID0gW1xyXG4gICAgeyBwYXRoOiAnJywgcmVkaXJlY3RUbzogJy9ob21lJywgcGF0aE1hdGNoOiAnZnVsbCd9LFxyXG4gICAgeyBwYXRoOiAnaG9tZScsIGNvbXBvbmVudDogSG9tZUNvbXBvbmVudCB9LFxyXG4gICAgeyBwYXRoOiAndGFzay1saXN0JywgY29tcG9uZW50OiBUYXNrc0NvbXBvbmVudCB9LFxyXG4gICAgeyBwYXRoOiAnY29va2luZy12aWRlbycsIGNvbXBvbmVudDogQ29va2luZ1ZpZGVvQ29tcG9uZW50fSxcclxuXTtcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KGFwcFJvdXRlcylcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUge31cclxuIl19