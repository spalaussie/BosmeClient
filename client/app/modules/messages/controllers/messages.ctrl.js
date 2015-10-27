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
        $scope.user.supplierId = localStorage.getItem('$LoopBack$currentUserId');
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
            userId: localStorage.getItem('$LoopBack$currentUserId')
          },order: 'read ASC, id DESC ',groupBy:'read'
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

    /*****************************************************************************/
    /************Create a modal dialogue read Messages **************************/
    /***************************************************************************/

    $scope.openMessage=function(thisMessage) {


      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'messageModalContent.html',
        controller: 'MessageModalInstanceCtrl',
        backdrop: 'static',
        resolve: {
          message: function () {
            return thisMessage;
          }
        }
      });

      /***********************************************************************************/
      /*************Open a modal to accept or reject the clients (sender)request**********/
      /***********************************************************************************/

      modalInstance.result.then(function (message) {
        if(!message.read) {
          Message.findById({
            id: message.id
          }, function (currMsg) {
            currMsg.read = true;
            Message.upsert(currMsg, function () {
              loadItems();
            });
          })
        }
      });

    };




    function updateDashBoard(){
      Message.find(
        {
          filter: {
            where: {userId: localStorage.getItem('$LoopBack$currentUserId')}
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
