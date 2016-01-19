/// <reference path="../../typings/jasmine/jasmine.d.ts" /> 

import {Other} from './other';

it('initial value is zero', () => {
    let calc = new Other.Calculator();
    
    expect(calc.result).toBe(0);
});