"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var cooking_video_service_1 = require("./cooking-video.service");
require("rxjs/Rx");
var SocialShare = require("nativescript-social-share");
var dialogs_1 = require("ui/dialogs");
var router_1 = require("@angular/router");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var auth_service_1 = require("../auth/auth.service");
var utilityModule = require("utils/utils");
var CookingVideoComponent = (function () {
    function CookingVideoComponent(videoService, http, router, auth, routerExtensions) {
        //observable of results
        // this.seachResults =
        //input value change observable
        //let textField = <TextField>this.taskTextField.nativeElement;
        this.videoService = videoService;
        this.http = http;
        this.router = router;
        this.auth = auth;
        this.routerExtensions = routerExtensions;
        this.isLoading = false;
        this.listLoaded = false;
        //selecteVideoId: any;
        //search = new FormControl();
        this.search = "";
        //@ViewChild( "searchTextField" ) searchTextField: ElementRef;
        //seachResults: Observable<any>;
        this.seachResults = [];
        this.selectedVideoId = 'gtS84etMrKA';
        /*            this.search.valueChanges
                        .debounceTime( 200 ) //debounce for 200ms
                        .switchMap( query => videoService.search( query ) )
                        .subscribe(result => {
                        this.seachResults = result;
                        this.listLoaded = true;
                    }); */
    }
    CookingVideoComponent.prototype.onSearchChanged = function (event) {
        var _this = this;
        //this.listLoaded = false;
        //console.log(event.value);
        //console.log('onSearchChanged:' + this.search);
        setTimeout(function () {
            //console.log('setTimeout:' + this.search);
            _this.searchVideo(_this.search, event);
        }, 200);
    };
    CookingVideoComponent.prototype.searchVideo = function (query, event) {
        var _this = this;
        //console.log('searchVideo:' + query);
        this.videoService.search(query)
            .subscribe(function (result) {
            _this.seachResults = result;
            //this.listLoaded = true;
            _this.onSearchBarLoaded(event);
        });
    };
    CookingVideoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.videoService.search("sanjeev kapoor").subscribe(function (result) {
            _this.seachResults = result;
            _this.listLoaded = true;
            //console.log( JSON.stringify(this.seachResults) ); 
        });
    };
    CookingVideoComponent.prototype.openCookingVideo = function (videoId) {
        utilityModule.openUrl("https://youtu.be/" + videoId);
        console.log("https://youtu.be/" + videoId);
    };
    CookingVideoComponent.prototype.showMenu = function () {
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
    CookingVideoComponent.prototype.share = function () {
        var list = [];
        for (var i = 0, size = this.seachResults.length; i < size; i++) {
            list.push("https://youtu.be/" + this.seachResults[i].id.videoId + " , ");
        }
        console.log("List for Sharing: " + list.join(",".trim()));
        SocialShare.shareText(list.join(", ").trim());
    };
    CookingVideoComponent.prototype.logoff = function () {
        this.auth.logout();
        this.router.navigate(["/home"]);
    };
    CookingVideoComponent.prototype.imageSource = function (task) {
        return task.isDone ? "res://checked" : "res://unchecked";
    };
    CookingVideoComponent.prototype.handleAndroidFocus = function (textField, container) {
        /*        console.log('***************:' );
                console.log('container:' + container);
                console.log('container.android' + container.android);
                if ( container.android ) {
                    container.android.setFocusableInTouchMode( true );
                    container.android.setFocusable( true );
                    textField.android.clearFocus();
                }*/
    };
    CookingVideoComponent.prototype.showActivityIndicator = function () {
        this.isLoading = true;
    };
    CookingVideoComponent.prototype.hideActivityIndicator = function () {
        this.isLoading = false;
    };
    CookingVideoComponent.prototype.onSearchBarLoaded = function (event) {
        if (event.object.android) {
            event.object.dismissSoftInput();
            event.object.android.clearFocus();
            event.object.android.setFocusable(false);
        }
    };
    CookingVideoComponent.prototype.onClear = function (event) {
        this.search = "";
        this.onSearchBarLoaded(event);
    };
    CookingVideoComponent.prototype.onNavBtnTap = function () {
        //alert("Go Back");
        this.routerExtensions.back();
        //this.routerExtensions.backToPreviousPage(); \
    };
    return CookingVideoComponent;
}());
CookingVideoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './cooking-video.component.html'
    }),
    __metadata("design:paramtypes", [cooking_video_service_1.CookingVideoService, http_1.Http,
        router_1.Router, auth_service_1.Auth, router_extensions_1.RouterExtensions])
], CookingVideoComponent);
exports.CookingVideoComponent = CookingVideoComponent;
var VideoFilter = (function () {
    function VideoFilter() {
    }
    VideoFilter.prototype.transform = function (seachResults) {
        return seachResults.filter(function (video) {
            if (!video.id.videoId) {
                return false;
            }
            return true;
        });
    };
    return VideoFilter;
}());
VideoFilter = __decorate([
    core_1.Pipe({
        name: 'videoFilter',
    })
], VideoFilter);
exports.VideoFilter = VideoFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2luZy12aWRlby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb29raW5nLXZpZGVvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW9KO0FBRXBKLHNDQUFtQztBQUNuQyxpRUFBOEQ7QUFDOUQsbUJBQWlCO0FBRWpCLHVEQUF5RDtBQUN6RCxzQ0FBb0M7QUFDcEMsMENBQWlFO0FBQ2pFLG1GQUFpRjtBQUVqRixxREFBNEM7QUFDNUMsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBTTNDLElBQWEscUJBQXFCO0lBYTlCLCtCQUFxQixZQUFpQyxFQUFVLElBQVMsRUFDekQsTUFBYyxFQUFVLElBQVUsRUFBVSxnQkFBa0M7UUFFMUYsdUJBQXVCO1FBQ3hCLHNCQUFzQjtRQUNqQiwrQkFBK0I7UUFDbkMsOERBQThEO1FBTjdDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQUs7UUFDekQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBWDlGLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixzQkFBc0I7UUFDdEIsNkJBQTZCO1FBQzdCLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFDbkIsOERBQThEO1FBQzlELGdDQUFnQztRQUNoQyxpQkFBWSxHQUFTLEVBQUUsQ0FBQztRQUNoQixvQkFBZSxHQUFXLGFBQWEsQ0FBQztRQVVwRDs7Ozs7OzBCQU1rQjtJQUNkLENBQUM7SUFFRCwrQ0FBZSxHQUFmLFVBQWdCLEtBQUs7UUFBckIsaUJBT0M7UUFORywwQkFBMEI7UUFDMUIsMkJBQTJCO1FBQzNCLGdEQUFnRDtRQUNoRCxVQUFVLENBQUM7WUFDUCwyQ0FBMkM7WUFDM0MsS0FBSSxDQUFDLFdBQVcsQ0FB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Q0FBQztJQVZDLCtCQUFTLEdBQVQsVUFBVSxZQUFtQjtRQUN6QixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUs7WUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFFLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHSCxrQkFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBWFksV0FBVztJQUp6QixXQUFJLENBQUM7UUFDRixJQUFJLEVBQUUsYUFBYTtLQUVwQixDQUFDO0dBQ1csV0FBVyxDQVd2QjtBQVhZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFBpcGUsIFBpcGVUcmFuc2Zvcm0sIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHtIdHRwfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IENvb2tpbmdWaWRlb1NlcnZpY2UgfSBmcm9tICcuL2Nvb2tpbmctdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgJ3J4anMvUngnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgKiBhcyBTb2NpYWxTaGFyZSBmcm9tIFwibmF0aXZlc2NyaXB0LXNvY2lhbC1zaGFyZVwiO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyL3JvdXRlci1leHRlbnNpb25zJztcblxuaW1wb3J0IHsgQXV0aCB9IGZyb20gJy4uL2F1dGgvYXV0aC5zZXJ2aWNlJztcbnZhciB1dGlsaXR5TW9kdWxlID0gcmVxdWlyZShcInV0aWxzL3V0aWxzXCIpO1xuXG5AQ29tcG9uZW50KCB7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29va2luZy12aWRlby5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ29va2luZ1ZpZGVvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIFxuICAgIGlzTG9hZGluZyA9IGZhbHNlO1xuICAgIGxpc3RMb2FkZWQgPSBmYWxzZTtcbiAgICAvL3NlbGVjdGVWaWRlb0lkOiBhbnk7XG4gICAgLy9zZWFyY2ggPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICBzZWFyY2g6c3RyaW5nID0gXCJcIjtcbiAgICAvL0BWaWV3Q2hpbGQoIFwic2VhcmNoVGV4dEZpZWxkXCIgKSBzZWFyY2hUZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG4gICAgLy9zZWFjaFJlc3VsdHM6IE9ic2VydmFibGU8YW55PjtcbiAgICBzZWFjaFJlc3VsdHM6IGFueVtdID1bXTtcbiAgICBwcml2YXRlIHNlbGVjdGVkVmlkZW9JZDogc3RyaW5nID0gJ2d0Uzg0ZXRNcktBJztcblxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIHZpZGVvU2VydmljZTogQ29va2luZ1ZpZGVvU2VydmljZSwgcHJpdmF0ZSBodHRwOkh0dHAsIFxuICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoOiBBdXRoLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAgICBcbiAgICAgICAgLy9vYnNlcnZhYmxlIG9mIHJlc3VsdHNcbiAgICAgICAvLyB0aGlzLnNlYWNoUmVzdWx0cyA9XG4gICAgICAgICAgICAvL2lucHV0IHZhbHVlIGNoYW5nZSBvYnNlcnZhYmxlXG4gICAgICAgIC8vbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy50YXNrVGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIFxuLyogICAgICAgICAgICB0aGlzLnNlYXJjaC52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgICAgICAuZGVib3VuY2VUaW1lKCAyMDAgKSAvL2RlYm91bmNlIGZvciAyMDBtc1xuICAgICAgICAgICAgICAgIC5zd2l0Y2hNYXAoIHF1ZXJ5ID0+IHZpZGVvU2VydmljZS5zZWFyY2goIHF1ZXJ5ICkgKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYWNoUmVzdWx0cyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7ICovICAgICAgICAgICAgICAgICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBvblNlYXJjaENoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgLy90aGlzLmxpc3RMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhldmVudC52YWx1ZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ29uU2VhcmNoQ2hhbmdlZDonICsgdGhpcy5zZWFyY2gpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3NldFRpbWVvdXQ6JyArIHRoaXMuc2VhcmNoKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVmlkZW8odGhpcy5zZWFyY2gsIGV2ZW50KX0sIDIwMCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHNlYXJjaFZpZGVvKHF1ZXJ5OnN0cmluZywgZXZlbnQ6YW55KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3NlYXJjaFZpZGVvOicgKyBxdWVyeSk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvU2VydmljZS5zZWFyY2goIHF1ZXJ5ICkgXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFjaFJlc3VsdHMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgLy90aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMub25TZWFyY2hCYXJMb2FkZWQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudmlkZW9TZXJ2aWNlLnNlYXJjaCggXCJzYW5qZWV2IGthcG9vclwiICkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYWNoUmVzdWx0cyA9IHJlc3VsdDtcbiAgICAgICAgICAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlYWNoUmVzdWx0cykgKTsgXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBvcGVuQ29va2luZ1ZpZGVvKHZpZGVvSWQ6c3RyaW5nKSB7XG4gICAgICAgIHV0aWxpdHlNb2R1bGUub3BlblVybChcImh0dHBzOi8veW91dHUuYmUvXCIrIHZpZGVvSWQpO1xuICAgICAgICBjb25zb2xlLmxvZyggXCJodHRwczovL3lvdXR1LmJlL1wiKyB2aWRlb0lkICk7IFxuICAgIH1cbiAgICBcbiAgICBzaG93TWVudSgpIHtcbiAgICAgICAgYWN0aW9uKCB7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIldoYXQgd291bGQgeW91IGxpa2UgdG8gZG8/XCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJTaGFyZVwiLCBcIkxvZyBPZmZcIl0sXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXG4gICAgICAgIH0pLnRoZW4oKCByZXN1bHQgKSA9PiB7XG4gICAgICAgICAgICBpZiAoIHJlc3VsdCA9PT0gXCJTaGFyZVwiICkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHJlc3VsdCA9PT0gXCJMb2cgT2ZmXCIgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dvZmYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hhcmUoKSB7XG4gICAgICAgIGxldCBsaXN0ID0gW107XG4gICAgICAgIGZvciAoIGxldCBpID0gMCwgc2l6ZSA9IHRoaXMuc2VhY2hSZXN1bHRzLmxlbmd0aDsgaSA8IHNpemU7IGkrKyApIHtcbiAgICAgICAgICAgIGxpc3QucHVzaCggXCJodHRwczovL3lvdXR1LmJlL1wiICsgdGhpcy5zZWFjaFJlc3VsdHNbaV0uaWQudmlkZW9JZCArIFwiICwgXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCBcIkxpc3QgZm9yIFNoYXJpbmc6IFwiICsgbGlzdC5qb2luKCBcIixcIi50cmltKCkgKSApO1xuICAgICAgICBTb2NpYWxTaGFyZS5zaGFyZVRleHQoIGxpc3Quam9pbiggXCIsIFwiICkudHJpbSgpICk7XG4gICAgfVxuXG4gICAgbG9nb2ZmKCkge1xuICAgICAgICB0aGlzLmF1dGgubG9nb3V0KCk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKCBbXCIvaG9tZVwiXSApO1xuICAgIH1cblxuICAgIGltYWdlU291cmNlKCB0YXNrICkge1xuICAgICAgICByZXR1cm4gdGFzay5pc0RvbmUgPyBcInJlczovL2NoZWNrZWRcIiA6IFwicmVzOi8vdW5jaGVja2VkXCI7XG4gICAgfVxuXG4gICAgaGFuZGxlQW5kcm9pZEZvY3VzKCB0ZXh0RmllbGQsIGNvbnRhaW5lciApIHtcbi8qICAgICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqOicgKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2NvbnRhaW5lcjonICsgY29udGFpbmVyKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2NvbnRhaW5lci5hbmRyb2lkJyArIGNvbnRhaW5lci5hbmRyb2lkKTtcbiAgICAgICAgaWYgKCBjb250YWluZXIuYW5kcm9pZCApIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hbmRyb2lkLnNldEZvY3VzYWJsZUluVG91Y2hNb2RlKCB0cnVlICk7XG4gICAgICAgICAgICBjb250YWluZXIuYW5kcm9pZC5zZXRGb2N1c2FibGUoIHRydWUgKTtcbiAgICAgICAgICAgIHRleHRGaWVsZC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgfSovXG4gICAgfVxuXG4gICAgc2hvd0FjdGl2aXR5SW5kaWNhdG9yKCkge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgfVxuICAgIGhpZGVBY3Rpdml0eUluZGljYXRvcigpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgb25TZWFyY2hCYXJMb2FkZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm9iamVjdC5hbmRyb2lkKSB7XG4gICAgICAgICAgICBldmVudC5vYmplY3QuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuc2V0Rm9jdXNhYmxlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgb25DbGVhcihldmVudCkge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IFwiXCI7XG4gICAgICAgIHRoaXMub25TZWFyY2hCYXJMb2FkZWQoZXZlbnQpO1xuICAgIH1cbiAgICBcbiAgICBvbk5hdkJ0blRhcCgpIHtcbiAgICAgICAgLy9hbGVydChcIkdvIEJhY2tcIik7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgICAgIC8vdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpOyBcXFxuICAgIH1cblxufVxuXG5AUGlwZSh7XG4gICAgbmFtZTogJ3ZpZGVvRmlsdGVyJyxcbiAgICAvL3B1cmU6IGZhbHNlXG4gIH0pXG4gIGV4cG9ydCBjbGFzcyBWaWRlb0ZpbHRlciBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybShzZWFjaFJlc3VsdHM6IGFueVtdKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHNlYWNoUmVzdWx0cy5maWx0ZXIodmlkZW8gPT4ge1xuICAgICAgICAgaWYgKCF2aWRlby5pZC52aWRlb0lkKSAge1xuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgIH0gICAgICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICB9XG4iXX0=