import {
    TestComponentBuilder, 
    describe, 
    expect, 
    injectAsync, 
    it, 
    beforeEachProviders,
    ComponentFixture
} from 'angular2/testing';

import {provide, Provider, Component} from 'angular2/core';

import {LoginService} from '../services/login-service';
import {UserRepository} from '../repositories/user-repository';
import {AppComponent} from './app.component';
import {MessageService} from '../services/message-service';
import {MockMessageService} from '../services/message-service.mock';
import {AuthPromptComponent} from './auth-prompt.component';

import {getCompiled} from '../utils/testing-utils';

/**
 * Mock out the sub directives so we can test the component behavior in isolation. 
 */

@Component({selector: 'auth-prompt', template: ``}) class MockAuthPromptComponent {}

import {ForumComponent} from './forum.component';

@Component({selector: 'forum-content', template: ``}) class MockForumComponent {}

import {USERNAME, LoggedInService, LoggedOutService} from '../services/login-service.mock'; 

export function override(tcb: TestComponentBuilder) {
    return tcb 
        .overrideDirective(AppComponent, ForumComponent, MockForumComponent)
        .overrideDirective(AppComponent, AuthPromptComponent, MockAuthPromptComponent);
}

export function main() {
    describe('AppComponent', () => {    
        beforeEachProviders(() => [
            LoginService, UserRepository,
            provide(MessageService, {useClass: MockMessageService})
        ]);
        
        it('should be welcoming and speak properly', injectAsync([TestComponentBuilder], tcb => {
            return override(tcb)
                .createAsync(AppComponent)
                .then(getCompiled)
                .then(compiled => {
                    expect(compiled.querySelector('h1').innerText).toMatch(/velkommen/i);
                });
        }));
        
        describe('Logged out', () => {
            beforeEachProviders(() => [
                provide(LoginService, {useClass: LoggedOutService})
            ]);
        
            it('should have a visible auth prompt for not-logged in users', injectAsync([TestComponentBuilder], tcb => {
                return override(tcb)
                    .createAsync(AppComponent)
                    .then(getCompiled)
                    .then(compiled => {
                        let authPrompt = compiled.querySelector('auth-prompt');
                
                        expect(authPrompt).not.toBe(null);
                    });
            }));            
        });
        
        describe('Logged in', () => {
            beforeEachProviders(() => [
                provide(LoginService, {useClass: LoggedInService})
            ]);
            
            it('should greet authenticated users', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                return tcb
                    .createAsync(AppComponent)
                    .then(getCompiled)
                    .then(compiled => {                        
                        let greeting = compiled.querySelector('.greeting');
                        
                        expect(greeting).not.toBe(null);
                        expect(greeting.innerText).toMatch(/heisann/i);
                        expect(greeting.innerText).toContain(USERNAME);
                    });
            }));
            
            it('should hide the auth prompt for logged-in users', injectAsync([TestComponentBuilder], tcb => {
                return override(tcb)
                    .createAsync(AppComponent)
                    .then(getCompiled)
                    .then(compiled => {
                        expect(compiled.querySelector('auth-prompt')).toBe(null);
                    });
            }));
            
            it('should have a logout button for logged-in users', injectAsync([TestComponentBuilder], tcb => {
                return override(tcb)
                    .createAsync(AppComponent)
                    .then(fixture => {
                        fixture.detectChanges();
                        
                        let button = fixture.debugElement.nativeElement.querySelector('.logout');
                        
                        expect(button).not.toBe(null);
                    });
            }));
            
            it('should log out users when they click on the log-out button', injectAsync([TestComponentBuilder], tcb => {
                return override(tcb)
                    .createAsync(AppComponent)
                    .then(fixture => {
                        fixture.detectChanges();
                        
                        let button = fixture.debugElement.nativeElement.querySelector('.logout');
                        
                        button.click();
                        
                        fixture.detectChanges();
                        
                        let authPrompt = fixture.debugElement.nativeElement.querySelector('auth-prompt');
                        
                        expect(authPrompt).not.toBe(null);
                    });
            }));
            
            it('should show the content for logged-in users', injectAsync([TestComponentBuilder], tcb => {
                return override(tcb)
                    .createAsync(AppComponent)
                    .then(getCompiled)
                    .then(compiled => {
                        expect(compiled.querySelector('forum-content')).not.toBe(null);
                    });
            }));
        });
    });
}