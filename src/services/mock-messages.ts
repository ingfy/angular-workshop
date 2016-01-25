import {Message} from '../models/message';
import {User} from '../models/user';

let coldWinter = new Message(null, `Hei hei hei. 
Hvorfor har Asia så kaldt vær og vi får mildvær?`, null, new Date(2016, 0, 23));

coldWinter.upvote();
coldWinter.upvote();
coldWinter.upvote();

let yeahThoseBastards = new Message(coldWinter, `Ja, de skurkene stjal vinteren vår!`, null, new Date(2016, 0, 24));

yeahThoseBastards.downvote();

let shameOnYou = new Message(yeahThoseBastards, `Din slemming!`);

let mrPizza = new User('Mr. Pizza');

let pizzaTopic = new Message(null, `La oss snakke om noe annet.

Noen som vil ha pizza?`, mrPizza, new Date(2016, 0, 24));

pizzaTopic.upvote();

let pizzaLover = new User('PizzaLover123');

let yesWeWant = new Message(pizzaTopic, `Ja! Jeg vil ha tacopizza!`, pizzaLover);

let man = new User('Enslig, 44');

let lonely = new Message(null, `Jeg er så ensom her nede alene....`, man);

export var MESSAGES: Message[] = [
    coldWinter,
    pizzaTopic,
    lonely
];