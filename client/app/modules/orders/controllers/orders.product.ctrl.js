'use strict';
angular.module('com.module.orders')
  .controller('OrdersProductCtrl', function ($scope, $state, $stateParams,ApiService, AppAuth, $location,
                                        CoreService, gettextCatalog, Product, Order) {

    var productId = $stateParams.id;
    var orderId = $stateParams.orderId;

    if (productId) {
      $scope.product = Product.findById({
        id: productId
      }, function (product) {
        product.order = Product.order({
          id: product.id
        });
      }, function (err) {
        console.log(err);
      });
    } else {
      $scope.order = {};
    }

    if (orderId) {
      $scope.orderId = orderId;
      $scope.order = Order.findById({
        id: orderId
      })
    }

    function loadItems() {
      $scope.orders = [];
      Order.find(function (orders) {
        angular.forEach(orders, function (order) {
          order.products = Order.products({
            id: order.id
          });
          this.push(order);
        }, $scope.orders);
      });
    }

    loadItems();

   /* $scope.formFields = [
      {
        key: 'name',
        type: 'text',
        label: gettextCatalog.getString('Name'),
        required: true
      },
      {
        key: 'abn',
        type: 'text',
        label: gettextCatalog.getString('ABN No'),
        required: true
      },
      {
        key: 'contactname',
        type: 'text',
        label: gettextCatalog.getString('Contact Name'),
        required: true
      },
      {
        key: 'phone',
        type: 'text',
        label: gettextCatalog.getString('Phone'),
        required: true
      },
      {
        key: 'address',
        type: 'text',
        label: gettextCatalog.getString('Address'),
        required: true
      },
      {
        key: 'zip',
        type: 'text',
        label: gettextCatalog.getString('Zip'),
        required: true
      },
      {
        key: 'state',
        type: 'text',
        label: gettextCatalog.getString('State'),
        required: true
      },
      {
        key: 'country',
        type: 'text',
        label: gettextCatalog.getString('Country'),
        required: true
      },
      {
        key: 'url',
        type: 'text',
        label: gettextCatalog.getString('Website Url'),
        required: true
      },
      {
        key: 'status',
        type: 'text',
        label: gettextCatalog.getString('Status'),
        required: true
      },
      {
        key: 'description',
        type: 'text',
        label: gettextCatalog.getString('Description'),
        required: true
      }
    ];


    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };*/

    $scope.onSubmit = function() {
      Order.upsert($scope.order, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Order saved'), gettextCatalog.getString(
          'Your order is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    };



    $scope.delete = function (id) {
      Order.deleteById(id, function () {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Order deleted'), gettextCatalog.getString(
          'Your order is deleted!'));
        loadItems();
      }, function (err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error deleting order'), gettextCatalog.getString(
            'Your order is not deleted: ') + err);
      });
    };
  });
