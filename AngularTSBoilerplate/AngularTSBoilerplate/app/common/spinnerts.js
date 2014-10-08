var Modules;
(function (Modules) {
    var Spinner = (function () {
        function Spinner(common, commonConfig) {
            this.common = common;
            this.commonConfig = commonConfig;
        }
        Spinner.prototype.spinnerHide = function () {
            this.spinnerToggle(false);
        };

        Spinner.prototype.spinnerShow = function () {
            this.spinnerToggle(true);
        };

        Spinner.prototype.spinnerToggle = function (show) {
            this.common.$broadcast(this.commonConfig.config.spinnerToggleEvent, { show: show });
        };
        return Spinner;
    })();
    Modules.Spinner = Spinner;
})(Modules || (Modules = {}));
//# sourceMappingURL=spinnerts.js.map
