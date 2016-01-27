import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Input} from 'angular2/core';

import {Message} from '../models/message';
import {TimeStampComponent} from './time-stamp.component';
import {WriteMessageComponent} from './write-message.component';
import {MessageService} from '../services/message-service';

@Component({
    selector: 'thread-message',
    styles: [`
        .message {
            border: 1px solid black;
            padding: 1em;
        }
    `],
    template: `
        <article>
            <main>
                <section class="message">
                    <footer>
                        <p>
                            {{signature}}
                            <time-stamp [date]="message.date"></time-stamp>
                        </p>
                    </footer>
                </section>
            </main>
            <footer>
                <section class="reply">
                    <write-message (onMessage)="addReply($event)"></write-message>
                </section>
                <section class="replies"></section>
            </footer>
        </article>
    `,
    directives: [MessageComponent, TimeStampComponent, WriteMessageComponent, CORE_DIRECTIVES],
    providers: []
})

export class MessageComponent {
    @Input() message : Message;
    
    constructor(
        private _messageService : MessageService
    ) {}
    
    get signature() {
        return this.message.isAnonymous 
            ? 'Anonym'
            : this.message.author;
    }
    
    onUpvote() {
        this.message.upvote();
        this._messageService.save(this.message);
    }
    
    onDownvote() {
        this.message.downvote();
        this._messageService.save(this.message);
    }
    
    addReply($event) {
        let reply = new Message(null, this.message, $event.text, null, $event.date);
        
        this._messageService.add(reply);
    }
}