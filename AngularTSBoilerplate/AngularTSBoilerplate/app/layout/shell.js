var Controllers;
(function (Controllers) {
    var Shell = (function () {
        function Shell($rootScope, common, config) {
            var _this = this;
            this.busyMessage = "Please wait...";
            this.isBusy = true;
            this.spinnerOptions = {
                radius: 40,
                lines: 7,
                length: 0,
                width: 30,
                speed: 1.7,
                corners: 1.0,
                trail: 100,
                color: '#F58A00'
            };
            //var vm = this;
            this.logSuccess = common.logger.getLogFn(Shell.ControllerId, 'success');
            this.common = common;
            this.events = config.events;
            this.Activate();

            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                _this.toggleSpinner(true);
            });

            $rootScope.$on(this.events.controllerActivateSuccess, function (data) {
                _this.toggleSpinner(false);
            });

            $rootScope.$on(this.events.spinnerToggle, function (data) {
                _this.toggleSpinner(data.show);
            });
        }
        Shell.prototype.Activate = function () {
            this.logSuccess('Hot Towel Angular loaded!', null, true);
            this.common.activateController([], Shell.ControllerId);
        };

        Shell.prototype.toggleSpinner = function (on) {
            this.isBusy = on;
        };
        Shell.ControllerId = 'shell';
        return Shell;
    })();
    Controllers.Shell = Shell;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=shell.js.map
