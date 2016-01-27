import {Component, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'write-message',
    template: `
        <form class="message-form" (ngSubmit)="onSubmit()" #replyForm="ngForm">
            <input [(ngModel)]="model.text" required placeholder="Skriv her..." />
            <button class="add-message">Legg inn</button>
        </form>
    `,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})

export class WriteMessageComponent {
    @Output() onMessage = new EventEmitter();
    
    model = {text: ''};    
    
    onSubmit() {
        this.onMessage.emit({
            text: this.model.text,
            date: new Date()
        });
        
        this.model.text = '';
    }
}