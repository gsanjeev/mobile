"use strict";
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var grocery_service_1 = require("./grocery.service");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var GroceryItemDetailComponent = (function () {
    function GroceryItemDetailComponent(route, router, groceryService, routerExtensions) {
        this.route = route;
        this.router = router;
        this.groceryService = groceryService;
        this.routerExtensions = routerExtensions;
        this.groceryListItem = { _id: '', name: '', qty: 0, unit: '', user: '', isPurchased: false, description: '' };
    }
    Object.defineProperty(GroceryItemDetailComponent.prototype, "routeAnimation", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroceryItemDetailComponent.prototype, "display", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroceryItemDetailComponent.prototype, "position", {
        get: function () {
            return 'absolute';
        },
        enumerable: true,
        configurable: true
    });
    GroceryItemDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.groceryService.getGroceryListItem(params['id']); })
            .subscribe(function (groceryListItem) {
            _this.groceryListItem = groceryListItem;
            console.log('After retriving:');
            console.log(JSON.stringify(groceryListItem));
            console.log(_this.groceryListItem);
        });
    };
    GroceryItemDetailComponent.prototype.gotoGroceryList = function () {
        var groceryListItemId = this.groceryListItem ? this.groceryListItem._id : null;
        // Pass along the groceryListItemId if available
        // so that the GroceryList component can select that GroceryListItem.
        this.router.navigate(['/grocery-list', { id: groceryListItemId, foo: 'foo' }]);
    };
    GroceryItemDetailComponent.prototype.updateGroceryListItem = function () {
        var _this = this;
        var updGroceryListItem = {
            name: this.groceryListItem.name,
            description: this.groceryListItem.description,
            qty: this.groceryListItem.qty,
            unit: this.groceryListItem.unit,
            user: this.groceryListItem.user,
            id: this.groceryListItem._id,
            isPurchased: this.groceryListItem.isPurchased
        };
        this.groceryService.updateGroceryListItem(this.groceryListItem)
            .subscribe(function (data) {
            console.log(_this.groceryListItem);
            console.log(data);
            _this.gotoGroceryList();
        });
    };
    GroceryItemDetailComponent.prototype.onNavBtnTap = function () {
        //alert("Go Back");
        this.routerExtensions.back();
        //this.routerExtensions.backToPreviousPage(); \
    };
    return GroceryItemDetailComponent;
}());
__decorate([
    core_1.HostBinding('@routeAnimation'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], GroceryItemDetailComponent.prototype, "routeAnimation", null);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], GroceryItemDetailComponent.prototype, "display", null);
