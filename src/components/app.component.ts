import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import { AuthPromptComponent } from './auth-prompt.component';
import { ForumComponent } from './forum.component';
import { LoginService } from '../services/login-service';

@Component({
    selector: 'angular-workshop',
    template: `
    <div class="container">
        <h1>VÆL-KOM'n til Angular-Workshop!</h1>
        <p>Her mangler det noe!</p>
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