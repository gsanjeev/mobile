import { Component, NgZone, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { action } from "ui/dialogs";
import { Color } from "color";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import * as SocialShare from "nativescript-social-share";
import { BehaviorSubject } from "rxjs/Rx";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

//import { isAndroid, isIOS} from "platform";

import { TaskService } from './task.service';
import { Auth } from '../auth/auth.service';
import { Task } from './task';


@Component( {
    moduleId: module.id,
    templateUrl: "./tasks.component.html",
    styleUrls: ["./tasks-common.css", "tasks.component.css"]
})
export class TasksComponent {

    private returnedTasks: Array<Task> = [];
    tasks: BehaviorSubject<Array<Task>> = new BehaviorSubject( [] );
    title: string = "";
    @ViewChild( "taskTextField" ) taskTextField: ElementRef;
    //isShowingRecent = false;
    isLoading = false;
    listLoaded = false;
    isAndroid;

    constructor( private taskService: TaskService, private auth: Auth,
        private page: Page, private router: Router, private zone: NgZone, private routerExtensions: RouterExtensions ) {
        this.isAndroid = !!this.page.android;
        this.taskService.getTasks()
            .map( data => {
                //this.returnedTasks = data;
                //this.publishTaskUpdates();
                console.log( "data: " + JSON.stringify( data ) );
                console.log( "data: " + data.result );
/*                data.forEach(( task ) => {
                    console.log( "data: " + JSON.stringify( task ) );
                    this.returnedTasks.push( task );
                    this.publishTaskUpdates();
                });*/
                this.returnedTasks =  data ;
                this.publishTaskUpdates();
            })
            .subscribe(() => {
                //this.returnedTasks = tasks;
                //console.log( 'this.tasks result:' + JSON.stringify( this.returnedTasks ) );
                //this.publishTaskUpdates();
                this.listLoaded = true;
            }, ( error ) => {
                console.log( 'getTasks error' + error );
                console.error( 'getTasks error' + error );
            });
    }


    add( target: string ) {
        // If showing recent groceries the add button should do nothing.
        /*        if (this.isShowingRecent) {
                  return;
                }*/
        console.log( "Add Task: " );
        let textField = <TextField>this.taskTextField.nativeElement;
        console.log( "Add Task: title: " + this.title );
        if ( this.title.trim() === "" ) {
            // If the user clicked the add button, and the textfield is empty,
            // focus the text field and return.
            console.log( "Add Task: " );
            if ( target === "button" ) {
                textField.focus();
            } else {
                // If the user clicked return with an empty text field show an error.
                alert( "Enter a task" );
            }
            return;
        }
        console.log( "Add Task: " );
        // Dismiss the keyboard
        // TODO: Is it better UX to dismiss the keyboard, or leave it up so the
        // user can continue to add more tasks?
        textField.dismissSoftInput();
        console.log( "Add Task: " );
        this.showActivityIndicator();
        this.createNewTask();
    }

    createNewTask() {
        /*      createNewTask( event: any ) {
                event.preventDefault();
                var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
        */
        var newTask = {
            title: this.title,
            user: this.taskService.getUser(),
            _id: '',
            isDone: false,
        }
        console.log( newTask );
        this.taskService.addTask( newTask )
            .map( data => {
                this.returnedTasks.unshift( data );
                this.publishTaskUpdates();
            })
            .subscribe(
            () => {
                //this.returnedTasks.push( task );
                //this.publishTaskUpdates();
                //console.log( task );  
                this.title = "";
                this.hideActivityIndicator();
            },
            () => {
                alert( "An error occurred while adding task to your list." );
                this.hideActivityIndicator();
            }
            );
    }

    deleteTask( id: string ) {
        this.showActivityIndicator();
        this.taskService.deleteTask( id )
            .map( data => {
                if ( data.n == 1 ) {
                    for ( var i = 0; i < this.returnedTasks.length; i++ ) {
                        if ( this.returnedTasks[i]._id == id ) {
                            this.returnedTasks.splice( i, 1 );
                            this.publishTaskUpdates();
                        }
                    }
                }
                /*   TODO pass task:             
                 * let index = this.returnedTasks.indexOf(task);
                                this.returnedTasks.splice(index, 1);
                                this.publishTaskUpdates();*/
            })
            .subscribe(() => {
                this.hideActivityIndicator();
            })
    }

//    updateStatus( task: Task ) {
//
//        this.updateTask( task )
//            .subscribe(() => {
//                this.hideActivityIndicator();
//            });
//    }


    updateStatus( task: Task ) {
        this.showActivityIndicator();
        var updateTask = {
            title: task.title,
            user: task.user,
            _id: task._id,
            isDone: !task.isDone
        };
        console.log( "updateStatus before:" + JSON.stringify( task ) );
        this.taskService.updateStatus( updateTask )
            //.map(res => res.json())
            .map( data => {
                task.isDone = !task.isDone;
                console.log( "updateStatus after:" + JSON.stringify( task ) );
                this.publishTaskUpdates();
            })
            .subscribe(() => {
                this.hideActivityIndicator();
            });
    }

    private publishTaskUpdates() {
        // Make sure all updates are published inside NgZone so that change detection is triggered if needed
        this.zone.run(() => {
            // must emit a *new* value (immutability!)
            this.tasks.next( [...this.returnedTasks] );
        });
    }

    showMenu() {
        action( {
            message: "What would you like to do?",
            actions: ["Share", "Log Off"],
            cancelButtonText: "Cancel"
        }).then(( result ) => {
            if ( result === "Share" ) {
                this.share();
            } else if ( result === "Log Off" ) {
                this.logoff();
            }
        });
    }

    share() {
        let tasks = this.tasks.value;
        let list = [];
        for ( let i = 0, size = tasks.length; i < size; i++ ) {
            list.push( tasks[i].title );
        }
        console.log( "List for Sharing: " + list.join( ",".trim() ) );
        SocialShare.shareText( list.join( ", " ).trim() );
    }

    logoff() {
        this.auth.logout();
        this.router.navigate( ["/home"] );
    }

    imageForTaskStatus( task ) {
        console.log( task.isDone ? "res://checked" : "res://unchecked" );
        return task.isDone ? "res://checked" : "res://unchecked";
    }

    handleAndroidFocus( textField, container ) {
        /*        console.log('***************:' );
                console.log('container:' + container);
                console.log('container.android' + container.android);
                if ( container.android ) {
                    container.android.setFocusableInTouchMode( true );
                    container.android.setFocusable( true );
                    textField.android.clearFocus();
                }*/
    }

    showActivityIndicator() {
        this.isLoading = true;
    }
    hideActivityIndicator() {
        this.isLoading = false;
    }
    
    onNavBtnTap() {
        //alert("Go Back");
        this.routerExtensions.back();
        //this.routerExtensions.backToPreviousPage(); \
    }

}
