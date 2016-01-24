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
                <input class="form-control" 
                       required
                       [(ngModel)]="model.username" 
                       ngControl="username"
                       placeholder="Hva heter du?"
                       #username="ngForm" />
                <div [hidden]="username.valid" class="alert alert-danger">
                    Vennligst fyll inn brukernavnet ditt!
                </div>
            </div>
            <div class="form-group">
                <button type="submit"
                        [disabled]="!loginForm.form.valid">Logg inn!</button>
            </div>
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