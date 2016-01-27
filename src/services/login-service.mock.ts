import {User} from '../models/user';

export var USERNAME = "Mr. User";

export class LoggedInService {
    public currentUser : User = new User(USERNAME);
    
    login(username : string) : Promise<User> {
        return Promise.resolve(this.currentUser);
    }
    
    get isLoggedIn() { return this.currentUser != null; };
    
    logout() {
        this.currentUser = null;
    }
}

export class LoggedOutService {
    public currentuser : User;
    
    login(username : string) : Promise<User> {
        return new Promise((resolve, reject) => 
            reject("Cannot log in users to the LoggedOutService"));
    }
    
    get isLoggedIn() { return false; }
}