import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {Message} from '../models/message';
import {MESSAGES} from './mock-messages';

function findParent(current: Message | MessageService, match: Message): Message | MessageService {
    // TODO: tree search
}

@Injectable()
export class MessageService {
    private _messages = MESSAGES;
    
    get children() { return this._messages; }
    
    getTopics() {
        return new Observable<Message[]>((subscriber: Subscriber<Message[]>) => {
            subscriber.next(this._messages);
            subscriber.complete();
        });
    }
    
    update(message: Message): Observable<Message> {
        return new Observable<Message>((subscriber: Subscriber<Message>) => {
            let parent = findParent(this, message);
            
            parent.children.sort(message => message.votes);
            
            subscriber.next(message);
            subscriber.complete();
        });
    }
}