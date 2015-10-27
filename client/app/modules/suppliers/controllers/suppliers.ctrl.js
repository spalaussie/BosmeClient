'use strict';
angular.module('com.module.suppliers')
  .controller('SuppliersCtrl', function ($rootScope, $scope, $state, $stateParams,ApiService, AppAuth, $location,
                                        CoreService, gettextCatalog,User, Message, Supplier) {

    var supplierId = $stateParams.supplierId;
    $scope.suppliers = [];
    $scope.supplier={};

    loadItems();
    getuserName(localStorage.getItem('$LoopBack$currentUserId'));



    function loadItems() {
      User.find({
        filter: {
          where: {isSupplier:true},
          include: ['clientSuppliers','products']
        }
      }, function (suppliers) {
        $scope.suppliers = suppliers;
      });

      if (supplierId) {
        $scope.supplierId = supplierId;
        User.find({
          filter:{
            where: {id: supplierId},
            include: ['clientSuppliers','products']
          }
        }, function(supplier) {
          $scope.supplier =supplier[0];
        });
      }
    }

    function getuserName(userId){
      User.findById({
        id: userId
      },function (data) {
          $scope.sender=data;
          open($scope.sender);
        });
    }


    $scope.addSupplier=function(supplierId){
      var today=new Date();
        var message=new Message({
          userId:supplierId,
          senderId:localStorage.getItem('$LoopBack$currentUserId'),
          title: $scope.sender.bussinessname + " would like to buy goods from you",
          message:"I would like to buy goods from you. Please add me to your customer list.",
          createdAt:today
        });

      Message.upsert(message, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Message sent to the suplier'), gettextCatalog.getString(
          'Your message is sent successfully!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    };
   /* $scope.listProducts=function(supplier){
      $scope.products=supplier.products;
      $state.go('app.suppliers.products', { supplierId:supplier.id});
    };*/

   /* function loadItems() {
      Supplier.find({
        filter: {
          where: {userId: localStorage.getItem('$LoopBack$currentUserId')},
          include: {relation: 'products'}
        }
      }, function (suppliers) {
        $scope.suppliers = suppliers;
      });

      if (supplierId) {
        $scope.supplierId = supplierId;
        Supplier.find({
          filter:{
            where: {id: supplierId},
            include: {relation:'products'}
          }
        }, function(supplier) {
          $scope.supplier =supplier[0];
        });
      }
    }*/

   /* $scope.formFields = [
      {
        key: 'name',
        type: 'text',
        label: gettextCatalog.getString('Name'),
        required: true
      },
      {
        key: 'contactname',
        type: 'text',
        label: gettextCatalog.getString('Contact Name'),
        required: true
      },
      {
        key: 'email',
        type: 'text',
        label: gettextCatalog.getString('Email'),
        required: true
      },
      {
        key: 'secondaryEmail',
        type: 'text',
        label: gettextCatalog.getString('Secondary Email'),
        required: false
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

    function updateDashBoard(){
      Supplier.find({
        filter:{
          where: {
            userId:localStorage.getItem('$LoopBack$currentUserId')
          }
        }
      },function (suppliers) {
        angular.forEach($rootScope.dashboardBox, function(box){
          if(box.name==="Suppliers"){
            box.quantity=suppliers.length;
          }
        })
      });
    }

    $scope.deletesupplier = function (id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function () {
          Supplier.deleteById(id, function () {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Supplier deleted'), gettextCatalog.getString(
              'Your supplier is deleted!'));
            loadItems();
            $state.go('app.suppliers');
          }, function (err) {
            CoreService.toastError(gettextCatalog.getString(
              'Error deleting supplier'), gettextCatalog.getString(
                'Your supplier is not deleted: ') + err);
          });
        },
        function () {
          return false;
        });
    };

    $scope.deleteproduct = function (id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function () {
          Product.deleteById(id, function () {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Product deleted'), gettextCatalog.getString(
              'Your product is deleted!'));
            loadItems();
            $state.go('app.suppliers.products');
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


    $scope.onSubmit = function() {
      $scope.supplier.userId=localStorage.getItem('$LoopBack$currentUserId');

      Supplier.upsert($scope.supplier, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Supplier saved'), gettextCatalog.getString(
          'Your supplier is safe with us!'));
        updateDashBoard();
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    };*/
  });
