import {
    describe,
    it,
    expect,
    injectAsync,
    beforeEachProviders,
    TestComponentBuilder
} from 'angular2/testing';

import {provide} from 'angular2/core';

import {LoggedOutService} from '../services/login-service.mock';
import {LoginService} from '../services/login-service';

import {AuthPromptComponent} from './auth-prompt.component';

export function main() {
    describe('AuthPromptComponent', () => {
        beforeEachProviders(() => [
            provide(LoginService, {useClass: LoggedOutService})
        ]);
        
        it('should have a form', injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(AuthPromptComponent)
                .then(fixture => {
                    expect(fixture.debugElement.nativeElement.querySelector('form')).not.toBe(null);
                });
        }));        
        
        it('should have an input for the username', injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(AuthPromptComponent)
                .then(fixture => {
                    expect(fixture.debugElement.nativeElement.querySelector('form input')).not.toBe(null);
                });
        }));        
        
        it('should have a button for submitting', injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(AuthPromptComponent)
                .then(fixture => {
                    expect(fixture.debugElement.nativeElement.querySelector('form button')).not.toBe(null);
                });
        }));
    });
}