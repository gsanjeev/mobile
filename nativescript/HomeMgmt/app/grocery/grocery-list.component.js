"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var SocialShare = require("nativescript-social-share");
var dialogs_1 = require("ui/dialogs");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var grocery_service_1 = require("./grocery.service");
var auth_service_1 = require("../auth/auth.service");
var GroceryListComponent = (function () {
    function GroceryListComponent(groceryService, route, auth, router, routerExtensions) {
        var _this = this;
        this.groceryService = groceryService;
        this.route = route;
        this.auth = auth;
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.newGroceryListItem = { _id: '', name: '', qty: null, unit: '', user: '', isPurchased: false, description: '' };
        this.isLoading = false;
        this.listLoaded = false;
        this.groceryService.getGroceryItems()
            .subscribe(function (groceryItems) {
            //this.groceryItems = groceryItems;  
            //console.log(groceryItems);
            _this.groceryItems = [];
            for (var i = 0; i < groceryItems.length; i++) {
                _this.groceryItems.push(groceryItems[i].name);
            }
        });
        this.groceryService.getGroceryList()
            .subscribe(function (groceryList) {
            _this.groceryList = groceryList;
            //console.log(groceryList);
            _this.listLoaded = true;
        });
    }
    GroceryListComponent.prototype.groceryItemIndexChanged = function (groceryItemPicker) {
        this.groceryItemSelectedIndex = groceryItemPicker.selectedIndex;
        console.log("groceryItemPicker selection: " + groceryItemPicker.selectedIndex);
    };
    GroceryListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            return _this.selectedId = params['id'];
        });
    };
    GroceryListComponent.prototype.isSelected = function (groceryListItem) {
        return groceryListItem._id === this.selectedId;
    };
    GroceryListComponent.prototype.addGroceryListItem = function (source) {
        var _this = this;
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
            .subscribe(function (groceryListItem) {
            _this.groceryList.push(groceryListItem);
        });
    };
    GroceryListComponent.prototype.deleteGroceryListItem = function (_id) {
        var groceryList = this.groceryList;
        this.groceryService.deleteGroceryListItem(_id)
            .subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < groceryList.length; i++) {
                    if (groceryList[i]._id == _id) {
                        groceryList.splice(i, 1);
                    }
                }
            }
        });
    };
    GroceryListComponent.prototype.openGroceryItemPicker = function () {
        console.log("openGroceryItemPicker()");
        var groceryItemPicker = this.groceryItemPicker.nativeElement;
        var groceryItemPickerLabel = this.groceryItemPickerLabel.nativeElement;
        console.log("openGroceryItemPicker()");
        groceryItemPicker.visibility = "visible";
        groceryItemPicker.focus();
        groceryItemPickerLabel.visibility = "collapsed";
        //let picker = page.getViewById('picker');
        groceryItemPicker.animate({
            translate: { x: 0, y: 0 },
            duration: 300
        });
    };
    GroceryListComponent.prototype.onSelect = function (groceryListItem) {
        this.router.navigate(['/grocery-item', groceryListItem._id]);
    };
    GroceryListComponent.prototype.showMenu = function () {
        var _this = this;
        dialogs_1.action({
            message: "What would you like to do?",
            actions: ["Share", "Log Off"],
            cancelButtonText: "Cancel"
        }).then(function (result) {
            if (result === "Share") {
                _this.share();
            }
            else if (result === "Log Off") {
                _this.logoff();
            }
        });
    };
    GroceryListComponent.prototype.share = function () {
        var list = [];
        for (var i = 0, size = this.groceryList.length; i < size; i++) {
            list.push(this.groceryList[i].name + ", " + this.groceryList[i].qty);
        }
        console.log("List for Sharing: " + list.join(",".trim()));
        SocialShare.shareText(list.join(", ").trim());
    };
    GroceryListComponent.prototype.logoff = function () {
        this.auth.logout();
        this.router.navigate(["/home"]);
    };
    GroceryListComponent.prototype.imageSource = function (task) {
        return task.isDone ? "res://checked" : "res://unchecked";
    };
    GroceryListComponent.prototype.handleAndroidFocus = function (textField, container) {
        /*        console.log('***************:' );
                console.log('container:' + container);
                console.log('container.android' + container.android);
                if ( container.android ) {
                    container.android.setFocusableInTouchMode( true );
                    container.android.setFocusable( true );
                    textField.android.clearFocus();
                }*/
    };
    GroceryListComponent.prototype.showActivityIndicator = function () {
        this.isLoading = true;
    };
    GroceryListComponent.prototype.hideActivityIndicator = function () {
        this.isLoading = false;
    };
    GroceryListComponent.prototype.onNavBtnTap = function () {
        //alert("Go Back");
        this.routerExtensions.back();
        //this.routerExtensions.backToPreviousPage(); \
    };
    return GroceryListComponent;
}());
__decorate([
    core_1.ViewChild("groceryItemPicker"),
    __metadata("design:type", core_1.ElementRef)
], GroceryListComponent.prototype, "groceryItemPicker", void 0);
__decorate([
    core_1.ViewChild("groceryItemPickerLabel"),
    __metadata("design:type", core_1.ElementRef)
], GroceryListComponent.prototype, "groceryItemPickerLabel", void 0);
GroceryListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './grocery-list.component.html',
        styleUrls: ["./grocery-list-common.css"]
    }),
    __metadata("design:paramtypes", [grocery_service_1.GroceryService,
        router_1.ActivatedRoute, auth_service_1.Auth,
        router_1.Router, router_extensions_1.RouterExtensions])
], GroceryListComponent);
exports.GroceryListComponent = GroceryListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvY2VyeS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdyb2NlcnktbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF3RjtBQUN4RiwwQ0FBaUU7QUFDakUsdURBQXlEO0FBQ3pELHNDQUFvQztBQUdwQyxtRkFBaUY7QUFFakYscURBQWlEO0FBR2pELHFEQUE0QztBQU81QyxJQUFhLG9CQUFvQjtJQWU3Qiw4QkFBb0IsY0FBNkIsRUFDakMsS0FBcUIsRUFBUyxJQUFVLEVBQ3hDLE1BQWMsRUFBVSxnQkFBa0M7UUFGMUUsaUJBd0JDO1FBeEJtQixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUNqQyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFkMUUsdUJBQWtCLEdBQUUsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBQyxFQUFFLEVBQUUsR0FBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsV0FBVyxFQUFFLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLENBQUM7UUFNcEcsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBV2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUU7YUFDcEMsU0FBUyxDQUFDLFVBQUEsWUFBWTtZQUNuQixxQ0FBcUM7WUFDckMsNEJBQTRCO1lBQzVCLEtBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBRXZCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMzQyxLQUFJ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LElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFDRCxvREFBcUIsR0FBckI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNJLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsK0NBQStDO0lBQ25ELENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUFuS0QsSUFtS0M7QUF2SnFDO0lBQWpDLGdCQUFTLENBQUUsbUJBQW1CLENBQUU7OEJBQW9CLGlCQUFVOytEQUFDO0FBQ3pCO0lBQXRDLGdCQUFTLENBQUUsd0JBQXdCLENBQUU7OEJBQXlCLGlCQUFVO29FQUFDO0FBYmpFLG9CQUFvQjtJQUxoQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSwrQkFBK0I7UUFDNUMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7S0FDM0MsQ0FBQztxQ0FnQnFDLGdDQUFjO1FBQzFCLHVCQUFjLEVBQWUsbUJBQUk7UUFDaEMsZUFBTSxFQUE0QixvQ0FBZ0I7R0FqQmpFLG9CQUFvQixDQW1LaEM7QUFuS1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQsIE91dHB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCAqIGFzIFNvY2lhbFNoYXJlIGZyb20gXCJuYXRpdmVzY3JpcHQtc29jaWFsLXNoYXJlXCI7XHJcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IExpc3RQaWNrZXIgfSBmcm9tIFwidWkvbGlzdC1waWNrZXJcIjtcclxuaW1wb3J0IHsgTGFiZWwgfSBmcm9tIFwidWkvbGFiZWxcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9ucyc7XHJcblxyXG5pbXBvcnQge0dyb2NlcnlTZXJ2aWNlfSBmcm9tICcuL2dyb2Nlcnkuc2VydmljZSc7XHJcbmltcG9ydCB7R3JvY2VyeUl0ZW19IGZyb20gJy4vZ3JvY2VyeS1pdGVtJztcclxuXHJcbmltcG9ydCB7IEF1dGggfSBmcm9tICcuLi9hdXRoL2F1dGguc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZ3JvY2VyeS1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogW1wiLi9ncm9jZXJ5LWxpc3QtY29tbW9uLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JvY2VyeUxpc3RDb21wb25lbnQgeyBcclxuICAgIC8vZ3JvY2VyeUl0ZW1zOiBHcm9jZXJ5SXRlbVtdO1xyXG4gICAgZ3JvY2VyeUxpc3Q6IEdyb2NlcnlJdGVtW107XHJcbiAgICBuZXdHcm9jZXJ5TGlzdEl0ZW09IHtfaWQ6ICcnLCBuYW1lOicnLCBxdHk6bnVsbCwgdW5pdDonJyx1c2VyOicnLGlzUHVyY2hhc2VkOiBmYWxzZSxkZXNjcmlwdGlvbjonJ307XHJcbiAgICBwcml2YXRlIHNlbGVjdGVkSWQ6IHN0cmluZztcclxuICAgIFxyXG4gICAgcHVibGljIGdyb2NlcnlJdGVtczogQXJyYXk8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBncm9jZXJ5SXRlbVNlbGVjdGVkSW5kZXg6IG51bWJlcjsgIFxyXG4gICAgXHJcbiAgICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgIGxpc3RMb2FkZWQgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgQFZpZXdDaGlsZCggXCJncm9jZXJ5SXRlbVBpY2tlclwiICkgZ3JvY2VyeUl0ZW1QaWNrZXI6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCBcImdyb2NlcnlJdGVtUGlja2VyTGFiZWxcIiApIGdyb2NlcnlJdGVtUGlja2VyTGFiZWw6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBncm9jZXJ5U2VydmljZTpHcm9jZXJ5U2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUscHJpdmF0ZSBhdXRoOiBBdXRoLFxyXG4gICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMgICAgICAgIFxyXG4gICAgXHJcbiAgICApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ncm9jZXJ5U2VydmljZS5nZXRHcm9jZXJ5SXRlbXMoKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoZ3JvY2VyeUl0ZW1zID0+IHtcclxuICAgICAgICAgICAgLy90aGlzLmdyb2NlcnlJdGVtcyA9IGdyb2NlcnlJdGVtczsgIFxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGdyb2NlcnlJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvY2VyeUl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb2NlcnlJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm9jZXJ5SXRlbXMucHVzaChncm9jZXJ5SXRlbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmdyb2NlcnlTZXJ2aWNlLmdldEdyb2NlcnlMaXN0KClcclxuICAgICAgICAuc3Vic2NyaWJlKGdyb2NlcnlMaXN0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ncm9jZXJ5TGlzdCA9IGdyb2NlcnlMaXN0OyBcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhncm9jZXJ5TGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBncm9jZXJ5SXRlbUluZGV4Q2hhbmdlZChncm9jZXJ5SXRlbVBpY2tlcikge1xyXG4gICAgICAgIHRoaXMuZ3JvY2VyeUl0ZW1TZWxlY3RlZEluZGV4ID0gZ3JvY2VyeUl0ZW1QaWNrZXIuc2VsZWN0ZWRJbmRleDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdyb2NlcnlJdGVtUGlja2VyIHNlbGVjdGlvbjogXCIgKyBncm9jZXJ5SXRlbVBpY2tlci5zZWxlY3RlZEluZGV4KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXNcclxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKHBhcmFtcyA9PiBcclxuICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZElkID0gcGFyYW1zWydpZCddKTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIGlzU2VsZWN0ZWQoZ3JvY2VyeUxpc3RJdGVtOiBHcm9jZXJ5SXRlbSkgeyBcclxuICAgICAgICAgIHJldHVybiBncm9jZXJ5TGlzdEl0ZW0uX2lkID09PSB0aGlzLnNlbGVjdGVkSWQ7ICAgICAgICAgXHJcblxyXG4gICAgICB9XHJcbiAgICBcclxuICAgIGFkZEdyb2NlcnlMaXN0SXRlbShzb3VyY2U6YW55KSB7XHJcbiAgICAgICAgLy92YXIgdXNlclByb2ZpbGUgPSBKU09OLnBhcnNlKCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggJ3Byb2ZpbGUnICkgKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdncm9jZXJ5LWxpc3QudXNlclByb2ZpbGUnKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHVzZXJQcm9maWxlKTtcclxuICAgICAgICBjb25zb2xlLmxvZygndGhpcy5ncm9jZXJ5U2VydmljZS5nZXRVc2VyKCknICsgdGhpcy5ncm9jZXJ5U2VydmljZS5nZXRVc2VyKCkpO1xyXG4gICAgICAgIC8vZXZlbnQucHJldmVudERlZmF1bHQoKTsgICAgICAgXHJcbiAgICAgICAgdGhpcy5uZXdHcm9jZXJ5TGlzdEl0ZW0udXNlciA9IHRoaXMuZ3JvY2VyeVNlcnZpY2UuZ2V0VXNlcigpO1xyXG4gICAgICAgIHRoaXMubmV3R3JvY2VyeUxpc3RJdGVtLm5hbWUgPSB0aGlzLmdyb2NlcnlJdGVtc1t0aGlzLmdyb2NlcnlJdGVtU2VsZWN0ZWRJbmRleF07XHJcbiAgICAgICAgaWYgKHRoaXMubmV3R3JvY2VyeUxpc3RJdGVtLnF0eSA9PSBudWxsKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubmV3R3JvY2VyeUxpc3RJdGVtLnF0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JvY2VyeVNlcnZpY2UuYWRkR3JvY2VyeUxpc3RJdGVtKHRoaXMubmV3R3JvY2VyeUxpc3RJdGVtKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGdyb2NlcnlMaXN0SXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb2NlcnlMaXN0LnB1c2goZ3JvY2VyeUxpc3RJdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRlbGV0ZUdyb2NlcnlMaXN0SXRlbShfaWQ6c3RyaW5nKXtcclxuICAgICAgICB2YXIgZ3JvY2VyeUxpc3QgPSB0aGlzLmdyb2NlcnlMaXN0O1xyXG4gICAgICAgIHRoaXMuZ3JvY2VyeVNlcnZpY2UuZGVsZXRlR3JvY2VyeUxpc3RJdGVtKF9pZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubiA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZ3JvY2VyeUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZ3JvY2VyeUxpc3RbaV0uX2lkID09IF9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeUxpc3Quc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb3Blbkdyb2NlcnlJdGVtUGlja2VyKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib3Blbkdyb2NlcnlJdGVtUGlja2VyKClcIik7XHJcbiAgICAgICAgbGV0IGdyb2NlcnlJdGVtUGlja2VyOkxpc3RQaWNrZXIgPSA8TGlzdFBpY2tlcj50aGlzLmdyb2NlcnlJdGVtUGlja2VyLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGdyb2NlcnlJdGVtUGlja2VyTGFiZWw6TGFiZWwgPSA8TGFiZWw+dGhpcy5ncm9jZXJ5SXRlbVBpY2tlckxhYmVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvcGVuR3JvY2VyeUl0ZW1QaWNrZXIoKVwiKTtcclxuICAgICAgICBncm9jZXJ5SXRlbVBpY2tlci52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgZ3JvY2VyeUl0ZW1QaWNrZXIuZm9jdXMoKTtcclxuICAgICAgICBncm9jZXJ5SXRlbVBpY2tlckxhYmVsLnZpc2liaWxpdHkgPSBcImNvbGxhcHNlZFwiO1xyXG4gICAgICAgIC8vbGV0IHBpY2tlciA9IHBhZ2UuZ2V0Vmlld0J5SWQoJ3BpY2tlcicpO1xyXG4gICAgICAgIGdyb2NlcnlJdGVtUGlja2VyLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgICAgfSk7XHJcbiAgICAgfVxyXG4gICAgXHJcbiAgICBvblNlbGVjdChncm9jZXJ5TGlzdEl0ZW06R3JvY2VyeUl0ZW0pIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9ncm9jZXJ5LWl0ZW0nLCBncm9jZXJ5TGlzdEl0ZW0uX2lkXSk7XHJcbiAgICAgIH1cclxuICAgIFxyXG4gICAgc2hvd01lbnUoKSB7XHJcbiAgICAgICAgYWN0aW9uKCB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiV2hhdCB3b3VsZCB5b3UgbGlrZSB0byBkbz9cIixcclxuICAgICAgICAgICAgYWN0aW9uczogW1wiU2hhcmVcIiwgXCJMb2cgT2ZmXCJdLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXHJcbiAgICAgICAgfSkudGhlbigoIHJlc3VsdCApID0+IHtcclxuICAgICAgICAgICAgaWYgKCByZXN1bHQgPT09IFwiU2hhcmVcIiApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggcmVzdWx0ID09PSBcIkxvZyBPZmZcIiApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nb2ZmKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaGFyZSgpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IFtdO1xyXG4gICAgICAgIGZvciAoIGxldCBpID0gMCwgc2l6ZSA9IHRoaXMuZ3JvY2VyeUxpc3QubGVuZ3RoOyBpIDwgc2l6ZTsgaSsrICkge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goIHRoaXMuZ3JvY2VyeUxpc3RbaV0ubmFtZSArIFwiLCBcIiArIHRoaXMuZ3JvY2VyeUxpc3RbaV0ucXR5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coIFwiTGlzdCBmb3IgU2hhcmluZzogXCIgKyBsaXN0LmpvaW4oIFwiLFwiLnRyaW0oKSApICk7XHJcbiAgICAgICAgU29jaWFsU2hhcmUuc2hhcmVUZXh0KCBsaXN0LmpvaW4oIFwiLCBcIiApLnRyaW0oKSApO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ29mZigpIHtcclxuICAgICAgICB0aGlzLmF1dGgubG9nb3V0KCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoIFtcIi9ob21lXCJdICk7XHJcbiAgICB9XHJcblxyXG4gICAgaW1hZ2VTb3VyY2UoIHRhc2sgKSB7XHJcbiAgICAgICAgcmV0dXJuIHRhc2suaXNEb25lID8gXCJyZXM6Ly9jaGVja2VkXCIgOiBcInJlczovL3VuY2hlY2tlZFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUFuZHJvaWRGb2N1cyggdGV4dEZpZWxkLCBjb250YWluZXIgKSB7XHJcbi8qICAgICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqOicgKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnY29udGFpbmVyOicgKyBjb250YWluZXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjb250YWluZXIuYW5kcm9pZCcgKyBjb250YWluZXIuYW5kcm9pZCk7XHJcbiAgICAgICAgaWYgKCBjb250YWluZXIuYW5kcm9pZCApIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFuZHJvaWQuc2V0Rm9jdXNhYmxlSW5Ub3VjaE1vZGUoIHRydWUgKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFuZHJvaWQuc2V0Rm9jdXNhYmxlKCB0cnVlICk7XHJcbiAgICAgICAgICAgIHRleHRGaWVsZC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcclxuICAgICAgICB9Ki9cclxuICAgIH1cclxuXHJcbiAgICBzaG93QWN0aXZpdHlJbmRpY2F0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaGlkZUFjdGl2aXR5SW5kaWNhdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uTmF2QnRuVGFwKCkge1xyXG4gICAgICAgIC8vYWxlcnQoXCJHbyBCYWNrXCIpO1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICAgICAgLy90aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7IFxcXHJcbiAgICB9XHJcbn1cclxuIl19