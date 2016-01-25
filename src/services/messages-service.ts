import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs';

import {Message} from '../models/message';
import {MESSAGES} from './mock-messages';

@Injectable()
export class MessagesService {
    getTopics() {
        return Observable.create(observer => {
            observer.onNext(MESSAGES);
            observer.onCompleted();
        });
    }
}