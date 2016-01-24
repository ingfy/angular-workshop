import { 
    describe, 
    expect,  
    it,
    beforeEach
} from 'angular2/testing';

import {Calculator} from './other';

export function main() {
    describe('other.Calculator', () => {
        let calc : Calculator;
        
        beforeEach(() => calc = new Calculator());
        
        it('initial value is zero', () => {
            expect(calc.result).toBe(0);
        });
        
        it('can add a number', () => {
            calc.add(10);
            
            expect(calc.result).toBe(10); 
        });
        
        it('can add several numnbers', () => {
            calc.add(10);
            calc.add(5);
            
            expect(calc.result).toBe(15);
        });
    });
};