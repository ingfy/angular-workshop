import {
    describe,
    it,
    beforeEachProviders,
    injectAsync,
    inject,
    TestComponentBuilder,
    fakeAsync,
    tick
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {ForumComponent} from './forum.component';

import {LoginService} from '../services/login-service';
import {USERNAME, LoggedInService} from '../services/login-service.mock';
import {MessageService} from '../services/message-service';
import {MockMessageService, MESSAGES} from '../services/message-service.mock';

import {getCompiled} from '../utils/testing-utils';

export function main() {
    describe('ForumComponent', () => {
        beforeEachProviders(() => [
            provide(LoginService, {useClass: LoggedInService}), 
            provide(MessageService, {useClass: MockMessageService})          
        ]);
        
        it('should have a list of threads with the class \"thread-list\"', injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(ForumComponent)
                .then(getCompiled)
                .then(compiled => {                    
                    expect(compiled.querySelector('.thread-list')).not.toBe(null);
                });
        }));
        
        it('the list of threads should show all threads that comes from the messages service', inject([TestComponentBuilder], fakeAsync(tcb => {
            var fixture;
            
            tcb
                .createAsync(ForumComponent)
                .then(root => { fixture = root; tick(); });
                                                       
            tick(); // Let the ForumComponent "download" the mock data
            
            let compiled = getCompiled(fixture);
            
            expect(compiled.querySelectorAll('.thread-list > li > thread-message').length).toBe(MESSAGES.length);
        })));
        
        it('should have a <write-message> component for adding a new topic', injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(ForumComponent)
                .then(getCompiled)
                .then(compiled => {                    
                    expect(compiled.querySelector('write-message')).not.toBe(null);
                });
        }));
    });
}