'use strict';
var app = angular.module('com.module.products');

function ProductsFormCtrl($rootScope, $scope, $stateParams, $state, CoreService, Product,ApiService, AppAuth, $location, gettextCatalog,categories, product, suppliers,url) {

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

  var self = this;

  var categoryId=$stateParams.categoryId;

  var supplierId=$stateParams.supplierId;

  //$scope.currPath=$location.path;

  this.product = product;

  this.schema = {
    type: 'object',
    title: 'Product',
    properties: {
      name: {
        title: gettextCatalog.getString('Name'),
        type: 'string'
      },
      categoryId: {
        title: gettextCatalog.getString('Category'),
        type: 'number',
        format: 'uiselect',
        items: categories.map(function(category) {
          return {
            value: category.id,
            label: category.name
          };
        }),
        placeholder: 'Select category'
      },
      supplierId: {
        title: gettextCatalog.getString('Supplier'),
        type: 'number',
        format: 'uiselect',
        items: suppliers.map(function(supplier) {
          return {
            value: supplier.id,
            label: supplier.name
          };
        }),
        placeholder: 'Select supplier'
      },
      unit: {
        title: gettextCatalog.getString('Unit'),
        type: 'string'
      },
      note: {
        title: gettextCatalog.getString('Note'),
        type: 'string'
      },
      price: {
        title: gettextCatalog.getString('Price'),
        type: 'string'
      }
    },
    required: ['name', 'categoryId', 'supplierId']
  };

  this.form = [
    'name',
    'categoryId',
    'supplierId',
    'unit',
    'note',
    'price',
    {
      type: 'submit',
      title: 'OK'
    }
  ];

  function updateDashBoard(){
    Product.find({
      filter:{
        where: {
          userId:localStorage.getItem('$LoopBack$currentUserId')
        }
      }
    },function (products) {
      angular.forEach($rootScope.dashboardBox, function(box){
        if(box.name==="Products"){
          box.quantity=products.length;
        }
      })
    });
  }

  function goBackToUrl(){
    if(url.returnUrl==='app.categories.products'){
      $state.go(url.returnUrl, { categoryId : categoryId });
    }else if(url.returnUrl==='app.suppliers.products'){
      $state.go(url.returnUrl, { supplierId : supplierId });
    }
    else {
      $state.go('^.list');
    };
  }

  this.onSubmit = function() {
    self.product.userId=localStorage.getItem('$LoopBack$currentUserId');
    Product.upsert(self.product, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Product saved'), gettextCatalog.getString(
        'Your product is safe with us!'));
      updateDashBoard();

      goBackToUrl();
    }, function(err) {
      console.log(err);
    });
  };
}

app.controller('ProductsFormCtrl', ProductsFormCtrl);
