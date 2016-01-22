import {
    TestComponentBuilder, 
    describe, 
    expect, 
    injectAsync, 
    it, 
    beforeEachProviders
} from 'angular2/testing';

import {AppComponent} from './app.component';


describe('AppComponent', () => {    
    it('should be welcoming', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        console.log('TestComponentBuilder', tcb);
        
        return tcb.createAsync(AppComponent)
            .then(fixture => {
                let compiled = fixture.debugElement.nativeElement;
                
                console.log(`We're actually testing! Promise!`);
                
                expect(compiled.querySelectorAll(compiled, 'h1')[0].innerText).toMatch(/welcome2thejungle/i);     
            });
    }));
});