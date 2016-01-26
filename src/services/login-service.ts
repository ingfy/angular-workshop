import {Injectable} from 'angular2/core';

import {User} from '../models/user';
import {UserRepository} from '../repositories/user-repository';

@Injectable()
export class LoginService {
    private _currentUser : User;
    
    constructor(
        private _userRepository : UserRepository
    ) {}
    
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
            .then(user => this._currentUser = user);
    }
    
    get isLoggedIn() {
        return this._currentUser != null;
    }
    
    get currentUser() {
        return this._currentUser;
    }
}