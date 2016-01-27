import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import 'rxjs/add/operator/map';

import {Message} from '../models/message';

import {MessageRepository, Ref} from '../repositories/message-repository';

interface MessageUpdate { // Directly updatable properties
    votes: number;
}

function getPath(message : Message) {
    var path = [];
    
    while (message != null) {
        path.unshift(message.key);
        
        if (message.parent != null) path.unshift("replies");
        
        message = message.parent;
    }
    
    return path.join('/');
}

function getUpdate(message : Message) : MessageUpdate {
    return {votes: message.votes};
}

function getPush(message : Message) {
    return {
        text: message.text,
        date: message.date,
        author: message.author,
        votes: message.votes
    };
}

@Injectable()
export class MessageService {
    private _root : Ref;
    
    constructor(private _messageRepository : MessageRepository) {
         this._root = this._messageRepository.get();
    }
    
    fetch() {
        return new Observable<Message[]>(subscriber =>       
                this._root.on('value', snapshot => {
                    subscriber.next(snapshot.val());
                }))
            .map(data => Message.deserialize(data));
    }
    
    save(message: Message) {
        this._root
            .child(getPath(message))
            .update(getUpdate(message));
    }
    
    add(message: Message) {
        var ref = this._root;
        
        if (message.parent) ref = ref.child(getPath(message.parent)).child('replies');
        
        let newRef = ref.push(getPush(message));
            
        message.key = newRef.key();
    }
}