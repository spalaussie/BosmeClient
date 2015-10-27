'use strict';
angular.module('com.module.categories')
  .controller('CategoriesCtrl', function($rootScope, $scope, $state, $stateParams,CoreService,ApiService, AppAuth, $location, gettextCatalog, User, Category, Product) {


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

    var categoryId = $stateParams.categoryId;
    $scope.categories = [];
    $scope.category={};
    loadItems();

    function loadItems() {

      Category.find(
        {
          filter: {
            where: {userId: localStorage.getItem('$LoopBack$currentUserId')},
            include: {relation: 'products'}
          }
        }, function (categories) {
        $scope.categories = categories;
      });


    if (categoryId) {
      Category.find({
        filter:{
          where: {id: categoryId},
          include: {relation:'products'}
        }
      }, function(category) {
        $scope.category =category[0];
      });
    }
  }

    $scope.formFields = [
    {
      key: 'name',
      type: 'text',
      label: gettextCatalog.getString('Name'),
      required: true
    },
    {
        key: 'description',
        type: 'text',
        label: gettextCatalog.getString('Description'),
        required: false
    }
    ];


    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };


    $scope.deletecategory = function (id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function () {
          Category.deleteById(id, function () {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Category deleted'), gettextCatalog.getString(
              'Your category is deleted!'));
            loadItems();
          }, function (err) {
            CoreService.toastError(gettextCatalog.getString(
              'Error deleting category'), gettextCatalog.getString(
                'Your category is not deleted: ') + err);
          });
        },
        function () {
          return false;
        });
    }

    $scope.deleteproduct = function (id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function () {
          Product.deleteById(id, function () {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Product deleted'), gettextCatalog.getString(
              'Your product is deleted!'));
            loadItems();
            $state.go('app.categories.products');
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
      Category.find(
        {
          filter: {
            where: {userId: localStorage.getItem('$LoopBack$currentUserId')}
          }
        }, function (categories) {
          angular.forEach($rootScope.dashboardBox, function(box){
            if(box.name==="Categories"){
              box.quantity=categories.length;
            }
          })
        });
    }


    $scope.onSubmit = function() {
      $scope.category.userId=localStorage.getItem('$LoopBack$currentUserId')
      Category.upsert($scope.category, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Category saved'), gettextCatalog.getString(
          'Your category is safe with us!'));

        updateDashBoard();

        $state.go('^.list');
      }, function(err) {
        //console.log(err);
      });
    };

  });
