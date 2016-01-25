import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Input} from 'angular2/core';

import {Message} from '../models/message';
import {TimeStampComponent} from './time-stamp.component';
import {MessageService} from '../services/message-service';

@Component({
    selector: 'thread-message',
    template: `
        <article>
            <main>
                <p>{{message.text}}</p>
                <aside class="voting">
                    <span class="vote-count">{{message.votes}} points</span>
                    <button class="upvote" (click)="onUpvote()">&#x1f44d;</button>
                    <button class="downvote" (click)="onDownvote()">&#x1f44e;</button>
                </aside>
            </main>
            <footer>
                <p>
                    {{signature}}
                    <time-stamp [date]="message.date"></time-stamp>
                </p>
            </footer>
            <section class="responses">
                <ul *ngFor="#response of message.children">
                    <li><thread-message [message]="response"></thread-message></li>
                </ul>
            </section>
        </article>
    `,
    directives: [MessageComponent, TimeStampComponent, CORE_DIRECTIVES],
    providers: []
})

export class MessageComponent {
    @Input() message : Message;
    
    get signature() {
        return this.message.isAnonymous 
            ? 'Anonym'
            : this.message.author.name;
    }
    
    onUpvote() {
        this.message.upvote();
    }
    
    onDownvote() {
        this.message.downvote();
    }
}