'use strict';
angular.module('com.module.orders')
  .controller('OrdersCtrl', function ($rootScope, $scope, $modal, ApiService, AppAuth, $location, $state, $stateParams,
                                      CoreService, gettextCatalog,User, Supplier, Order, ClientSupplier, ProductOrder) {

    var orderId = $stateParams.orderId;
    //$scope.supplierId=supplierId;
  var order;
    /* view all Orders and get the new orderId to create a ProductOrder */

    var orderLine = {
      productName: '',
      quantity: 0
    };

    $scope.order = {
      orderId: '',
      supplier: '',
      orderDate: '',
      deliveryDate: '',
      orderLine: []
    };

    function initOrderLine() {
      var orderLine1 = {};
      orderLine1.unit = '';
      orderLine1.productName = '';
      orderLine1.quantity = 0;
      return orderLine1;
    }

    if (orderId) {
      var lstOrderLine = [];

      var productOrders = ProductOrder.find({
        filter: {
          where: {orderId: orderId},
          order: 'productId ASC'
        }
      });

      Order.findById({
          id: orderId,
          filter: {include: 'products', order: 'productId ASC'}
        }, function (order) {
          $scope.supplier = User.findById({
            id: order.supplierid
          })
        }
      ).$promise.then(function (data) {
          order = data;
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
              $scope.order.orderId = order.orderId;
              $scope.order.supplier = $scope.supplier;
              $scope.order.orderDate = order.orderdate;
              $scope.order.deliveryDate = order.deliverydate;
            }
            else{
              $scope.order.orderId = order.orderId;
              $scope.order.supplier = $scope.supplier;
              $scope.order.orderDate = order.orderdate;
              $scope.order.deliveryDate = order.deliverydate;
            }
          }
        });


    } else {
      $scope.supplier = {};
    }


    ClientSupplier.find({
      filter: {
        where: {userId:localStorage.getItem('$LoopBack$currentUserId')}
      }
    }, function (clientSuppliers) {
      var arr = [];
      clientSuppliers.forEach(function (sup) {
        arr.push(sup.supplierId);
      });

      User.find({
          filter: {
            where: {id: {inq: arr}}
          }
        },function (suppliers) {
          $scope.suppliers = suppliers;
        }
      );

    });

    $scope.orderList={
      newOrders:[],
      pendingOrders:[],
      processedOrders:[]
    }

    loadOrders();

   function loadOrders() {
     $scope.orders=[];
     Order.find({
       filter: {
         where: {userId: localStorage.getItem('$LoopBack$currentUserId')},
         include: ['products','user','productOrders']
       }
     }, function (orders) {
       var tempNewOrders=[];
       var tempPendingOrders=[];
       var tempProcessedOrders=[];

       angular.forEach(orders, function (order) {
         $scope.supplier = User.findById({
           id: order.supplierid
         }, function (supplier) {
           order.supplier = supplier;
           $scope.orders.push(order);
         })

           switch(order.status){
             case 1: tempNewOrders.push(order);
               break;
             case 2: tempPendingOrders.push(order);
               break;
             case 3: tempProcessedOrders.push(order);
               break;
           }

       })
       $scope.orderList.newOrders=tempNewOrders;
       $scope.orderList.pendingOrders=tempPendingOrders;
       $scope.orderList.processedOrders=tempProcessedOrders;

     });
   }

    /*****************************************************************/
    /********Open order modal dialogue to quick view Order **********/
    /***************************************************************/
    $scope.openQuickView = function (order) {

      // var order=order;

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'ModalOrderContent.html',
        controller: 'OrderModalInstanceCtrl',
        backdrop: 'static',
        resolve: {
          currOrder: function () {
            return order;
          }
        }
      });
      /****************************************************************/
      /*************Save the order and send Email to supplier**********/
      /****************************************************************/
      modalInstance.result.then(function (dt) {

      });
    };


    /* Create anew Order and get the new orderId to create a ProductOrder */
    $scope.newOrder={};
    $scope.addorder=function(supplierId){
      $scope.newOrder.supplierid=supplierId;
      $scope.newOrder.userId=localStorage.getItem('$LoopBack$currentUserId');
      $scope.newOrder.orderdate= CoreService.getTodaysDate();
      $scope.newOrder.deliverydate=null;
      $scope.newOrder.status=0;

      var newOrder= Order.upsert($scope.newOrder, function() {
        updateDashBoard();
      }, function(err) {
        console.log(err);
      }).$promise.then(function (data) {
          newOrder = data;
          $state.go('app.orders.addorder', { orderId:newOrder.id});
        });

    };

    function updateDashBoard(){
      Order.find({
        filter:{
          where: {
            userId:localStorage.getItem('currUserId')
          }
        }
      },function (orders) {
          angular.forEach($rootScope.dashboardBox, function(box){
            if(box.name==="Orders"){
              box.quantity=orders.length;
            }
          })
        });
    }


    /* End Create a new Order and get the new orderId to create a ProductOrder */

    $scope.onSubmit = function() {
      Order.upsert($scope.newOrder, function() {
        loadOrders();
      }, function(err) {
        console.log(err);
      });
    };

    $scope.deleteorder = function (id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function () {
          Order.deleteById(id, function () {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Order deleted'), gettextCatalog.getString(
              'Your order is deleted!'));
            loadOrders();
          }, function (err) {
            CoreService.toastError(gettextCatalog.getString(
              'Error deleting order'), gettextCatalog.getString(
                'Your order is not deleted: ') + err);
          });
        },
        function () {
          return false;
        });
    };

  })


//Datepicker
  .directive("mydatepicker", function(){
    return {
      restrict: "E",
      scope:{
        ngModel: "=",
        dateOptions: "=",
        opened: "="
      },
      link: function($scope, element, attrs) {
        $scope.open = function(event){
          event.preventDefault();
          event.stopPropagation();
          $scope.opened = true;
        };

        $scope.clear = function () {
          $scope.ngModel = null;
        };
      },
      templateUrl: 'modules/orders/views/datepicker.html'
    }
  })

;
