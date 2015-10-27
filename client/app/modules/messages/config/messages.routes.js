'use strict';
angular.module('com.module.messages')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.messages', {
        abstract: true,
        url: '/messages',
        templateUrl: 'modules/messages/views/main.html'
      })
      .state('app.messages.list', {
        url: '',
        templateUrl: 'modules/messages/views/list.html',
        controller: 'MessagesCtrl'
      })
      .state('app.messages.addmessage', {
        url: '/addmessage',
        templateUrl: 'modules/messages/views/messageform.html',
        controller: 'MessagesCtrl'
      })
      .state('app.messages.editmessage', {
        url: '/editmessage/:messageId',
        templateUrl: 'modules/messages/views/messageform.html',
        controller: 'MessagesCtrl'
      })
  });
