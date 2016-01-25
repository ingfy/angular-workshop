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
import {AppComponent} from './app.component';

import {AuthPromptComponent} from './auth-prompt.component';

@Component({selector: 'auth-prompt', template: ``}) class MockAuthPromptComponent {}

import {AppContentComponent} from './app-content.component';

@Component({selector: 'app-content', template: ``}) class MockAppContentComponent {}

import {LoggedInService, LoggedOutService} from '../services/login-service.mock'; 

/**
 * Mock out the sub directives so we can test the component behavior in isolation. 
 */
function buildTestComponent(providers : Provider[], callback : (domElement: any) => any) {
    return injectAsync([TestComponentBuilder], (tcb : TestComponentBuilder) => {
        tcb = 
            tcb.overrideDirective(AppComponent, AppContentComponent, MockAppContentComponent)
            tcb.overrideDirective(AppComponent, AuthPromptComponent, MockAuthPromptComponent);
            
        if (providers.length > 0) {
            tcb = tcb.overrideProviders(AppComponent, providers);
        }
        
        return tcb
            .createAsync(AppComponent)
            .then((fixture : ComponentFixture) => {
                fixture.detectChanges();
                
                return callback(fixture.debugElement.nativeElement);
            });
    });
}

export function main() {
    describe('AppComponent', () => {    
        beforeEachProviders(() => [
            LoginService
        ]);
        
        it('should be welcoming', buildTestComponent([], compiled => {
            expect(compiled.querySelector('h1').innerText).toMatch(/velkommen/i);     
        }));
        
        it('should have a visible auth prompt for not-logged in users', buildTestComponent([
            provide(LoginService, {useClass: LoggedOutService})
        ], compiled => {
            let authPrompt = compiled.querySelector('auth-prompt');
            
            expect(authPrompt).not.toBe(null);
        }));
        
        it('should hide the auth prompt for logged-in users', buildTestComponent([
            provide(LoginService, {useClass: LoggedInService})
        ], compiled => {
            expect(compiled.querySelector('auth-prompt')).toBe(null);
        }));
        
        it('should show the content for logged-in users', buildTestComponent([
            provide(LoginService, {useClass: LoggedInService})
        ], compiled => {
            expect(compiled.querySelector('app-content')).not.toBe(null);
        }));
    });
}