'use strict';
angular.module('com.module.core')
  .controller('FilesCtrl', function($scope, $http, CoreService, gettextCatalog,UploadCSV) {

    $scope.load = function() {
      $http.get(CoreService.env.apiUrl + '/containers/files/files').success(
        function(data) {
          console.log(data);
          $scope.files = data;
        });
    };

    $scope.import = function(csvFile){

      UploadCSV.logmsg({msg: 'Cool message'}, function (err) {
         console.log("ProductOrder  Greeting ",err);
      });

      UploadCSV.convertToJSON({userId:localStorage.getItem('$LoopBack$currentUserId')}, function (err) {
         console.log("ProductOrder  Greeting ",err);
      });

    };


    $scope.delete = function(index, id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function() {
          $http.delete(CoreService.env.apiUrl +
            '/containers/files/files/' + encodeURIComponent(id)).success(
            function(data, status, headers) {
              console.log(data);
              console.log(status);
              console.log(headers);
              $scope.files.splice(index, 1);
              CoreService.toastSuccess(gettextCatalog.getString(
                'File deleted'), gettextCatalog.getString(
                'Your file is deleted!'));
            });
        },
        function() {
          return false;
        });
    };

    $scope.$on('uploadCompleted', function(event) {
      console.log('uploadCompleted event received');
      console.log(event);
      $scope.load();
    });

  });
