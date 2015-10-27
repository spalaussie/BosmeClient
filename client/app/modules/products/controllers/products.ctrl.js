'use strict';
angular.module('com.module.products')
  .controller('ProductsCtrl', function ($rootScope, $scope, $state, $stateParams,ApiService, AppAuth, $location,
                                        CoreService, gettextCatalog, User, Product, Category,Supplier) {

    /*ApiService.checkConnection()
      .then(function() {
        console.log('ApiService.checkConnection success');
        if (!AppAuth.currentUser) {
          $location.path('/login');
        } else {
          //$location.path('/app');
        }
      })
      .catch(function(err) {
        console.log('ApiService.checkConnection err: ' + err);
        $location.path('/error');
      });*/

    var productId = $stateParams.id;
    var categoryId = $stateParams.categoryId;

    $scope.products = [];


    loadProducts();

    function loadProducts() {
      Product.find({
          filter: {where: {userId: localStorage.getItem('$LoopBack$currentUserId')}}
        }, function (products) {
          $scope.products = products;
        }
      );

      if (productId) {
        $scope.product = Product.findById({
          id: productId
        }, function (product) {
          product.category = Product.category({
            id: product.id
          });
        }, function (err) {
          console.log(err);
        });
      } else {
        $scope.product = {};
      }
    }

    if (categoryId) {
      $scope.product.categoryId = categoryId;
    }


    $scope.deleteproduct = function (id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function () {
          Product.deleteById(id, function () {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Product deleted'), gettextCatalog.getString(
              'Your product is deleted!'));
            loadProducts();
            $state.go('app.products.list');
          }, function (err) {
            CoreService.toastError(gettextCatalog.getString(
              'Error deleting product'), gettextCatalog.getString(
                'Your product is not deleted: ') + err);
          });
        },
        function () {
          return false;
        });
    };

    function updateDashBoard(){
      Product.find({
        filter:{
          where: {
            userId:localStorage.getItem('$LoopBack$currentUserId')
          }
        }
      },function (products) {
        angular.forEach($rootScope.dashboardBox, function(box){
          if(box.name==="Orders"){
            box.quantity=products.length;
          }
        })
      });
    }


    this.onSubmit = function() {

      Product.upsert(self.product, function() {
        //updateDashBoard();

        CoreService.toastSuccess(gettextCatalog.getString(
          'Product saved'), gettextCatalog.getString(
          'Your product is safe with us!'));
          $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    };
    $scope.deletecategory = function (id) {
      Category.deleteById(id, function () {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Category deleted'), gettextCatalog.getString(
          'Your category is deleted!'));
        loadProducts();
      }, function (err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error deleting category'), gettextCatalog.getString(
            'Your category is not deleted: ') + err);
      });
    };
  });
