'use strict';
var app = angular.module('com.module.orders');

function OrderModalInstanceCtrl($scope, $state, $stateParams,ApiService, AppAuth, $location, CoreService, Supplier, gettextCatalog, $modalInstance,ProductOrder,User, Order, currOrder) {


  var order = currOrder, lstOrderLine=[];
  $scope.order = {
    userName: '',
    deliveryDate: '',
    orderLine: []
  };

  var productOrders=order.productOrders;
  productOrders.sort(function(a, b){return a.productId- b.productId});
  var user= order.user;

  loadOrder();

  function loadOrder() {
    if (order) {
      if (order.products.length > 0) {
        for (var i = 0; i < order.products.length; i++) {
          if (order.products[i].id == productOrders[i].productId) {
            orderLine = initOrderLine();
            orderLine.productName = order.products[i].name;
            orderLine.unit = order.products[i].unit;

            orderLine.quantity = productOrders[i].quantity;
            lstOrderLine.push(orderLine);
          }
        }

        $scope.order.orderLine = lstOrderLine;
        $scope.order.userName = user.username;
        $scope.order.deliveryDate = order.deliverydate;
      }
    }
  }

  //getOrder(order);

  var listOrderLine = [];

  var orderLine = {
    productName: '',
    unit: '',
    quantity: 0
  };

  function initOrderLine() {
    var orderLine1 = {};
    orderLine1.productName = '';
    orderLine1.unit = '';
    orderLine1.quantity = 0;
    return orderLine1;
  }


  function getOrder(order){
    var lstOrderLine = [];
    angular.forEach(order.products, function (product, $index) {
      orderLine = initOrderLine();
        orderLine.productName = product.name,
        orderLine.unit = product.unit,
        orderLine.quantity = order.productOrders[$index].quantity
      lstOrderLine.push(orderLine);
    })

    $scope.order.orderLine = lstOrderLine;
    $scope.order.userName=order.user.username;
    $scope.order.deliveryDate= order.deliverydate;
  }


  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.cancel = function () {

  };

 }
app.controller('OrderModalInstanceCtrl', OrderModalInstanceCtrl);
