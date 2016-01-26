import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {AppComponent} from './components/app.component';

// Application-level services
import {UserRepository} from './repositories/user-repository';
import {MessageRepository} from './repositories/message-repository';
import {LoginService} from './services/login-service';
import {MessageService} from './services/message-service';

bootstrap(AppComponent, [UserRepository, MessageRepository, LoginService, MessageService]);