import {
    TestComponentBuilder, 
    describe, 
    expect, 
    injectAsync, 
    it, 
    beforeEachProviders
} from 'angular2/testing';

import {LoginService} from '../services/login-service';
import {AppComponent} from './app.component';

export function main() {
    describe('AppComponent', () => {    
        beforeEachProviders(() => [
            LoginService
        ]);
        
        it('should be welcoming', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
            return tcb.createAsync(AppComponent)
                .then(fixture => {
                    let compiled = fixture.debugElement.nativeElement;
                    
                    expect(compiled.querySelector('h1').innerText).toMatch(/velkommen/i);     
                });
        }));
    });
}