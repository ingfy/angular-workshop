import {User} from './user';

export interface ISerializedMessage {
    text : string;
    author : string;
    date : string;
    votes : number;
    replies : {[key : string] : ISerializedMessage};
} 

export class Message {
    private _votes : number = 0;
    private _replies : Message[] = [];
    
    constructor(
        public key : string = null,
        public parent : Message = null,
        public text : string = '',
        public author : string = null,
        public date : Date = new Date(),
        votes : number = 0
    ) {
        if (this.parent != null) this.parent.addReply(this);
        
        this._votes = votes;
    }
    
    addReply(...replies : Message[]) { replies.forEach(reply => this._replies.push(reply)); }
    
    get replies() { return this._replies; }
    
    get isTopic() { return !this.parent; }
    
    get votes() { return this._votes; }
    upvote() { this._votes++; }
    downvote() { this._votes--; }
    
    get isAnonymous() {
        return this.author == null;
    }
    
    static serialize(messages : Message[]) : {[key : string] : ISerializedMessage} {
        return messages.reduce((map, message) => {
            map[message.key] = {
                text: message.text,
                author: message.author,
                date : message.date.toISOString(),
                votes: message.votes,
                replies: Message.serialize(message.replies)
            };
            
            return map;
        }, <{[key : string] : ISerializedMessage}>{});
    }
    
    static deserialize(messages, parent : Message = null) {
        let keys = Object.keys(messages);
        
        keys.sort((a, b) => messages[b].votes - messages[a].votes);
        
        return keys.map(key => {
            let source = messages[key];
            
            let message = new Message(
                key, 
                parent, 
                source.text, 
                source.author,
                new Date(source.date),
                source.votes);
                
            if (source.replies) {
                Message.deserialize(source.replies, message);
            }
            
            return message;
        });
    }
}