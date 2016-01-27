import {
    describe,
    it,
    expect,
    injectAsync,
    TestComponentBuilder,
    ComponentFixture
} from 'angular2/testing';

import {Component} from 'angular2/core';

import {TimeStampComponent} from './time-stamp.component';

function getSecondsAgo(n) {
    let d = new Date();
    d.setSeconds(d.getSeconds() - n);
    
    return d;
}

function getMinutesAgo(n) {
    let d = new Date();
    d.setMinutes(d.getMinutes() - n);
    
    return d;
}

function getYearAgo(n) {
    let d = new Date();
    d.setFullYear(d.getFullYear() - n);
    
    return d;
}

export function main() {
    describe('TimeStampComponent', () => {
        it('should display "Seconds ago" when it\'s only seconds ago', injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(TestTimeStampComponent)
                .then((fixture: ComponentFixture) => {
                    fixture.componentInstance.date = getSecondsAgo(5);
                    
                    fixture.detectChanges();
                    
                    expect(fixture.debugElement.nativeElement.innerText).toContain('Seconds ago');
                });
        }));
        
        it('should display "Less than a minute ago" when it\'s less than sixty seconds ago', injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(TestTimeStampComponent)
                .then((fixture: ComponentFixture) => {
                    fixture.componentInstance.date = getSecondsAgo(50);
                    
                    fixture.detectChanges();
                    
                    expect(fixture.debugElement.nativeElement.innerText).toContain('Less than a minute ago');
                });
        }));
        
        it('should display "Less than an hour ago" when it\'s less than sixty minutes ago', injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(TestTimeStampComponent)
                .then((fixture: ComponentFixture) => {
                    fixture.componentInstance.date = getMinutesAgo(50);
                    
                    fixture.detectChanges();
                    
                    expect(fixture.debugElement.nativeElement.innerText).toContain('Less than an hour ago');
                });
        }));
        
        it('should display the date in YYYY-M-D format when it\s more than an hour ago', injectAsync([TestComponentBuilder], tcb => {
            return tcb
                .createAsync(TestTimeStampComponent)
                .then((fixture: ComponentFixture) => {
                    fixture.componentInstance.date = getMinutesAgo(61);
                    
                    fixture.detectChanges();
                    
                    expect(fixture.debugElement.nativeElement.innerText).toContain(
                        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`
                    );
                });
        }));
    });
}

@Component({
    selector: 'time-stamp-test',
    template: '<div><time-stamp [date]="date"></time-stamp></div>',
    directives: [TimeStampComponent]
})

class TestTimeStampComponent {
    date: Date;
}