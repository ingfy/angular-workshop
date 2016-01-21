import {
    TestComponentBuilder, 
    describe, 
    expect, 
    injectAsync, 
    it, 
    beforeEachProviders
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {AppComponent} from './app.component';

@Component({
    template: `<div><angular-workshop></angular-workshop></div>`,
    directives: [AppComponent]
})

class AppComponentTest {}


describe('AppComponent', () => {    
    it('should be welcoming', () => {
        injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) =>            
            tcb.createAsync(AppComponentTest)
                .then(root => {
                    root.detectChanges();
                    
                    let appComponentElement = root.debugElement.componentViewChildren[0].nativeElement;
                    
                    expect(DOM.querySelectorAll(appComponentElement, 'h1')[0].innerText).toMatch(/welcome/i);                        
                }));
    });
});