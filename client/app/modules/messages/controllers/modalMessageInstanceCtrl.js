'use strict';
var app = angular.module('com.module.messages');

function MessageModalInstanceCtrl($scope, $state, $stateParams,ApiService, AppAuth, $location, CoreService, gettextCatalog, $modalInstance,User, message) {

  $scope.message = message;

  User.findById({
    id:message.senderId
  },function(sender){
    $scope.sender=sender;
  });


  $scope.ok = function () {
      $modalInstance.close($scope.message);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}
app.controller('MessageModalInstanceCtrl', MessageModalInstanceCtrl);
