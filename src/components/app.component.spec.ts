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

import {AuthPromptComponent} from './auth-prompt.component';

import {getCompiled} from '../utils/testing-utils';

/**
 * Mock out the sub directives so we can test the component behavior in isolation. 
 */

@Component({selector: 'auth-prompt', template: ``}) class MockAuthPromptComponent {}

import {ForumComponent} from './forum.component';

@Component({selector: 'forum-content', template: ``}) class MockForumComponent {}

import {LoggedInService, LoggedOutService} from '../services/login-service.mock'; 

export function override(tcb: TestComponentBuilder) {
    return tcb 
        .overrideDirective(AppComponent, ForumComponent, MockForumComponent)
        .overrideDirective(AppComponent, AuthPromptComponent, MockAuthPromptComponent);
}

export function main() {
    describe('AppComponent', () => {    
        beforeEachProviders(() => [
            LoginService, UserRepository
        ]);
        
        it('should be welcoming', injectAsync([TestComponentBuilder], tcb => {
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
            
            it('should hide the auth prompt for logged-in users', injectAsync([TestComponentBuilder], tcb => {
                return override(tcb)
                    .createAsync(AppComponent)
                    .then(getCompiled)
                    .then(compiled => {
                        expect(compiled.querySelector('auth-prompt')).toBe(null);
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