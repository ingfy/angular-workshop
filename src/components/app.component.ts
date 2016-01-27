import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import { AuthPromptComponent } from './auth-prompt.component';
import { ForumComponent } from './forum.component';
import { LoginService } from '../services/login-service';

@Component({
    selector: 'angular-workshop',
    template: `
    <div class="container">
        <!--
            <h1>VÆL-KOM'n til Angular-Workshop!</h1>
            <p>Her mangler det noe!</p>
        -->
        <!-- TODO: remove following -->
        <h1>Velkommen til Angular-Workshop!</h1>
        <auth-prompt *ngIf="!isLoggedIn"></auth-prompt>
        <div *ngIf="isLoggedIn">
            <p class="greeting">Heisann {{username}}!</p>
            <button class="logout" (click)="onLogout()">Logg ut</button>
            <forum-content></forum-content>
        </div>
        <!-- ENDTODO -->
    </div>
    `,
    directives: [AuthPromptComponent, ForumComponent, CORE_DIRECTIVES]
})

export class AppComponent {
    constructor(private _loginService : LoginService) {}
    
    onLogout() {
        this._loginService.logout();
    }
    
    get isLoggedIn() { return this._loginService.isLoggedIn; }
    
    get username(){ return this.isLoggedIn ? this._loginService.currentUser.name : null;}
}