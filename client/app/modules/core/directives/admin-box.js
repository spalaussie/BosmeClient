'use strict';
/**
 * @ngdoc directive
 * @name com.module.core.directive:adminBox
 * @description
 * # adminBox
 */
angular.module('com.module.core')
  .directive('adminBox', function() {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the adminBox directive');
      }
    };
  })

.directive('fileBrowser', function () {
    return {
      restrict: 'A',
      replace: true,
      transclude: 'element',
      scope: false,
      template: '<div class="input-prepend extended-date-picker">' +
      '<input type="button" class="btn" value="browse...">' +
      '<input type="text" class="override" readonly>' +
      '<div class="proxied-field-wrap" ng-transclude></div>' +
      '</div>'
      ,
      link: function ($scope, $element, $attrs, $controller) {
        var fileField = $element.find('[type="file"]')
          .on('change', function () {
            proxy.val(
              angular.element(this)
                .val()
                .split('\\')
                .last()
            );
          });
        var proxy = $element.find('[type="text"]')
          .on('click', function () {
            fileField.trigger('click');
          });
        var button = $element.find('[type="button"]')
          .on('click', function () {
            fileField.trigger('click');
          });
      }
    }
  })
    ;
