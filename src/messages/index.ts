// This module is in the midst of transitiong from Angular 1 to Angular 2.
// We migrated MessageTextCmp to Angular2.
import * as angular from 'angular';
import {NgModule} from '@angular/core';
import {UpgradeAdapter} from '@angular/upgrade';

import {Repository} from './repository';
import {MessageTextCmp} from './message_text_cmp';
import {MessagesCmp} from './messages_cmp';
import {MessageCmp} from './message_cmp';

export const MessagesModule = angular.module('MessagesModule', ['ngRoute']);

MessagesModule.component('messages', MessagesCmp);
MessagesModule.component('message', MessageCmp);
MessagesModule.service('repository', Repository);
MessagesModule.config(($routeProvider) => {
  $routeProvider
    .when('/messages/:folder',     {template : '<messages></messages>'})
    .when('/messages/:folder/:id', {template : '<message></message>'});
});

@NgModule({declarations: [MessageTextCmp]})
export class MessagesNgModule {
  static setAdapter(adapter: UpgradeAdapter) {
    // all components migrated to angular 2 can be downgraded here
    MessagesModule.directive('messageText', <any>adapter.downgradeNg2Component(MessageTextCmp));
    adapter.upgradeNg1Provider("repository", {asToken: Repository});
  }
}