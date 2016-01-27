import { 
    describe, 
    it,
    beforeEach,
    expect,
    inject
} from 'angular2/testing';

import { LoginService } from './login-service';
import { UserRepository } from '../repositories/user-repository';

export function main() {
    describe('LoginService', () => {
        let loginService : LoginService;
        
        beforeEach(() => {
            localStorage.removeItem("user");
            loginService = new LoginService(new UserRepository());
        });
        
        it('should by default not have a logged in user', () => {
            expect(loginService.currentUser).toBe(undefined);
        });
        
        describe('#login()', () => {
            it('should update the logged in user', () => {
                return loginService.login('You')
                    .then(user => expect(loginService.currentUser.name).toBe('You'));
            });
        });
    });
}