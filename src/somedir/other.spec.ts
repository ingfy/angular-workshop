/// <reference path="../../typings/jasmine/jasmine.d.ts" /> 

import {Calculator} from './other';

describe('other.Calculator', () => {
    it('initial value is zero', () => {
        let calc = new Calculator();
        
        expect(calc.result).toBe(0);
    });
    
    it('can add a number', () => {
       let calc = new Calculator();
       
       calc.add(10);
       
       expect(calc.result).toBe(10); 
    });
    
    it('can add several numnbers', () => {
        let calc = new Calculator();
        
        calc.add(10);
        calc.add(5);
        
        expect(calc.result).toBe(15);
    });
});