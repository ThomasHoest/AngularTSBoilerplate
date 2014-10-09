module Modules {
  export class ModalDialog {
    private $modal;
    private _modalInstance;

    constructor($modal, $templateCache) {

      this.$modal = $modal;

      $templateCache.put('modalDialog.tpl.html',
        '<div>' +
        '    <div class="modal-header">' +
        '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" data-ng-click="cancel()">&times;</button>' +
        '        <h3>{{title}}</h3>' +
        '    </div>' +
        '    <div class="modal-body">' +
        '        <p>{{message}}</p>' +
        '    </div>' +
        '    <div class="modal-footer">' +
        '        <button class="btn btn-primary" data-ng-click="ok()">{{okText}}</button>' +
        '        <button class="btn btn-info" data-ng-click="cancel()">{{cancelText}}</button>' +
        '    </div>' +
        '</div>');

      this._modalInstance = ['$scope', '$modalInstance', 'options',
        ($scope, $modalInstance, options) => {
          $scope.title = options.title || 'Title';
          $scope.message = options.message || '';
          $scope.okText = options.okText || 'OK';
          $scope.cancelText = options.cancelText || 'Cancel';
          $scope.ok = () => { $modalInstance.close('ok'); };
          $scope.cancel = () => { $modalInstance.dismiss('cancel'); };
        }];

    }

    public deleteDialog(itemName) {
      var title = 'Confirm Delete';
      itemName = itemName || 'item';
      var msg = 'Delete ' + itemName + '?';

      return this.confirmationDialog(title, msg);
    }

    public confirmationDialog(title, msg, okText?, cancelText?) {

      var modalOptions = {
        templateUrl: 'modalDialog.tpl.html',
        controller: this._modalInstance,
        keyboard: true,
        resolve: {
          options: () => {
            return {
              title: title,
              message: msg,
              okText: okText,
              cancelText: cancelText
            };
          }
        }
      };

      return this.$modal.open(modalOptions).result;
    }
  }
} 