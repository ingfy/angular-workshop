import {Injectable} from 'angular2/core';

import {User} from '../models/user';
import {UserRepository} from '../repositories/user-repository';

@Injectable()
export class LoginService {
    private _currentUser : User;
    
    constructor(
        private _userRepository : UserRepository
    ) {
        let storedUser = localStorage.getItem("user");
        if (storedUser) this._currentUser = new User(storedUser);
    }
    
    logout() : Promise<any> {
        return new Promise<any>((resolve) => {
            setTimeout(() => {
                localStorage.removeItem("user");
                this._currentUser = null;
                resolve();
            }, 0);
        });
    }
    
    login(username : string) : Promise<User> {
        return new Promise<User>((resolve, reject) => {
                let getUserStream = this._userRepository.get(username);
                let registerUserStream = this._userRepository.register(username);
                
                getUserStream.subscribe(
                    user => resolve(<User>user),
                    error => {
                        if (error != 404) return reject(error);
                        
                        registerUserStream.subscribe(
                            user => resolve(<User>user),
                            error => reject(error));
                    });
            })
            .then(user => {
                localStorage.setItem("user", user.name);
                
                return this._currentUser = user;
            });
    }
    
    get isLoggedIn() {
        return this._currentUser != null;
    }
    
    get currentUser() {
        return this._currentUser;
    }
}