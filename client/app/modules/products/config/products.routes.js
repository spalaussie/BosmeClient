'use strict';
angular.module('com.module.products')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.products', {
        abstract: true,
        url: '/products',
        templateUrl: 'modules/products/views/main.html'
      })
      .state('app.products.list', {
        url: '',
        templateUrl: 'modules/products/views/list.html',
        controller: 'ProductsCtrl'
      })
      .state('app.products.addproduct', {
        url: '/addproduct',
        templateUrl: 'modules/products/views/form.html',
        controller: 'ProductsFormCtrl',
        controllerAs: 'ctrl',
        resolve: {
          categories: function (Category, AppAuth) {
            return Category.find({
              filter:{where: { userId: localStorage.getItem('$LoopBack$currentUserId')}}
            }).$promise;
          },
          suppliers: function (Supplier) {
            return Supplier.find({
              filter:{where: { userId:  localStorage.getItem('$LoopBack$currentUserId')}}
            }).$promise;
          },
          url: function () {
            return {
              returnUrl: 'app.products'
            };
          },
          product: function ($stateParams) {
            return {
              categoryId: $stateParams.categoryId
            };
          }
        }
      })

      .state('app.products.editproduct', {
        url: '/editproduct/:productId',
        templateUrl: 'modules/products/views/form.html',
        controller: 'ProductsFormCtrl',
        controllerAs: 'ctrl',
        resolve: {
          categories: function (Category) {
            return Category.find({
              filter:{where: { userId:  localStorage.getItem('$LoopBack$currentUserId')}}
            }).$promise;
          },
          suppliers: function (Supplier) {
            return Supplier.find({
              filter:{where: { userId:  localStorage.getItem('$LoopBack$currentUserId')}}
            }).$promise;
          },
          url: function () {
            return {
              returnUrl: 'app.products'
            };
          },
          product: function ($stateParams, Product) {
            return Product.findById({id: $stateParams.productId}).$promise;
          }
        }
      })

      .state('app.products.addCategoryProduct', {
        url: '/addCategoryProduct/:categoryId',
        templateUrl: 'modules/products/views/form.html',
        controller: 'ProductsFormCtrl',
        controllerAs: 'ctrl',
        resolve: {
          categories: function ($stateParams, Category) {
            return Category.find({
              filter: {where: {id: $stateParams.categoryId}}
            }).$promise;
          },
          suppliers: function (Supplier) {
            return Supplier.find({
              filter: {where: {userId: localStorage.getItem('$LoopBack$currentUserId')}}
            }).$promise;
          },
          url: function () {
            return {
              returnUrl: 'app.categories.products'
            };
          },
          product: function ($stateParams) {
            return {
              categoryId: $stateParams.categoryId
            };
          }
        }
      })
      .state('app.products.editCategoryProduct', {
        url: '/editCategoryProduct/:categoryId?productId',
        templateUrl: 'modules/products/views/form.html',
        controller: 'ProductsFormCtrl',
        controllerAs: 'ctrl',
        resolve: {
          categories: function ($stateParams, Category) {
            return Category.find({
              filter: {where: {id: $stateParams.categoryId}}
            }).$promise;
          },
          suppliers: function (Supplier) {
            return Supplier.find({
              filter: {where: {userId: localStorage.getItem('$LoopBack$currentUserId')}}
            }).$promise;
          },
          url: function () {
            return {
              returnUrl: 'app.categories.products'
            };
          },
          product: function ($stateParams, Product) {
            return Product.findById({id: $stateParams.productId}).$promise;
          }
        }
      })

      .state('app.products.addSupplierProduct', {
        url: '/addSupplierProduct/:supplierId',
        templateUrl: 'modules/products/views/form.html',
        controller: 'ProductsFormCtrl',
        controllerAs: 'ctrl',
        resolve: {
          suppliers: function ($stateParams,Supplier) {
            return Supplier.find({
              filter:{where: {id: $stateParams.supplierId}}
            }).$promise;
          },
          categories: function (Category) {
            return Category.find({
              filter:{where: { userId:  localStorage.getItem('$LoopBack$currentUserId')}}
            }).$promise;
          },
          url: function () {
            return {
              returnUrl: 'app.suppliers.products'
            };
          },
          product: function ($stateParams) {
            return {
              categoryId: $stateParams.categoryId
            };
          }
        }
      })

      .state('app.products.editSupplierProduct', {
        url: '/editSupplierProduct/:supplierId?productId',
        templateUrl: 'modules/products/views/form.html',
        controller: 'ProductsFormCtrl',
        controllerAs: 'ctrl',
        resolve: {
          suppliers: function ($stateParams, Supplier) {
            return Supplier.find({
              filter: {where: {id: $stateParams.supplierId}}
            }).$promise;
          },
          categories: function (Category) {
            return Category.find({
              filter: {where: {userId: localStorage.getItem('$LoopBack$currentUserId')}}
            }).$promise;
          },
          url: function () {
            return {
              returnUrl: 'app.suppliers.products'
            };
          },
          product: function ($stateParams, Product) {
            return Product.findById({id: $stateParams.productId}).$promise;
          }
        }
      })
    ;
  });
