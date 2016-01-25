import {
    describe,
    it,
    beforeEachProviders,
    injectAsync,
    TestComponentBuilder
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {AppContentComponent} from './app-content.component';

import {LoginService} from '../services/login-service';
import {USERNAME, LoggedInService} from '../services/login-service.mock';

export function main() {
    describe('AppContentComponent', () => {
        beforeEachProviders(() => [
            LoginService
        ]);
        
        it('should greet authenticated users', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .overrideProviders(AppContentComponent, [provide(LoginService, {useClass: LoggedInService})])
                .createAsync(AppContentComponent)
                .then(fixture => {
                    fixture.detectChanges();
                    
                    let compiled = fixture.debugElement.nativeElement;
                    
                    let greeting = compiled.querySelector('.greeting');
                    
                    expect(greeting).not.toBe(null);
                    expect(greeting.innerText).toMatch(/heisann/i);
                    expect(greeting.innerText).toContain(USERNAME);
                });
        }));
    });
}