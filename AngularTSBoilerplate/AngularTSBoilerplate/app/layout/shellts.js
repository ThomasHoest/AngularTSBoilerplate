var controllers;
(function (controllers) {
    var Shell = (function () {
        function Shell($rootScope, common, config) {
            var _this = this;
            this.controllerId = 'shell';
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
            this.logSuccess = common.logger.getLogFn(this.controllerId, 'success');
            this.common = common;
            this.events = config.events;
            this.activate();

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
        Shell.prototype.activate = function () {
            this.logSuccess('Hot Towel Angular loaded!', null, true);
            this.common.activateController([], this.controllerId);
        };

        Shell.prototype.toggleSpinner = function (on) {
            this.isBusy = on;
        };
        return Shell;
    })();
    controllers.Shell = Shell;
})(controllers || (controllers = {}));
//# sourceMappingURL=shellts.js.map
