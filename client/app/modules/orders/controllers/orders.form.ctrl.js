'use strict';
var app = angular.module('com.module.orders');

function OrdersFormCtrl($scope, $modal, $state,$filter, $stateParams,ApiService, AppAuth, $location, CoreService,User , gettextCatalog, Order, Product, ProductOrder) {

  var self = this;

  var orderId = $stateParams.orderId;


  // $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.order=[];

  var orders={
    order:{},
    orderItems:[],
    supplier:{},
    user:{}
  }

  /*****************************************************************/
  /************Create order  to modal dialogue confirm *************/
  /*****************************************************************/
  $scope.open = function (size) {
    var orderItems = [];
    angular.forEach($scope.orderLine, function (item) {
      if (item.quantity > 0) {
        orderItems.push(item);
      }
    })
    orders.orderItems = orderItems;


    orders.user = JSON.parse(localStorage.getItem('currUser'));
    //  console.log(orders.user.firstName);
    //console.log(localStorage.getItem('currUser'));


    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      backdrop: 'static',
      resolve: {
        items: function () {
          return orders;
        }
      }
    });
    /*****************************************************************/


    /****************************************************************/
    /*************Save the order and send Email to supplier**********/
    /****************************************************************/
    modalInstance.result.then(function (dt) {
        var orderToUpdate = Order.findById({
          id: orderId
        }).$promise.then(function (data) {
            orderToUpdate = data;
            orderToUpdate.deliverydate = dt.setDate(dt.getDate() + 1);
            orderToUpdate.status = 1;

            Order.upsert(orderToUpdate, function (data) {
              orders.order = data;
              /****************notifying supplier  throgh Email****************/
              var msg = ({msg: orders});
              Order.sendemail(msg, function (err) {
                // console.log("ProductOrder  Greeting ",err);
              });

              /***********end**notifying user throgh Email****************/
              //console.log(err);
            });
          });
        /***********************saving order*************************/

        ProductOrder.createMany(orders.orderItems, function (err) {
          // console.log("ProductOrder  ",err);
        });
        /***********************saving order*************************/
        CoreService.toastSuccess(gettextCatalog.getString(
          'Order saved'), gettextCatalog.getString(
          'Your order sent to ' + $scope.supplier.name));
        $state.go('^.list');
    });
  };

  var orderLine = {
    orderId: '',
    productId: '',
    productName: '',
    unit: '',
    quantity: 0
  };

  $scope.orderLine = [];

  function initOrderLine() {
    var orderLine1 = {};
    orderLine1.orderId = '',
      orderLine1.productId = '';
    orderLine1.productName = '';
    orderLine1.unit = '';
    orderLine1.quantity = 0;
    return orderLine1;
  }

 //  get all the products for this supplier;

  if (orderId) {
    var lstOrderLine = [];
    $scope.order = Order.findById({
      id: orderId,
      filter: {include: 'products', order: 'productId ASC'}
    }, function (order) {
      $scope.supplier = User.findById({
        id: order.supplierid
      });
      orders.supplier=$scope.supplier;
      $scope.products = User.products({
        id: order.supplierid
      }).$promise.then(function (data) {
          $scope.products = data;
          angular.forEach($scope.products, function (product) {
            orderLine = initOrderLine();
            orderLine.orderId = orderId,
              orderLine.productId = product.id,
              orderLine.productName = product.name,
              orderLine.unit = product.unit,
              orderLine.quantity = 0
            lstOrderLine.push(orderLine);
          })

          $scope.orderLine = lstOrderLine;
        });
    })
  } else {
    $scope.supplier = {};
  }


  //$scope.Qty=1;
  $scope.decrQty = function (item) {
    if (item.quantity > 0) {
      item.quantity = item.quantity - 1;
    }
  };
  $scope.incrQty = function (item) {
    if (item.quantity >= 0) {
      item.quantity = item.quantity + 1;
    }
  };


}

app.controller('OrdersFormCtrl', OrdersFormCtrl);

