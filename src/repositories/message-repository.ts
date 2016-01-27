import {Injectable} from 'angular2/core';

import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import {Subscription} from 'rxjs/Subscription';

import {Message, ISerializedMessage} from '../models/message';

import {MESSAGES} from './mock-messages';

function splitPath(path: string) {
    return path !== "" ? path.split('/') : [];
}

function _isSubPath(parent: string[], full: string[]) {
    if (parent.length === 0) return true; // The root is parent of all paths    
    
    if (parent.shift() !== full.shift()) return false;
    
    return _isSubPath(parent, full);
}

function isSubPath(parent: string, full: string) {
    return _isSubPath(splitPath(parent), splitPath(full));
}

function join(...paths: string[]) { return paths.join('/'); }

export class Snapshot {
    constructor(private _object : any) {}
       
    val() {
        return this._object;
    }
}

export class Ref {
    constructor(
        public path: string,
        private _messageRepository: MessageRepository
    ) {}
    
    key() {
        return this.path.split('/').slice(-1)[0];
    }
    
    update(data) {
        return this._messageRepository.update(this, data);
    }
    
    push(data) {
        return this._messageRepository.push(this, data);
    }
    
    private _updateStreams: {[event: string]: Subscription<Snapshot>[]} = {};
    
    once(event: string, callback: (snapshot: Snapshot) => void) {
        this._messageRepository.fetch(this, event).subscribe(callback);
    }
    
    on(event: string, callback: (snapshot: Snapshot) => void) {
        let updateStream = this._messageRepository.subscribe(this, event);
        
        let subscription = updateStream.subscribe(callback);
            
        if (!this._updateStreams[event]) this._updateStreams[event] = []; 
        this._updateStreams[event].push(subscription);
    }
    
    off(event: string = null) {
        this._messageRepository.unsubscribe(this, event);
        
        let events = event ? [event] : Object.keys(this._updateStreams);
        
        events
            .map(e => this._updateStreams[e])
            .reduce((a, b) => a.concat(b))  // Flatten
            .forEach(subscription => subscription.unsubscribe);
    }
    
    child(path: string) {
        let fullPath = this.path ? join(this.path, path) : path;
        
        return this._messageRepository.get(fullPath);
    }
}

interface ISubscription {
    ref : Ref;
    event : string;
    notify: Function;
}

const BASE_PATH = '';

function getData() {
    if (!localStorage.getItem("messages")) 
        saveData(Message.serialize(MESSAGES));
    
    return JSON.parse(localStorage.getItem("messages"));
}

function saveData(data) {
    localStorage.setItem("messages", JSON.stringify(data));
}


function resolve(path: string[], object) {        
    if (path.length == 0) return object;
    
    let key = path.shift();
    
    if (object[key] === undefined) {
        object[key] = {};
    }
    
    return resolve(path, object[key]);
}

@Injectable()
export class MessageRepository {
    private _data = getData();      
    
    private _resolve(path: string) : (ISerializedMessage | {[key: string]: ISerializedMessage}) {
        return resolve(splitPath(path), this._data);
    }
    
    private _getSnapshot(path: string) {
        return new Snapshot(this._resolve(path));
    }
    
    private _nextId() {
        return Date.now().toString(16);
    }
    
    private _saveData() {
        saveData(this._data);
    }
    
    private _notify(path: string, event: string) {
        this._subscriptions
            .filter(sub => sub.event === event && isSubPath(sub.ref.path, path))
            .forEach(sub => sub.notify());
    }
    
    ref(path: string) {
        return new Ref(path, this);
    }
    
    private _subscriptions: ISubscription[] = [];
    
    private _setupObservable(ref: Ref, event: string, addSubscription: boolean): Observable<Snapshot> {
        return new Observable(subscriber => {
            subscriber.next(this._getSnapshot(ref.path));
            
            if (!addSubscription) {
                subscriber.complete();
            } else {            
                this._subscriptions.push({ref: ref, event: event, notify: () => {
                    subscriber.next(this._getSnapshot(ref.path));
                }});
            }
        });
    }
    
    fetch(ref: Ref, event: string) {
        return this._setupObservable(ref, event, false);
    }
    
    subscribe(ref: Ref, event: string) {
        return this._setupObservable(ref, event, true);
    }
    
    unsubscribe(ref: Ref, event: string) {
        this._subscriptions = 
            this._subscriptions.filter(s => s.ref != ref && (!event || s.event == event));
    }
        
    get(path: string = BASE_PATH) {    
        return this.ref(path);
    }
    
    update(ref: Ref, data) {
        let target = this._resolve(ref.path);
            
        Object.assign(target, data);
        
        this._notify(ref.path, 'value');
        
        this._saveData();
            
        return ref;
    }
    
    push(ref: Ref, data) {
        let id = this._nextId();
        
        let nextPath = join(ref.path, id);
        
        let target = this._resolve(ref.path);
            
        target[id] = data;
        
        this._notify(nextPath, 'value');
        this._notify(ref.path, 'child_added');
        
        this._saveData();
        
        return this.ref(nextPath);
    }
}