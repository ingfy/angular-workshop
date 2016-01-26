import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {Message} from '../models/message';
import {MESSAGES} from '../repositories/mock-messages';

function sortMessages(messages: Message[]) {
    messages.sort((a, b) => b.votes - a.votes);
}

function sortSiblings(message : Message) {
    sortMessages(message.parent.replies);
}

@Injectable()
export class MockMessageService {
    private MOCK_ID = 1234;
    
    private _notify : Function = () => {};
    
    fetch() {
        return new Observable(subscriber => {
            this._notify = () => subscriber.next(MESSAGES);
            
            this._notify();
            
            subscriber.complete(); 
        });
    }
    
    private _sortSiblings(message: Message) {
        if (message.parent) {
            sortSiblings(message);
        } else {
            sortMessages(MESSAGES);
            this._notify();
        }
    }
    
    save(message: Message) {
        this._sortSiblings(message);
    }
    
    add(message: Message) {
        message.key = (this.MOCK_ID++).toString(16);
        this._sortSiblings(message);
    }
}