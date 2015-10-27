'use strict';
angular.module('com.module.suppliers')
  .run(function($rootScope,User, Supplier, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Suppliers'),
      'app.suppliers.list', 'ion-ios-people');

      User.find({
        filter: {
          where: {isSupplier: true}
        }
      },function(data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Suppliers'),
          'bg-blue', 'ion-ios-people', data.length,
          'app.suppliers.list');
      });
  });
