import {
    ComponentFixture,
    expect
} from 'angular2/testing';

export interface DOMElement {
    querySelector: (selector: string) => DOMElement;
    querySelectorAll: (selector: string) => DOMElement[];
    innerText: string;
}

export function getCompiled(fixture: ComponentFixture) {
    fixture.detectChanges();
    
    return <DOMElement>fixture.debugElement.nativeElement;
}

export function expectToBeSameDay(d1 : Date, d2 : Date) {
    expect(d1.getFullYear()).toBe(d2.getFullYear());
    expect(d1.getMonth()).toBe(d2.getMonth());
    expect(d1.getDate()).toBe(d2.getDate());
}