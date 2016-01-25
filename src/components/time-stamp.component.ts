import {Component} from 'angular2/core';
import {Input} from 'angular2/core';

@Component({
    selector: 'time-stamp',
    template: `
        <span>{{formattedDate}}</span>
    `
})

export class TimeStampComponent {
    @Input() date : Date;
    
    private _now = new Date(Date.now());
    
    get formattedDate() {
        let msSinceMessage = this._now.getTime() - this.date.getTime(); 
        
        if (msSinceMessage < 1000) return 'Seconds ago';
        if (msSinceMessage < 60 * 1000) return 'Less than a minute ago';
        if (msSinceMessage < 60 * 60 * 1000) return 'Less than an hour ago';
        
        return `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate() + 1}`;
    }
}
