var Controllers;
(function (Controllers) {
    var Admin = (function () {
        function Admin(common) {
            this._log = common.logger.getLogFn(Controllers.Dashboard.ControllerId);
            this._common = common;
            var vm = this;
            vm.title = 'Admin';

            this.activate();
        }
        Admin.prototype.activate = function () {
            var _this = this;
            this._common.activateController([], Admin.ControllerId).then(function () {
                _this._log('Activated Admin View');
            });
        };
        Admin.ControllerId = 'admin';
        return Admin;
    })();
    Controllers.Admin = Admin;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=admints.js.map