__decorate([
    core_1.HostBinding('style.position'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], GroceryItemDetailComponent.prototype, "position", null);
GroceryItemDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'grocery-item-detail.component.html',
        animations: [
            core_1.trigger('routeAnimation', [
                core_1.state('*', core_1.style({
                    opacity: 1,
                    transform: 'translateX(0)'
                })),
                core_1.transition(':enter', [
                    core_1.style({
                        opacity: 0,
                        transform: 'translateX(-100%)'
                    }),
                    core_1.animate('0.2s ease-in')
                ]),
                core_1.transition(':leave', [
                    core_1.animate('0.5s ease-out', core_1.style({
                        opacity: 0,
                        transform: 'translateY(100%)'
                    }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        grocery_service_1.GroceryService, router_extensions_1.RouterExtensions])
], GroceryItemDetailComponent);
exports.GroceryItemDetailComponent = GroceryItemDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvY2VyeS1pdGVtLWRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncm9jZXJ5LWl0ZW0tZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUNBQXFDO0FBQ3JDLHNDQUU2QztBQUM3QywwQ0FBaUU7QUFHakUscURBQW9EO0FBQ3BELG1GQUFpRjtBQTZCakYsSUFBYSwwQkFBMEI7SUFnQnJDLG9DQUNVLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxjQUE4QixFQUFVLGdCQUFrQztRQUYxRSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQU5wRixvQkFBZSxHQUFnQixFQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsQ0FBQztJQVM1RyxDQUFDO0lBckIrQixzQkFBSSxzREFBYzthQUFsQjtZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFFNkIsc0JBQUksK0NBQU87YUFBWDtZQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBRThCLHNCQUFJLGdEQUFRO2FBQVo7WUFDN0IsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQWFELDZDQUFRLEdBQVI7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTthQUVoQixTQUFTLENBQUMsVUFBQyxNQUFjLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLE1BQU0s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QUssQ0FBQzt3QkFDN0IsT0FBTyxFQUFFLENBQUM7d0JBQ1YsU0FBUyxFQUFFLGtCQUFrQjtxQkFDOUIsQ0FBQyxDQUFDO2lCQUNKLENBQUM7YUFDSCxDQUFDO1NBQ0g7S0FDRixDQUFDO3FDQWtCaUIsdUJBQWM7UUFDYixlQUFNO1FBQ0UsZ0NBQWMsRUFBNEIsb0NBQWdCO0dBbkJ6RSwwQkFBMEIsQ0FvRXRDO0FBcEVZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEhvc3RCaW5kaW5nLFxyXG4gICAgICAgICB0cmlnZ2VyLCB0cmFuc2l0aW9uLCBhbmltYXRlLFxyXG4gICAgICAgICBzdHlsZSwgc3RhdGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IEdyb2NlcnlJdGVtIH0gIGZyb20gJy4vZ3JvY2VyeS1pdGVtJztcclxuaW1wb3J0IHsgR3JvY2VyeVNlcnZpY2UgfSAgZnJvbSAnLi9ncm9jZXJ5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyL3JvdXRlci1leHRlbnNpb25zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOidncm9jZXJ5LWl0ZW0tZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ3JvdXRlQW5pbWF0aW9uJywgW1xyXG4gICAgICBzdGF0ZSgnKicsXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknXHJcbiAgICAgICAgfSlcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC0xMDAlKSdcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKCcwLjJzIGVhc2UtaW4nKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1vdXQnLCBzdHlsZSh7XHJcbiAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgxMDAlKSdcclxuICAgICAgICB9KSlcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JvY2VyeUl0ZW1EZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBIb3N0QmluZGluZygnQHJvdXRlQW5pbWF0aW9uJykgZ2V0IHJvdXRlQW5pbWF0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmRpc3BsYXknKSBnZXQgZGlzcGxheSgpIHtcclxuICAgIHJldHVybiAnYmxvY2snO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wb3NpdGlvbicpIGdldCBwb3NpdGlvbigpIHtcclxuICAgIHJldHVybiAnYWJzb2x1dGUnO1xyXG4gIH1cclxuXHJcbiAgZ3JvY2VyeUxpc3RJdGVtOiBHcm9jZXJ5SXRlbSA9IHtfaWQ6ICcnLCBuYW1lOicnLCBxdHk6MCwgdW5pdDonJyx1c2VyOicnLGlzUHVyY2hhc2VkOiBmYWxzZSxkZXNjcmlwdGlvbjonJ307XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgZ3JvY2VyeVNlcnZpY2U6IEdyb2NlcnlTZXJ2aWNlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnNcclxuICApIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgICAgdGhpcy5yb3V0ZS5wYXJhbXNcclxuICAgICAgLy8gKCspIGNvbnZlcnRzIHN0cmluZyAnaWQnIHRvIGEgbnVtYmVyXHJcbiAgICAgIC5zd2l0Y2hNYXAoKHBhcmFtczogUGFyYW1zKSA9PiB0aGlzLmdyb2NlcnlTZXJ2aWNlLmdldEdyb2NlcnlMaXN0SXRlbShwYXJhbXNbJ2lkJ10pKVxyXG4gICAgICAuc3Vic2NyaWJlKChncm9jZXJ5TGlzdEl0ZW06IEdyb2NlcnlJdGVtKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmdyb2NlcnlMaXN0SXRlbSA9IGdyb2NlcnlMaXN0SXRlbVxyXG4gICAgICAgICAgY29uc29sZS5sb2coJ0FmdGVyIHJldHJpdmluZzonKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGdyb2NlcnlMaXN0SXRlbSkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5ncm9jZXJ5TGlzdEl0ZW0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBnb3RvR3JvY2VyeUxpc3QoKSB7XHJcbiAgICBsZXQgZ3JvY2VyeUxpc3RJdGVtSWQgPSB0aGlzLmdyb2NlcnlMaXN0SXRlbSA/IHRoaXMuZ3JvY2VyeUxpc3RJdGVtLl9pZCA6IG51bGw7XHJcbiAgICAvLyBQYXNzIGFsb25nIHRoZSBncm9jZXJ5TGlzdEl0ZW1JZCBpZiBhdmFpbGFibGVcclxuICAgIC8vIHNvIHRoYXQgdGhlIEdyb2NlcnlMaXN0IGNvbXBvbmVudCBjYW4gc2VsZWN0IHRoYXQgR3JvY2VyeUxpc3RJdGVtLlxyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZ3JvY2VyeS1saXN0JywgeyBpZDogZ3JvY2VyeUxpc3RJdGVtSWQsIGZvbzogJ2ZvbycgfV0pO1xyXG4gIH1cclxuICBcclxuXHJcbiAgdXBkYXRlR3JvY2VyeUxpc3RJdGVtKCl7XHJcbiAgICAgIHZhciB1cGRHcm9jZXJ5TGlzdEl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy5ncm9jZXJ5TGlzdEl0ZW0ubmFtZSxcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5ncm9jZXJ5TGlzdEl0ZW0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgcXR5OiB0aGlzLmdyb2NlcnlMaXN0SXRlbS5xdHksXHJcbiAgICAgICAgICAgICAgdW5pdDogdGhpcy5ncm9jZXJ5TGlzdEl0ZW0udW5pdCxcclxuICAgICAgICAgICAgICB1c2VyOiB0aGlzLmdyb2NlcnlMaXN0SXRlbS51c2VyLFxyXG4gICAgICAgICAgICAgIGlkOnRoaXMuZ3JvY2VyeUxpc3RJdGVtLl9pZCxcclxuICAgICAgICAgICAgICBpc1B1cmNoYXNlZDogdGhpcy5ncm9jZXJ5TGlzdEl0ZW0uaXNQdXJjaGFzZWRcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5ncm9jZXJ5U2VydmljZS51cGRhdGVHcm9jZXJ5TGlzdEl0ZW0odGhpcy5ncm9jZXJ5TGlzdEl0ZW0pXHJcbiAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvY2VyeUxpc3RJdGVtKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICB0aGlzLmdvdG9Hcm9jZXJ5TGlzdCgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgfVxyXG4gIFxyXG4gIG9uTmF2QnRuVGFwKCkge1xyXG4gICAgICAvL2FsZXJ0KFwiR28gQmFja1wiKTtcclxuICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgICAgLy90aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7IFxcXHJcbiAgfVxyXG59XHJcblxyXG4iXX0=