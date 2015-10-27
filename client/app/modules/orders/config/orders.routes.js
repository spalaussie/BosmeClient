'use strict';
angular.module('com.module.orders')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.orders', {
        abstract: true,
        url: '/orders',
        templateUrl: 'modules/orders/views/main.html'
      })
      .state('app.orders.list', {
        url: '',
        templateUrl: 'modules/orders/views/list.html',
        controller: 'OrdersCtrl'
      })

      .state('app.orders.listSupplier', {
        url: '/suppliers',
        templateUrl: 'modules/orders/views/listSuppliers.html',
        controller: 'OrdersCtrl'
      })

      .state('app.orders.view', {
        url: '/:orderId',
        templateUrl: 'modules/orders/views/view.html',
        controller: 'OrdersCtrl'

      })

      .state('app.orders.addorder', {
        url: '/addorder/:orderId',
        templateUrl: 'modules/orders/views/orderForm.html',
        controller: 'OrdersFormCtrl'
      })


    .state('app.orders.editorder', {
      url: '/editorder/:orderId',
      templateUrl: 'modules/orders/views/orderForm.html',
      controller: 'OrdersFormCtrl'
    })

  });
