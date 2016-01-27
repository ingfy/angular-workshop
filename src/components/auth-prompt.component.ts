import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {LoginService} from '../services/login-service'; 

interface LoginInfo {
    username : string;
}

@Component({
    selector: 'auth-prompt',
    template: `
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <div class="form-group">
                <label for="username">Brukernavn:</label>
                <p>Mitt statiske brukernavn</p>
            </div>
            <p>Hvor skal jeg trykke???</p>
        </form>
    `,
    directives: [FORM_DIRECTIVES]
})

export class AuthPromptComponent {
    model = {username : ''};
    
    constructor (private _loginService: LoginService) {}
        
    onSubmit() {
        this._loginService.login(this.model.username)
            .then(user => alert(`Logged in as ${user.name}!`));
    }
}