"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dialogs_1 = require("ui/dialogs");
var page_1 = require("ui/page");
var SocialShare = require("nativescript-social-share");
var Rx_1 = require("rxjs/Rx");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
//import { isAndroid, isIOS} from "platform";
var task_service_1 = require("./task.service");
var auth_service_1 = require("../auth/auth.service");
var TasksComponent = (function () {
    function TasksComponent(taskService, auth, page, router, zone, routerExtensions) {
        var _this = this;
        this.taskService = taskService;
        this.auth = auth;
        this.page = page;
        this.router = router;
        this.zone = zone;
        this.routerExtensions = routerExtensions;
        this.returnedTasks = [];
        this.tasks = new Rx_1.BehaviorSubject([]);
        this.title = "";
        //isShowingRecent = false;
        this.isLoading = false;
        this.listLoaded = false;
        this.isAndroid = !!this.page.android;
        this.taskService.getTasks()
            .map(function (data) {
            //this.returnedTasks = data;
            //this.publishTaskUpdates();
            console.log("data: " + JSON.stringify(data));
            console.log("data: " + data.result);
            /*                data.forEach(( task ) => {
                                console.log( "data: " + JSON.stringify( task ) );
                                this.returnedTasks.push( task );
                                this.publishTaskUpdates();
                            });*/
            _this.returnedTasks = data;
            _this.publishTaskUpdates();
        })
            .subscribe(function () {
            //this.returnedTasks = tasks;
            //console.log( 'this.tasks result:' + JSON.stringify( this.returnedTasks ) );
            //this.publishTaskUpdates();
            _this.listLoaded = true;
        }, function (error) {
            console.log('getTasks error' + error);
            console.error('getTasks error' + error);
        });
    }
    TasksComponent.prototype.add = function (target) {
        // If showing recent groceries the add button should do nothing.
        /*        if (this.isShowingRecent) {
                  return;
                }*/
        console.log("Add Task: ");
        var textField = this.taskTextField.nativeElement;
        console.log("Add Task: title: " + this.title);
        if (this.title.trim() === "") {
            // If the user clicked the add button, and the textfield is empty,
            // focus the text field and return.
            console.log("Add Task: ");
            if (target === "button") {
                textField.focus();
            }
            else {
                // If the user clicked return with an empty text field show an error.
                alert("Enter a task");
            }
            return;
        }
        console.log("Add Task: ");
        // Dismiss the keyboard
        // TODO: Is it better UX to dismiss the keyboard, or leave it up so the
        // user can continue to add more tasks?
        textField.dismissSoftInput();
        console.log("Add Task: ");
        this.showActivityIndicator();
        this.createNewTask();
    };
    TasksComponent.prototype.createNewTask = function () {
        var _this = this;
        /*      createNewTask( event: any ) {
                event.preventDefault();
                var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
        */
        var newTask = {
            title: this.title,
            user: this.taskService.getUser(),
            _id: '',
            isDone: false,
        };
        console.log(newTask);
        this.taskService.addTask(newTask)
            .map(function (data) {
            _this.returnedTasks.unshift(data);
            _this.publishTaskUpdates();
        })
            .subscribe(function () {
            //this.returnedTasks.push( task );
            //this.publishTaskUpdates();
            //console.log( task );  
            _this.title = "";
            _this.hideActivityIndicator();
        }, function () {
            alert("An error occurred while adding task to your list.");
            _this.hideActivityIndicator();
        });
    };
    TasksComponent.prototype.deleteTask = function (id) {
        var _this = this;
        this.showActivityIndicator();
        this.taskService.deleteTask(id)
            .map(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < _this.returnedTasks.length; i++) {
                    if (_this.returnedTasks[i]._id == id) {
                        _this.returnedTasks.splice(i, 1);
                        _this.publishTaskUpdates();
                    }
                }
            }
            /*   TODO pass task:
             * let index = this.returnedTasks.indexOf(task);
                            this.returnedTasks.splice(index, 1);
                            this.publishTaskUpdates();*/
        })
            .subscribe(function () {
            _this.hideActivityIndicator();
        });
    };
    //    updateStatus( task: Task ) {
    //
    //        this.updateTask( task )
    //            .subscribe(() => {
    //                this.hideActivityIndicator();
    //            });
    //    }
    TasksComponent.prototype.updateStatus = function (task) {
        var _this = this;
        this.showActivityIndicator();
        var updateTask = {
            title: task.title,
            user: task.user,
            _id: task._id,
            isDone: !task.isDone
        };
        console.log("updateStatus before:" + JSON.stringify(task));
        this.taskService.updateStatus(updateTask)
            .map(function (data) {
            task.isDone = !task.isDone;
            console.log("updateStatus after:" + JSON.stringify(task));
            _this.publishTaskUpdates();
        })
            .subscribe(function () {
            _this.hideActivityIndicator();
        });
    };
    TasksComponent.prototype.publishTaskUpdates = function () {
        var _this = this;
        // Make sure all updates are published inside NgZone so that change detection is triggered if needed
        this.zone.run(function () {
            // must emit a *new* value (immutability!)
            _this.tasks.next(_this.returnedTasks.slice());
        });
    };
    TasksComponent.prototype.showMenu = function () {
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
    TasksComponent.prototype.share = function () {
        var tasks = this.tasks.value;
        var list = [];
        for (var i = 0, size = tasks.length; i < size; i++) {
            list.push(tasks[i].title);
        }
        console.log("List for Sharing: " + list.join(",".trim()));
        SocialShare.shareText(list.join(", ").trim());
    };
    TasksComponent.prototype.logoff = function () {
        this.auth.logout();
        this.router.navigate(["/home"]);
    };
    TasksComponent.prototype.imageForTaskStatus = function (task) {
        console.log(task.isDone ? "res://checked" : "res://unchecked");
        return task.isDone ? "res://checked" : "res://unchecked";
    };
    TasksComponent.prototype.handleAndroidFocus = function (textField, container) {
        /*        console.log('***************:' );
                console.log('container:' + container);
                console.log('container.android' + container.android);
                if ( container.android ) {
                    container.android.setFocusableInTouchMode( true );
                    container.android.setFocusable( true );
                    textField.android.clearFocus();
                }*/
    };
    TasksComponent.prototype.showActivityIndicator = function () {
        this.isLoading = true;
    };
    TasksComponent.prototype.hideActivityIndicator = function () {
        this.isLoading = false;
    };
    TasksComponent.prototype.onNavBtnTap = function () {
        //alert("Go Back");
        this.routerExtensions.back();
        //this.routerExtensions.backToPreviousPage(); \
    };
    return TasksComponent;
}());
__decorate([
    core_1.ViewChild("taskTextField"),
    __metadata("design:type", core_1.ElementRef)
], TasksComponent.prototype, "taskTextField", void 0);
TasksComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./tasks.component.html",
        styleUrls: ["./tasks-common.css", "tasks.component.css"]
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService, auth_service_1.Auth,
        page_1.Page, router_1.Router, core_1.NgZone, router_extensions_1.RouterExtensions])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFza3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBdUk7QUFDdkksMENBQXlDO0FBQ3pDLHNDQUFvQztBQUVwQyxnQ0FBK0I7QUFFL0IsdURBQXlEO0FBQ3pELDhCQUEwQztBQUMxQyxtRkFBaUY7QUFFakYsNkNBQTZDO0FBRTdDLCtDQUE2QztBQUM3QyxxREFBNEM7QUFTNUMsSUFBYSxjQUFjO0lBV3ZCLHdCQUFxQixXQUF3QixFQUFVLElBQVUsRUFDckQsSUFBVSxFQUFVLE1BQWMsRUFBVSxJQUFZLEVBQVUsZ0JBQWtDO1FBRGhILGlCQTBCQztRQTFCb0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ3JELFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFWeEcsa0JBQWEsR0FBZ0IsRUFBRSxDQUFDO1FBQ3hDLFVBQUssR0FBaUMsSUFBSSxvQkFBZSxDQUFFLEVBQUUsQ0FBRSxDQUFDO1FBQ2hFLFVBQUssR0FBVyxFQUFFLENBQUM7UUFFbkIsMEJBQTBCO1FBQzFCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUtmLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO2FBQ3RCLEdBQUcsQ0FBRSxVQUFBLElBQUk7WUFDTiw0QkFBNEI7WUFDNUIsNEJBQTRCO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFFLENBQUUsQ0FBQztZ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QUM7SUFDN0QsQ0FBQztJQUVELDJDQUFrQixHQUFsQixVQUFvQixTQUFTLEVBQUUsU0FBUztRQUNwQzs7Ozs7OzttQkFPVztJQUNmLENBQUM7SUFFRCw4Q0FBcUIsR0FBckI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBQ0QsOENBQXFCLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLCtDQUErQztJQUNuRCxDQUFDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBNU5ELElBNE5DO0FBdk5pQztJQUE3QixnQkFBUyxDQUFFLGVBQWUsQ0FBRTs4QkFBZ0IsaUJBQVU7cURBQUM7QUFML0MsY0FBYztJQUwxQixnQkFBUyxDQUFFO1FBQ1IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx3QkFBd0I7UUFDckMsU0FBUyxFQUFFLENBQUMsb0JBQW9CLEVBQUUscUJBQXFCLENBQUM7S0FDM0QsQ0FBQztxQ0FZb0MsMEJBQVcsRUFBZ0IsbUJBQUk7UUFDL0MsV0FBSSxFQUFrQixlQUFNLEVBQWdCLGFBQU0sRUFBNEIsb0NBQWdCO0dBWnZHLGNBQWMsQ0E0TjFCO0FBNU5ZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0ICogYXMgU29jaWFsU2hhcmUgZnJvbSBcIm5hdGl2ZXNjcmlwdC1zb2NpYWwtc2hhcmVcIjtcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9ucyc7XHJcblxyXG4vL2ltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1N9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5cclxuaW1wb3J0IHsgVGFza1NlcnZpY2UgfSBmcm9tICcuL3Rhc2suc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGggfSBmcm9tICcuLi9hdXRoL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuL3Rhc2snO1xyXG5cclxuXHJcbkBDb21wb25lbnQoIHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Rhc2tzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vdGFza3MtY29tbW9uLmNzc1wiLCBcInRhc2tzLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhc2tzQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHJldHVybmVkVGFza3M6IEFycmF5PFRhc2s+ID0gW107XHJcbiAgICB0YXNrczogQmVoYXZpb3JTdWJqZWN0PEFycmF5PFRhc2s+PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoIFtdICk7XHJcbiAgICB0aXRsZTogc3RyaW5nID0gXCJcIjtcclxuICAgIEBWaWV3Q2hpbGQoIFwidGFza1RleHRGaWVsZFwiICkgdGFza1RleHRGaWVsZDogRWxlbWVudFJlZjtcclxuICAgIC8vaXNTaG93aW5nUmVjZW50ID0gZmFsc2U7XHJcbiAgICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgIGxpc3RMb2FkZWQgPSBmYWxzZTtcclxuICAgIGlzQW5kcm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSB0YXNrU2VydmljZTogVGFza1NlcnZpY2UsIHByaXZhdGUgYXV0aDogQXV0aCxcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMgKSB7XHJcbiAgICAgICAgdGhpcy5pc0FuZHJvaWQgPSAhIXRoaXMucGFnZS5hbmRyb2lkO1xyXG4gICAgICAgIHRoaXMudGFza1NlcnZpY2UuZ2V0VGFza3MoKVxyXG4gICAgICAgICAgICAubWFwKCBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5yZXR1cm5lZFRhc2tzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5wdWJsaXNoVGFza1VwZGF0ZXMoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcImRhdGE6IFwiICsgSlNPTi5zdHJpbmdpZnkoIGRhdGEgKSApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiZGF0YTogXCIgKyBkYXRhLnJlc3VsdCApO1xyXG4vKiAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKCB0YXNrICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcImRhdGE6IFwiICsgSlNPTi5zdHJpbmdpZnkoIHRhc2sgKSApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuZWRUYXNrcy5wdXNoKCB0YXNrICk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdWJsaXNoVGFza1VwZGF0ZXMoKTtcclxuICAgICAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJldHVybmVkVGFza3MgPSAgZGF0YSA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1Ymxpc2hUYXNrVXBkYXRlcygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5yZXR1cm5lZFRhc2tzID0gdGFza3M7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCAndGhpcy50YXNrcyByZXN1bHQ6JyArIEpTT04uc3RyaW5naWZ5KCB0aGlzLnJldHVybmVkVGFza3MgKSApO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnB1Ymxpc2hUYXNrVXBkYXRlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSwgKCBlcnJvciApID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCAnZ2V0VGFza3MgZXJyb3InICsgZXJyb3IgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoICdnZXRUYXNrcyBlcnJvcicgKyBlcnJvciApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYWRkKCB0YXJnZXQ6IHN0cmluZyApIHtcclxuICAgICAgICAvLyBJZiBzaG93aW5nIHJlY2VudCBncm9jZXJpZXMgdGhlIGFkZCBidXR0b24gc2hvdWxkIGRvIG5vdGhpbmcuXHJcbiAgICAgICAgLyogICAgICAgIGlmICh0aGlzLmlzU2hvd2luZ1JlY2VudCkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICBjb25zb2xlLmxvZyggXCJBZGQgVGFzazogXCIgKTtcclxuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLnRhc2tUZXh0RmllbGQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBjb25zb2xlLmxvZyggXCJBZGQgVGFzazogdGl0bGU6IFwiICsgdGhpcy50aXRsZSApO1xyXG4gICAgICAgIGlmICggdGhpcy50aXRsZS50cmltKCkgPT09IFwiXCIgKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIGNsaWNrZWQgdGhlIGFkZCBidXR0b24sIGFuZCB0aGUgdGV4dGZpZWxkIGlzIGVtcHR5LFxyXG4gICAgICAgICAgICAvLyBmb2N1cyB0aGUgdGV4dCBmaWVsZCBhbmQgcmV0dXJuLlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyggXCJBZGQgVGFzazogXCIgKTtcclxuICAgICAgICAgICAgaWYgKCB0YXJnZXQgPT09IFwiYnV0dG9uXCIgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0RmllbGQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIGNsaWNrZWQgcmV0dXJuIHdpdGggYW4gZW1wdHkgdGV4dCBmaWVsZCBzaG93IGFuIGVycm9yLlxyXG4gICAgICAgICAgICAgICAgYWxlcnQoIFwiRW50ZXIgYSB0YXNrXCIgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCBcIkFkZCBUYXNrOiBcIiApO1xyXG4gICAgICAgIC8vIERpc21pc3MgdGhlIGtleWJvYXJkXHJcbiAgICAgICAgLy8gVE9ETzogSXMgaXQgYmV0dGVyIFVYIHRvIGRpc21pc3MgdGhlIGtleWJvYXJkLCBvciBsZWF2ZSBpdCB1cCBzbyB0aGVcclxuICAgICAgICAvLyB1c2VyIGNhbiBjb250aW51ZSB0byBhZGQgbW9yZSB0YXNrcz9cclxuICAgICAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCBcIkFkZCBUYXNrOiBcIiApO1xyXG4gICAgICAgIHRoaXMuc2hvd0FjdGl2aXR5SW5kaWNhdG9yKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVOZXdUYXNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTmV3VGFzaygpIHtcclxuICAgICAgICAvKiAgICAgIGNyZWF0ZU5ld1Rhc2soIGV2ZW50OiBhbnkgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHVzZXJQcm9maWxlID0gSlNPTi5wYXJzZSggbG9jYWxTdG9yYWdlLmdldEl0ZW0oICdwcm9maWxlJyApICk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICB2YXIgbmV3VGFzayA9IHtcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXHJcbiAgICAgICAgICAgIHVzZXI6IHRoaXMudGFza1NlcnZpY2UuZ2V0VXNlcigpLFxyXG4gICAgICAgICAgICBfaWQ6ICcnLFxyXG4gICAgICAgICAgICBpc0RvbmU6IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyggbmV3VGFzayApO1xyXG4gICAgICAgIHRoaXMudGFza1NlcnZpY2UuYWRkVGFzayggbmV3VGFzayApXHJcbiAgICAgICAgICAgIC5tYXAoIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5lZFRhc2tzLnVuc2hpZnQoIGRhdGEgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHVibGlzaFRhc2tVcGRhdGVzKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5yZXR1cm5lZFRhc2tzLnB1c2goIHRhc2sgKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5wdWJsaXNoVGFza1VwZGF0ZXMoKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coIHRhc2sgKTsgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVBY3Rpdml0eUluZGljYXRvcigpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCggXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBhZGRpbmcgdGFzayB0byB5b3VyIGxpc3QuXCIgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUFjdGl2aXR5SW5kaWNhdG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUYXNrKCBpZDogc3RyaW5nICkge1xyXG4gICAgICAgIHRoaXMuc2hvd0FjdGl2aXR5SW5kaWNhdG9yKCk7XHJcbiAgICAgICAgdGhpcy50YXNrU2VydmljZS5kZWxldGVUYXNrKCBpZCApXHJcbiAgICAgICAgICAgIC5tYXAoIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBkYXRhLm4gPT0gMSApIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0aGlzLnJldHVybmVkVGFza3MubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5yZXR1cm5lZFRhc2tzW2ldLl9pZCA9PSBpZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuZWRUYXNrcy5zcGxpY2UoIGksIDEgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVibGlzaFRhc2tVcGRhdGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvKiAgIFRPRE8gcGFzcyB0YXNrOiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAqIGxldCBpbmRleCA9IHRoaXMucmV0dXJuZWRUYXNrcy5pbmRleE9mKHRhc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuZWRUYXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVibGlzaFRhc2tVcGRhdGVzKCk7Ki9cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVBY3Rpdml0eUluZGljYXRvcigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuLy8gICAgdXBkYXRlU3RhdHVzKCB0YXNrOiBUYXNrICkge1xyXG4vL1xyXG4vLyAgICAgICAgdGhpcy51cGRhdGVUYXNrKCB0YXNrIClcclxuLy8gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgdGhpcy5oaWRlQWN0aXZpdHlJbmRpY2F0b3IoKTtcclxuLy8gICAgICAgICAgICB9KTtcclxuLy8gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVTdGF0dXMoIHRhc2s6IFRhc2sgKSB7XHJcbiAgICAgICAgdGhpcy5zaG93QWN0aXZpdHlJbmRpY2F0b3IoKTtcclxuICAgICAgICB2YXIgdXBkYXRlVGFzayA9IHtcclxuICAgICAgICAgICAgdGl0bGU6IHRhc2sudGl0bGUsXHJcbiAgICAgICAgICAgIHVzZXI6IHRhc2sudXNlcixcclxuICAgICAgICAgICAgX2lkOiB0YXNrLl9pZCxcclxuICAgICAgICAgICAgaXNEb25lOiAhdGFzay5pc0RvbmVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCBcInVwZGF0ZVN0YXR1cyBiZWZvcmU6XCIgKyBKU09OLnN0cmluZ2lmeSggdGFzayApICk7XHJcbiAgICAgICAgdGhpcy50YXNrU2VydmljZS51cGRhdGVTdGF0dXMoIHVwZGF0ZVRhc2sgKVxyXG4gICAgICAgICAgICAvLy5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5tYXAoIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGFzay5pc0RvbmUgPSAhdGFzay5pc0RvbmU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJ1cGRhdGVTdGF0dXMgYWZ0ZXI6XCIgKyBKU09OLnN0cmluZ2lmeSggdGFzayApICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1Ymxpc2hUYXNrVXBkYXRlcygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUFjdGl2aXR5SW5kaWNhdG9yKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHVibGlzaFRhc2tVcGRhdGVzKCkge1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBhbGwgdXBkYXRlcyBhcmUgcHVibGlzaGVkIGluc2lkZSBOZ1pvbmUgc28gdGhhdCBjaGFuZ2UgZGV0ZWN0aW9uIGlzIHRyaWdnZXJlZCBpZiBuZWVkZWRcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gbXVzdCBlbWl0IGEgKm5ldyogdmFsdWUgKGltbXV0YWJpbGl0eSEpXHJcbiAgICAgICAgICAgIHRoaXMudGFza3MubmV4dCggWy4uLnRoaXMucmV0dXJuZWRUYXNrc10gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TWVudSgpIHtcclxuICAgICAgICBhY3Rpb24oIHtcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJXaGF0IHdvdWxkIHlvdSBsaWtlIHRvIGRvP1wiLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJTaGFyZVwiLCBcIkxvZyBPZmZcIl0sXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgICAgICB9KS50aGVuKCggcmVzdWx0ICkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIHJlc3VsdCA9PT0gXCJTaGFyZVwiICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCByZXN1bHQgPT09IFwiTG9nIE9mZlwiICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dvZmYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNoYXJlKCkge1xyXG4gICAgICAgIGxldCB0YXNrcyA9IHRoaXMudGFza3MudmFsdWU7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKCBsZXQgaSA9IDAsIHNpemUgPSB0YXNrcy5sZW5ndGg7IGkgPCBzaXplOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCggdGFza3NbaV0udGl0bGUgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coIFwiTGlzdCBmb3IgU2hhcmluZzogXCIgKyBsaXN0LmpvaW4oIFwiLFwiLnRyaW0oKSApICk7XHJcbiAgICAgICAgU29jaWFsU2hhcmUuc2hhcmVUZXh0KCBsaXN0LmpvaW4oIFwiLCBcIiApLnRyaW0oKSApO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ29mZigpIHtcclxuICAgICAgICB0aGlzLmF1dGgubG9nb3V0KCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoIFtcIi9ob21lXCJdICk7XHJcbiAgICB9XHJcblxyXG4gICAgaW1hZ2VGb3JUYXNrU3RhdHVzKCB0YXNrICkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCB0YXNrLmlzRG9uZSA/IFwicmVzOi8vY2hlY2tlZFwiIDogXCJyZXM6Ly91bmNoZWNrZWRcIiApO1xyXG4gICAgICAgIHJldHVybiB0YXNrLmlzRG9uZSA/IFwicmVzOi8vY2hlY2tlZFwiIDogXCJyZXM6Ly91bmNoZWNrZWRcIjtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVBbmRyb2lkRm9jdXMoIHRleHRGaWVsZCwgY29udGFpbmVyICkge1xyXG4gICAgICAgIC8qICAgICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqOicgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb250YWluZXI6JyArIGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29udGFpbmVyLmFuZHJvaWQnICsgY29udGFpbmVyLmFuZHJvaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBjb250YWluZXIuYW5kcm9pZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYW5kcm9pZC5zZXRGb2N1c2FibGVJblRvdWNoTW9kZSggdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hbmRyb2lkLnNldEZvY3VzYWJsZSggdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRGaWVsZC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dBY3Rpdml0eUluZGljYXRvcigpIHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBoaWRlQWN0aXZpdHlJbmRpY2F0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25OYXZCdG5UYXAoKSB7XHJcbiAgICAgICAgLy9hbGVydChcIkdvIEJhY2tcIik7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgICAgICAvL3RoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTsgXFxcclxuICAgIH1cclxuXHJcbn1cclxuIl19