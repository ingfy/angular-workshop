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
        
        beforeEach(() => m = new Message("one"));
            
        it('should start with 0 votes', () => {
            expect(m.votes).toBe(0);
        });
        
        it('should be market as a \'topic\' when it\'s the root', () => {
            expect(m.isTopic).toBe(true);
            
            let o = new Message("one.one", m);
            
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
        
        describe('isAnonymous', () => {
            it('should be \'true\' when author is not present', () => {
                expect(m.isAnonymous).toBe(true);
            });
            
            it('should be \'false\' when he or she is present', () => {
                let o = new Message("two", null, 'sometext', 'The Man');
                
                expect(o.isAnonymous).toBe(false);
            });
        });
        
        describe('date', () => {
            it('should be the creation date if nothing is specified', () => {
                let now = new Date(Date.now());
                let o = new Message("two");
                
                expect(o.date.getFullYear()).toBe(now.getFullYear());
                expect(o.date.getMonth()).toBe(now.getMonth());
                expect(o.date.getDate()).toBe(now.getDate());
            });
        });
        
        describe('children', () => {
            it('should not list any children for an empty node', () => {
                expect(m.replies.length).toBe(0);
            });
            
            it('should automatically add itself as a child to parent through constructor', () => {
                let o = new Message("two", m);
                
                expect(m.replies.length).toBe(1);
                expect(m.replies[0]).toBe(o);
            });
        });
    });
}