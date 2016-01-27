import {
    describe,
    it,
    beforeEachProviders,
    injectAsync,
    TestComponentBuilder
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {ForumComponent} from './forum.component';

import {LoginService} from '../services/login-service';
import {USERNAME, LoggedInService} from '../services/login-service.mock';
import {MessageService} from '../services/message-service';
import {MockMessageService} from '../services/message-service.mock';

export function main() {
    describe('ForumComponent', () => {
        beforeEachProviders(() => [
            provide(LoginService, {useClass: LoggedInService}), 
            provide(MessageService, {useClass: MockMessageService})          
        ]);
        
        it('should greet authenticated users', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(ForumComponent)
                .then(fixture => {
                    fixture.detectChanges();
                    
                    let compiled = fixture.debugElement.nativeElement;
                    
                    
                });
        }));
    });
}