import {
    describe,
    it,
    expect
} from 'angular2/testing';

import {Message} from './message';
import {User} from './user';

export function main() {
    describe('Message', () => {
        let m: Message;
        
        beforeEach(() => m = new Message());
            
        it('should start with 0 votes', () => {
            expect(m.votes).toBe(0);
        });
        
        it('should be market as a \'topic\' when it\'s the root', () => {
            expect(m.isTopic).toBe(true);
            
            let o = new Message(m);
            
            expect(o.isTopic).toBe(false);
        });
        
        it('should not allow vote manipulation', () => {
            m.votes = 50;
            
            expect(m.votes).toBe(0);
        });
        
        describe('upvote()', () => {
            it('should add a vote', () => {    
                m.upvote();
                            
                expect(m.votes).toBe(1);
            });
        });
        
        describe('downvote()', () => {
            it('should remove a vote', () => {
                m.downvote();
                
                expect(m.votes).toBe(-1);
            });
        });
        
        describe('signature', () => {
            it('should be \'anonym\' when author is not present', () => {
                expect(m.signature).toMatch(/anonym/i);
            });
            
            it('Should be the author\'s name when he or she is present', () => {
                let o = new Message(null, 'sometext', new User('The Man'));
                
                expect(o.signature).toMatch(/the man/i);
            });
        });
        
        describe('date', () => {
            it('should be the creation date if nothing is specified', () => {
                let now = new Date(Date.now());
                let o = new Message();
                
                expect(o.date.getFullYear()).toBe(now.getFullYear());
                expect(o.date.getMonth()).toBe(now.getMonth());
                expect(o.date.getDate()).toBe(now.getDate());
            });
        });
    });
}