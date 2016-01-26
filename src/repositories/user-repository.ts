import {Injectable} from 'angular2/core';

import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

@Injectable()
export class UserRepository {
    get(username : string) : Observable<User | number> {
        return new Observable((subscriber : Subscriber<User | number>) => {
            subscriber.error(404);
            subscriber.complete();
        });
    }
    
    register(username : string) : Observable<User | number> {
        return new Observable((subscriber : Subscriber<User | number>) => {
            subscriber.next(new User(username));
            subscriber.complete();
        });
    }
}