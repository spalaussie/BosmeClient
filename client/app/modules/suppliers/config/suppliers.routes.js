'use strict';
angular.module('com.module.suppliers')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.suppliers', {
        abstract: true,
        url: '/suppliers',
        templateUrl: 'modules/suppliers/views/main.html'
      })
      .state('app.suppliers.list', {
        url: '',
        templateUrl: 'modules/suppliers/views/list.html',
        controller: 'SuppliersCtrl'
      })
      .state('app.suppliers.addsupplier', {
        url: '/addsupplier',
        templateUrl: 'modules/suppliers/views/supplierForm.html',
        controller: 'SuppliersCtrl'
      })
      .state('app.suppliers.editsupplier', {
         url: '/editsupplier/:supplierId',
         templateUrl: 'modules/suppliers/views/supplierForm.html',
        controller: 'SuppliersCtrl'
    })
      .state('app.suppliers.products', {
        url: '/supplier/:supplierId',
        templateUrl: 'modules/suppliers/views/listProducts.html',
        controller: 'SuppliersCtrl'
      })
  });
