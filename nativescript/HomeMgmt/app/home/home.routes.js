"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./home.component");
//import { AuthGuard } from "../auth-guard.service";
var homeRoutes = [
    //{ path: "home", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "home", component: home_component_1.HomeComponent },
];
exports.homeRouting = router_1.RouterModule.forChild(homeRoutes);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMENBQXVEO0FBRXZELG1EQUFpRDtBQUVqRCxvREFBb0Q7QUFHcEQsSUFBTSxVQUFVLEdBQVc7SUFDekIsdUVBQXVFO0lBQ3ZFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsOEJBQWEsRUFBRTtDQUUzQyxDQUFDO0FBQ1csUUFBQSxXQUFXLEdBQXdCLHFCQUFZLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9ICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lLmNvbXBvbmVudFwiO1xyXG5cclxuLy9pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tIFwiLi4vYXV0aC1ndWFyZC5zZXJ2aWNlXCI7XHJcblxyXG5cclxuY29uc3QgaG9tZVJvdXRlczogUm91dGVzID0gW1xyXG4gIC8veyBwYXRoOiBcImhvbWVcIiwgY29tcG9uZW50OiBIb21lQ29tcG9uZW50LCBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZF0gfSxcclxuICB7IHBhdGg6IFwiaG9tZVwiLCBjb21wb25lbnQ6IEhvbWVDb21wb25lbnQgfSxcclxuXHJcbl07XHJcbmV4cG9ydCBjb25zdCBob21lUm91dGluZzogTW9kdWxlV2l0aFByb3ZpZGVycyA9IFJvdXRlck1vZHVsZS5mb3JDaGlsZChob21lUm91dGVzKTsiXX0=