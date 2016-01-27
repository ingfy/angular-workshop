import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {LoginService} from '../services/login-service';
import {MessageService} from '../services/message-service';
import {Message} from '../models/message';

import {MessageComponent} from './message.component';
import {WriteMessageComponent} from './write-message.component';

@Component({
    selector: 'forum-content',
    template: `
    <article class="forum">
        <main>
            <ul></ul>
        </main>
        <footer>
            <h2>Skriv et nytt innlegg</h2>
        </footer>
    </article>
    `,
    directives: [MessageComponent, WriteMessageComponent, CORE_DIRECTIVES],
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
            .subscribe(messages => {
                this.messages = messages;
            });
    }
    
    get username() {
        let user =  this._loginService.currentUser;
        
        return user && user.name; 
    }
    
    onMessage($event) {
        let topic = new Message(null, null, $event.text, this.username, $event.date);
        
        this._messageService.add(topic);
    }
}