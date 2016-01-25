import {User} from './user';

export class Message {
    private _votes : number = 0;
    
    constructor(
        public parent : Message = null,
        public text : string = '',
        public author : User = null,
        public date : Date = new Date()
    ) {}
    
    get isTopic() { return !this.parent; }
    
    get votes() { return this._votes; }
    upvote() { this._votes++; }
    downvote() { this._votes--; }
    
    get signature() {
        return this.author ? this.author.name : 'Anonym';
    }
}