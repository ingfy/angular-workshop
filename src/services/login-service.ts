import {Injectable} from 'angular2/core';

import {User} from '../models/user';

@Injectable()
export class LoginService {
    private _currentUser : User;
    
    login(username : string) : Promise<User> {
        this._currentUser = new User(username);
        
        return Promise.resolve(this._currentUser);
    }
    
    get isLoggedIn() {
        return this._currentUser != null;
    }
    
    get currentUser() {
        return this._currentUser;
    }
}