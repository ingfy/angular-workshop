import {
    describe,
    it,
    expect
} from 'angular2/testing';

import {Message} from './message';
import {User} from './user';

import {expectToBeSameDay} from '../utils/testing-utils';

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
        
        describe('serialize', () => {
            let single;
            let tree;
            
            beforeEach(() => {
                single = new Message("one", null, "Hei");
                
                tree = new Message("root", null, "Hade");
                tree.addReply(single);
            });
            
            it('should correctly serialize a single message', () => {
                let serialized = Message.serialize([single]);
                
                let one = serialized["one"];
                
                expect(one).not.toBe(null);
                expect(one.text).toBe("Hei");
            });
            
            it('should correctly serialize replies', () => {
                let serialized = Message.serialize([tree]);
                
                let root = serialized["root"];
                
                expect(root).not.toBe(null);
                expect(Object.keys(root.replies).length).toBe(1);
                
                let reply = root.replies["one"];
                
                expect(reply).not.toBe(null);
                expect(reply.text).toBe("Hei");
            });
        });
        
        describe('deserialize', () => {
            let first;
            let second;
            let outOfOrder;
            
            beforeEach(() => {
                first = {"one": {
                    text: "Hei", 
                    date: new Date(), 
                    votes: 3,
                    replies: []
                }};
                
                second = {"two": {
                    text: "Hade",
                    date: new Date(),
                    votes: -1,
                    replies: {
                        "two.one": {
                            text: "Hei igjen!",
                            date: new Date(),
                            votes: 300
                        }
                    }
                }};
                
                outOfOrder = Object.assign({}, second, first);
            });
            
            it('should correctly deserialize a single message', () => {
                let deserialized = Message.deserialize(first);
                
                let one = deserialized[0];
                
                expect(one.key).toBe("one");
                expect(one.text).toBe("Hei");
                expectToBeSameDay(one.date, new Date())
                expect(one.votes).toBe(3);
            });
            
            it('should correctly deserialize replies', () => {
                let deserialized = Message.deserialize(second);
                
                let two = deserialized[0];
                
                let twoOne = two.replies[0];
                
                expect(twoOne.key).toBe("two.one");
                expect(twoOne.text).toBe("Hei igjen!");
                expectToBeSameDay(twoOne.date, new Date());
                expect(twoOne.votes).toBe(300);
            });
            
            it('should deserialize and sort replies correctly', () => {
                let deserialized = Message.deserialize(outOfOrder);
                
                expect(deserialized[0].votes).toBeGreaterThan(deserialized[1].votes);
            });
        });
    });
}