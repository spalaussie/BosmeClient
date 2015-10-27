'use strict';
angular.module('com.module.categories')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.categories', {
        abstract: true,
        url: '/categories',
        templateUrl: 'modules/categories/views/main.html'
      })
      .state('app.categories.list', {
        url: '',
        templateUrl: 'modules/categories/views/list.html',
        controller: 'CategoriesCtrl'
      })
      .state('app.categories.addcategory', {
        url: '/addcategory',
        templateUrl: 'modules/categories/views/categoryform.html',
        controller: 'CategoriesCtrl'
      })
      .state('app.categories.editcategory', {
        url: '/editcategory/:categoryId',
        templateUrl: 'modules/categories/views/categoryform.html',
        controller: 'CategoriesCtrl'
      })
      .state('app.categories.products', {
        url: '/category/:categoryId',
        templateUrl: 'modules/categories/views/listProducts.html',
        controller: 'CategoriesCtrl'
      })
  });
