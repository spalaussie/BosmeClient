'use strict';
var app = angular.module('com.module.orders');

function ModalInstanceCtrl($scope, $state, $stateParams,ApiService, AppAuth, $location, CoreService, gettextCatalog, $modalInstance, items) {

  $scope.order = items;


  $scope.ok = function () {
    if($scope.formData.date) {
      $modalInstance.close($scope.formData.date);
    }else {
      CoreService.toastError(gettextCatalog.getString(
        'Delivery date is required'), gettextCatalog.getString(
        'Please select a delivery date '));
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


  $scope.formData      = {};
  $scope.formData.date = "";
  $scope.opened        = false;

  //Datepicker
  $scope.dateOptions = {
    'year-format': "'yy'",
    'show-weeks' : false
  };

}
app.controller('ModalInstanceCtrl', ModalInstanceCtrl);
