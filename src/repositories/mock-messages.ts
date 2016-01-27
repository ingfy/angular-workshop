import {Message} from '../models/message';

let coldWinter = new Message("one", null, `Hei hei hei. 
Hvorfor har Asia så kaldt vær og vi får mildvær?`, null, new Date(2016, 0, 23), 3);

let yeahThoseBastards = new Message("one.one", coldWinter, `Ja, de skurkene stjal vinteren vår!`, null, new Date(2016, 0, 24), -1);

yeahThoseBastards.downvote();

let shameOnYou = new Message("one.one.one", yeahThoseBastards, `Din slemming!`);

let pizzaTopic = new Message("two", null, `La oss snakke om noe annet.

Noen som vil ha pizza?`, 'Mr. Pizza', new Date(2016, 0, 24));

pizzaTopic.upvote();

let yesWeWant = new Message("two.one", pizzaTopic, `Ja! Jeg vil ha tacopizza!`, 'PizzaLover123');

let lonely = new Message("three", null, `Jeg er så ensom her nede alene....`, 'Enslig, 44');

export var MESSAGES: Message[] = [coldWinter, pizzaTopic, lonely];