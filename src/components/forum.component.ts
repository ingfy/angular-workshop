import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {LoginService} from '../services/login-service';
import {MessageService} from '../services/message-service';
import {Message} from '../models/message';

import {MessageComponent} from './message.component';

@Component({
    selector: 'forum-content',
    template: `
    <p class="greeting">Heisann {{username}}!</p>
    <ul class="topic-list" *ngFor="#topic of messages">
        <li>
            <thread-message [message]="topic"></thread-message>
        </li>
    </ul>
    `,
    directives: [MessageComponent, CORE_DIRECTIVES],
    providers: []
})
export class ForumComponent {
    messages : Message[];
    
    constructor(
        private _loginService : LoginService, 
        private _messageService : MessageService
    ) {
        this._messageService
            .fetch()
            .subscribe(messages => this.messages = messages);
    }
    
    get username() {
        let user =  this._loginService.currentUser;
        
        return user && user.name; 
    }
}