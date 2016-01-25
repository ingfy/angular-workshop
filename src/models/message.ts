import {User} from './user';

export class Message {
    private _votes : number = 0;
    
    constructor(
        public parent : Message = null,
        public text : string = '',
        public author : User = null,
        public date : Date = new Date(),
        private _children : Message[] = []
    ) {
        if (this.parent != null) this.parent.addChild(this);
    }
    
    addChild(child : Message) { this._children.push(child); }
    
    get children() { return this._children; }
    
    get isTopic() { return !this.parent; }
    
    get votes() { return this._votes; }
    upvote() { this._votes++; }
    downvote() { this._votes--; }
    
    get isAnonymous() {
        return this.author == null;
    }
}