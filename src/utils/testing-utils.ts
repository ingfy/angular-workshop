import {
    ComponentFixture
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