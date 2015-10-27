'use strict';
angular.module('com.module.products')
  .controller('CategoriesProductCtrl', function($scope, $state, $stateParams,CoreService, gettextCatalog, Category) {

        var categories;
   var suppliers;
    var categoryId = $stateParams.categoryId;
    if (categoryId) {
      $scope.category = Category.findById({
        id: categoryId
      }, function(category) {
        $scope.products = Category.products({
          id: category.id
        });
      }, function(err) {
        console.log(err);
      });
    } else {
      $scope.category = {};
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
            required: true
        }
    ];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function() {
      Category.upsert($scope.category, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Category saved'), gettextCatalog.getString(
          'Your category is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    };

  });
