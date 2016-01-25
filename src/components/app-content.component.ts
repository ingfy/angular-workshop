import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {LoginService} from '../services/login-service';
import {MessagesService} from '../services/messages-service';
import {Message} from '../models/message';

@Component({
    selector: 'app-content',
    template: `
    <p class="greeting">Heisann {{username}}!</p>
    <ul class="topic-list" *ngFor="#message of messages">
    </ul>
    `,
    providers: [MessagesService]
})
export class AppContentComponent {
    messages : Message[];
    
    constructor(
        private _loginService : LoginService, 
        private _messagesService : MessagesService
    ) {
        this.messages = this._messagesService.getTopics()
            .subscribe(messages => this.messages = messages);
    }
    
    get username() {
        let user =  this._loginService.currentUser;
        
        return user && user.name; 
    }
}