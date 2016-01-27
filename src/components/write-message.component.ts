import {Component, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'write-message',
    template: `
        <p class="toggle-write" *ngIf="!isWriting">
            Vil du vise meningene dine?
            <button class="toggle-write-button" (click)="isWriting = true">Skriv et innlegg</button>
        </p>
        <form class="message-form" *ngIf="isWriting" (ngSubmit)="onSubmit()" #replyForm="ngForm">
            <input [(ngModel)]="model.text" required placeholder="Skriv her..." />
            <button class="add-message">Legg inn</button>
            <button (click)="isWriting = false" class="cancel-message">Avbryt</button>
        </form>
    `,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})

export class WriteMessageComponent {
    @Output() onMessage = new EventEmitter();
    
    model = {text: ''};
    
    isWriting = false;
    
    onSubmit() {
        this.onMessage.emit({
            text: this.model.text,
            date: new Date()
        });
        
        this.model.text = '';
        
        this.isWriting = false;
    }
}