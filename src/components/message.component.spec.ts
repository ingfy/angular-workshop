import {
    describe,
    it,
    expect,
    injectAsync,
    beforeEachProviders,
    TestComponentBuilder
} from 'angular2/testing';
import {Component, View, provide} from 'angular2/core';

import {MessageComponent} from './message.component';
import {Message} from '../models/message'; 
import {User} from '../models/user';
import {MockMessageService} from '../services/message-service.mock';
import {MessageService} from '../services/message-service';

import {getCompiled} from '../utils/testing-utils';

@Component({selector: 'thread-message', template: ''}) class MockMessageComponent {}

const PARENT_MESSAGE_TEXT = 'My message';
const PARENT_MESSAGE_USERNAME = 'Mrs. Person';
const REPLY_MESSAGE_TEXT = 'Reply';

function getMessage() {
    let m = new Message(
        "one",
        null, 
        PARENT_MESSAGE_TEXT, 
        PARENT_MESSAGE_USERNAME);
        
    new Message("one.one", m, REPLY_MESSAGE_TEXT);
    
    return m;
}

export function main() {
    describe('MessageComponent', () => {
        let m : Message;
        
        beforeEachProviders(() => [provide(MessageService, {useClass: MockMessageService})]);
        
        beforeEach(() => {
            m = getMessage();
        });
        
        it('should display the message text', injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(TestMessageComponent)
                .then(getCompiled)
                .then(compiled => {
                    expect(compiled.querySelector('article main p').innerText).toBe(PARENT_MESSAGE_TEXT);
                });
        }));
        
        it('should have a reply component for each reply in the message', injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(TestMessageComponent)
                .then(getCompiled)
                .then(compiled => {
                    expect(compiled.querySelectorAll('.replies thread-message').length).toBe(1); 
                })
        }));
        
        describe('message voting', () => {            
            it('should have a vote count with the class "vote-count"', injectAsync([TestComponentBuilder], tcb => {
                return tcb
                    .createAsync(TestMessageComponent)
                    .then(getCompiled)
                    .then(compiled => {
                        let voteCount = compiled.querySelector('.vote-count');
                        
                        expect(voteCount).not.toBe(null);
                        expect(voteCount.innerText).toMatch(/0/);
                    });
            }));
            
            it('should have an upvote button with the class "upvote"', injectAsync([TestComponentBuilder], tcb => {
                return tcb
                    .createAsync(TestMessageComponent)
                    .then(getCompiled)
                    .then(compiled => {
                        expect(compiled.querySelector('.upvote')).not.toBe(null);
                    });
            }));
            
            it('should have an downvote button with the class "downvote"', injectAsync([TestComponentBuilder], tcb => {
                return tcb
                    .createAsync(TestMessageComponent)
                    .then(getCompiled)
                    .then(compiled => {
                        expect(compiled.querySelector('.downvote')).not.toBe(null);
                    });
            }));
            
            it('the upvote button should work', injectAsync([TestComponentBuilder], tcb => {
                return tcb
                    .createAsync(TestMessageComponent)
                    .then(fixture => {
                        fixture.detectChanges();
                        
                        let compiled = fixture.debugElement.nativeElement;
                        
                        compiled.querySelector('.upvote').click();
                        
                        expect(fixture.componentInstance.message.votes).toBe(1);
                    });
            }));
            
            it('the downvote button should work', injectAsync([TestComponentBuilder], tcb => {
                return tcb
                    .createAsync(TestMessageComponent)
                    .then(fixture => {
                        fixture.detectChanges();
                        
                        let compiled = fixture.debugElement.nativeElement;
                        
                        compiled.querySelector('.downvote').click();
                        
                        expect(fixture.componentInstance.message.votes).toBe(-1);
                    });
            }));
            
            it('should update the counter', injectAsync([TestComponentBuilder], tcb => {
                return tcb
                    .createAsync(TestMessageComponent)
                    .then(fixture => {
                        fixture.detectChanges();
                        
                        let compiled = fixture.debugElement.nativeElement;
                        
                        expect(compiled.querySelector('.vote-count').innerText).toMatch(/0/);
                        
                        compiled.querySelector('.upvote').click();
                        
                        fixture.detectChanges();
                        
                        expect(compiled.querySelector('.vote-count').innerText).toMatch(/1/);
                    });
            }));
        });
    });
}

@Component({selector: 'test-thread-message'})
@View({
    template: `<div><thread-message [message]="message"></thread-message></div>`,
    directives: [MessageComponent]
})
class TestMessageComponent {
    message : Message = getMessage(); 
}