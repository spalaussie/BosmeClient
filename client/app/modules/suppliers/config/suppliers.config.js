'use strict';
angular.module('com.module.suppliers')
  .run(function($rootScope,User, Supplier, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Suppliers'),
      'app.suppliers.list', 'ion-ios-people');

      Supplier.find({
        filter:{where: { userId: localStorage.getItem('currUserId')}}
      },function(data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Suppliers'),
          'bg-blue', 'ion-ios-people', data.length,
          'app.suppliers.list');
      });
  });
