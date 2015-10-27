'use strict';
angular.module('com.module.messages')
  .controller('MessagesCtrl', function($rootScope, $scope, $modal, $state, $stateParams,CoreService,ApiService, AppAuth, $location, gettextCatalog, User, Message) {


    var messageId = $stateParams.messageId;
    $scope.messages = [];
    $scope.message={};
    loadItems();

    /*****************************************************************************/
    /************Create a modal dialogue to accept or reject request *************/
    /*****************************************************************************/

    function open (sender) {

      $scope.senderDetails = {};

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'senderModalContent.html',
        controller: 'ModalInstanceCtrl',
        backdrop: 'static',
        resolve: {
          sender: function () {
            return sender;
          }
        }
      });
      /*****************************************************************/


      /***********************************************************************************/
      /*************Open a modal to accept or reject the clients (sender)request**********/
      /***********************************************************************************/

      modalInstance.result.then(function (sender) {

        $scope.user = User.findById({
          id: sender.id
        });
        $scope.user.supplierId = localStorage.getItem('currUserId');
        $scope.user.$save();



        /***********************adding sender to sippliers list*************************/
        CoreService.toastSuccess(gettextCatalog.getString(
          'Client added '), gettextCatalog.getString(
          'Approval message is sent to client ' + $scope.sender.bussinessname));
        $state.go('^.list');

      });
    };


    function loadItems() {
      Message.find({
        filter: {
          where: {
            and: [{userId: localStorage.getItem('currUserId')}, {read: 0}]
          },order: 'id DESC'
        }
      }, function (messages) {
        $scope.messages = messages;
      });

      if (messageId) {
        Message.find({
          filter: {
            where: {id: messageId}
          }
        }, function (message) {
          $scope.message = message[0];
        });
      }
    }

    $scope.viewProfile=function(senderId){
      User.findById({
        id: senderId
      }).$promise.then(function (data) {
          $scope.sender=data;
          open($scope.sender);
        });
    };

    $scope.deletemessage = function (id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function () {
          Message.deleteById(id, function () {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Message deleted'), gettextCatalog.getString(
              'Your message is deleted!'));
            loadItems();
          }, function (err) {
            CoreService.toastError(gettextCatalog.getString(
              'Error deleting message'), gettextCatalog.getString(
                'Your message is not deleted: ') + err);
          });
        },
        function () {
          return false;
        });
    }

    function updateDashBoard(){
      Message.find(
        {
          filter: {
            where: {userId: localStorage.getItem('currUserId')}
          }
        }, function (messages) {
          angular.forEach($rootScope.dashboardBox, function(box){
            if(box.name==="Categories"){
              box.quantity=messages.length;
            }
          })
        });
    }
  });
