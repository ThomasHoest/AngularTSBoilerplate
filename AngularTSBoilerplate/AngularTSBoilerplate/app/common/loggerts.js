var Modules;
(function (Modules) {
    var Logger = (function () {
        function Logger($log) {
            this.$log = $log;
        }
        Logger.prototype.getLogFn = function (moduleId, fnName) {
            fnName = fnName || 'log';

            var $log = this.$log;
            return function (msg, data, showToast) {
                var write = (fnName === 'error') ? $log.error : $log.log;
                var source = fnName ? '[' + fnName + '] ' : '';
                write(source, msg, data);
                if (showToast) {
                    if (fnName === 'error') {
                        toastr.error(msg);
                    } else if (fnName === 'warning') {
                        toastr.warning(msg);
                    } else if (fnName === 'success') {
                        toastr.success(msg);
                    } else {
                        toastr.info(msg);
                    }
                }
            };
        };
        return Logger;
    })();
    Modules.Logger = Logger;
})(Modules || (Modules = {}));
//# sourceMappingURL=loggerts.js.map
