import {
    TestComponentBuilder, 
    describe, 
    expect, 
    injectAsync, 
    it, 
    beforeEachProviders
} from 'angular2/testing';

import {AppComponent} from './app.component';

export function main() {
    describe('AppComponent', () => {    
        it('should be welcoming', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
            return tcb.createAsync(AppComponent)
                .then(fixture => {
                    let compiled = fixture.debugElement.nativeElement;
                    
                    expect(compiled.querySelector('h1').innerText).toMatch(/velkommen/i);     
                });
        }));
    });
}