'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:MainCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $state
 * @requires $location
 * @requires CoreService
 * @requires User
 * @requires gettextCatalog
 **/
angular.module('com.module.core')
  .controller('MainCtrl', function($scope, $rootScope, $state, $location,
    CoreService, User, gettextCatalog, Product, Category, Supplier, Order,Message) {

    $scope.currentUser = User.getCurrent();

    if($rootScope.dashboardBox) {

      angular.forEach($rootScope.dashboardBox, function (box) {

        switch (box.name) {
          case "Categories":
            Category.find({
              filter: {where: {userId: localStorage.getItem('$LoopBack$currentUserId')}}
            }, function (categories) {
              box.quantity = categories.length;
            });
            break;
          case "Suppliers":
            User.find({
              filter: {
                where: {isSupplier: true}
              }
            },function(suppliers) {
              box.quantity = suppliers.length;
            });
            break;
          case "Products":
            Product.find({
              filter: {where: {userId: localStorage.getItem('$LoopBack$currentUserId')}}
            }, function (products) {
              box.quantity = products.length;
            });
            break;
          case "Orders":
            Order.find({
              filter: {where: {userId: localStorage.getItem('$LoopBack$currentUserId')}}
            }, function (orders) {
              box.quantity = orders.length;
            });
            break;
          case "Messages":
            Message.find({
              filter: {
                where: {
                  and: [{userId: localStorage.getItem('$LoopBack$currentUserId')}, {read: 0}]
                }
              }
            }, function (messages) {
              box.quantity = messages.length;
            });
            break;
        }
      })
    }

    $scope.menuoptions = $rootScope.menu;

    $scope.logout = function() {
      User.logout(function() {
        $state.go('login');
        localStorage.clear();

        CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
          gettextCatalog.getString('You are logged out!'));
      });
    };

  });
