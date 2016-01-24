import {Injectable} from 'angular2/core';

import {User} from '../models/user';

@Injectable()
export class LoginService {
    public currentUser : User;
    
    login(username : string) : Promise<User> {
        this.currentUser = new User(username);
        
        return Promise.resolve(this.currentUser);
    }
    
    isLoggedIn() : boolean {
        return this.currentUser != null;
    }
}