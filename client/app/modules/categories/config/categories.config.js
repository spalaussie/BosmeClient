'use strict';
angular.module('com.module.categories')
  /*.run(function($rootScope,User, Category, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Categories'),
      'app.categories.list', 'ion-folder');

      Category.find({
        filter:{where: { userId: localStorage.getItem('currUserId')}}
      },function(data) {
        //console.log(data);
        $rootScope.addDashboardBox(gettextCatalog.getString('Categories'),
          'bg-aqua', 'ion-folder', data.length,
          'app.categories.list');
      });
  })*/;
