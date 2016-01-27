import {
    describe,
    it,
    expect,
    injectAsync,
    beforeEachProviders,
    TestComponentBuilder,
    ComponentFixture
} from 'angular2/testing';

import {Component, View} from 'angular2/core';

import {WriteMessageComponent} from './write-message.component';

import {expectToBeSameDay} from '../utils/testing-utils';

export function main() {
    describe('WriteMessageComponent', () => {
        it(`should not display the reply form by default, but
toggle the reply form when clicking a button (with the class "toggle-write-button")
so that we don't get annoyed by so many input boxes all the time`, injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(TestWriteMessageComponent)
                .then(fixture => {
                    fixture.detectChanges();
                    
                    let compiled = fixture.debugElement.nativeElement;
                    
                    let toggleReplyButton = compiled.querySelector('.toggle-write-button');
                    let replyForm = compiled.querySelector('.message-form');
                    
                    expect(toggleReplyButton).not.toBe(null);
                    expect(replyForm).toBe(null);
                    
                    toggleReplyButton.click();
                    
                    fixture.detectChanges();
                    
                    let toggleReplyButton2 = compiled.querySelector('.toggle-write-button');
                    let replyForm2 = compiled.querySelector('.message-form');
                    
                    expect(replyForm2).not.toBe(null);
                    expect(toggleReplyButton2).toBe(null);
                });
        }));
    });
}

@Component({
    selector: 'test-write-message',
    template: '<div><write-message (onMessage)="onMessage($event)"></write-message></div>',
    directives: [WriteMessageComponent]
})
class TestWriteMessageComponent {
    text: string;
    date: Date;
    
    onMessage($event) {
        this.text = $event.text;
        this.date = $event.date;
    }
}