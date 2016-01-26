import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {Message} from '../models/message';

import {MessageRepository, Ref} from '../repositories/message-repository';

interface MessageUpdate { // Directly updatable properties
    votes: number;
}

function getPath(message : Message) {
    var path = [];
    
    while (message.parent != null) {
        path.unshift(message.key);
        
        if (message.parent.parent != null) path.unshift("replies");
        
        message = message.parent;
    }
    
    return path.join('/');
}

function getUpdate(message : Message) : MessageUpdate {
    return {votes: message.votes};
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
                    subscriber.next(snapshot.value());
                }))
            .map(data => Message.deserialize(data));
    }
    
    save(message: Message) {
        this._root
            .child(getPath(message))
            .update(getUpdate(message));
    }
    
    add(message: Message) {
        let ref = this._root
            .child(getPath(message))
            .push(message);
            
        message.key = ref.key();
    }
}