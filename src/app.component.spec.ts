/// <reference path="../typings/jasmine/jasmine.d.ts" /> 

import {AppComponent} from './app.component';

describe('AppComponent', () => {
    let component:AppComponent;
    
    beforeEach(() => component = new AppComponent());
    
    it('true is true', () => expect(true).toEqual(true));
});
