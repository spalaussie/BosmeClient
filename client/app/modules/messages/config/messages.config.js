'use strict';
angular.module('com.module.messages')
  .run(function($rootScope,User, Message, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Inbox'),
      'app.messages.list', 'ion-email');

      Message.find({
        filter:{where: {and:[{ userId: localStorage.getItem('$LoopBack$currentUserId')},{read:false}]}}
      },function(data) {
        //console.log(data);
        $rootScope.addDashboardBox(gettextCatalog.getString('Inbox'),
          'bg-aqua', 'ion-email', data.length,
          'app.messages.list');
      });
  });
