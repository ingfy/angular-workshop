import {Component} from 'angular2/core';

import { AuthPromptComponent } from './auth-prompt.component';
import { LoginService } from '../services/login-service';

@Component({
    selector: 'angular-workshop',
    template: `
    <h1>Velkommen til Angular-Workshop!</h1>
    <auth-prompt [hidden]="_loginService.isLoggedIn()"></auth-prompt>
    `,
    directives: [AuthPromptComponent]
})

export class AppComponent {
    constructor(private _loginService : LoginService) {}
}