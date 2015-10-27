'use strict';
angular.module('com.module.orders')
  .run(function($rootScope,User, Order, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Orders'),
      'app.orders.list', 'ion-navigate');

      Order.find({
        filter:{where: { userId: localStorage.getItem('currUserId')}}
      },function(data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Orders'),
          'bg-yellow', 'ion-navigate', data.length,
          'app.orders.list');
    });

  });
