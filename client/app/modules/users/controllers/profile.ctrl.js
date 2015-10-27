'use strict';
angular.module('com.module.users')
  .controller('ProfileCtrl', function($scope, CoreService, User, gettextCatalog) {

    $scope.user = User.getCurrent(function(user) {
      //console.log(user);
    }, function(err) {
     // console.log(err);
    });

    $scope.formFields = [{
      key: 'username',
      type: 'text',
      label: gettextCatalog.getString('Username'),
      required: true
    }, {
      key: 'email',
      type: 'email',
      label: gettextCatalog.getString('E-mail'),
      required: true
    },
    {
      key: 'firstName',
      type: 'text',
      label: gettextCatalog.getString('First name'),
      required: true
    }, {
      key: 'lastName',
      type: 'text',
      label: gettextCatalog.getString('Last name'),
      required: true
    },
    {
        key: 'phone',
        label: gettextCatalog.getString('Phone'),
        type: 'text',
        attr: {
            required: true,
            ngMinlength: 10
        }
    },
    {
        key: 'abn',
        label: gettextCatalog.getString('ABN'),
        type: 'text',
        attr: {
            required: true,
            ngMinlength: 4
        },
        msgs: {
            match: gettextCatalog.getString(
                'Your passwords need to match')
         }
    },
    {
        key: 'address',
        type: 'text',
        label: gettextCatalog.getString('Address')
    },
    {
        key: 'state',
        type: 'text',
        label: gettextCatalog.getString('State')
    },
    {
        key: 'zip',
        type: 'text',
        label: gettextCatalog.getString('Zip')
    },
      {
        key: 'country',
        type: 'text',
        label: gettextCatalog.getString('Country')
      },
      {
        key: 'bussinessname',
        type: 'text',
        label: gettextCatalog.getString('Buisness Name')
      },
    {
        key: 'url',
        type: 'text',
        label: gettextCatalog.getString('Website')
    },
      {
        key: 'about',
        type: 'textarea',
        label: gettextCatalog.getString('About')
      }
    ];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function() {
      User.upsert($scope.user, function() {
        localStorage.setItem('currUser',JSON.stringify($scope.user));
        CoreService.toastSuccess(gettextCatalog.getString(
          'Profile saved'), gettextCatalog.getString(
          'Enjoy the new you!'));
      }, function(err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error saving profile'), gettextCatalog.getString(
          'Your profile is not saved: ') + err);
      });
    };

  });
