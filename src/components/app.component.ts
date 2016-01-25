import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import { AuthPromptComponent } from './auth-prompt.component';
import { ForumComponent } from './forum.component';
import { LoginService } from '../services/login-service';

@Component({
    selector: 'angular-workshop',
    template: `
    <div class="container">
        <h1>Velkommen til Angular-Workshop!2</h1>
        <auth-prompt *ngIf="!isLoggedIn"></auth-prompt>
        <forum-content *ngIf="isLoggedIn"></forum-content>
    </div>
    `,
    directives: [AuthPromptComponent, ForumComponent, CORE_DIRECTIVES],
    providers: [LoginService]
})

export class AppComponent {
    constructor(private _loginService : LoginService) {}
    
    get isLoggedIn() { return this._loginService.isLoggedIn; }
}