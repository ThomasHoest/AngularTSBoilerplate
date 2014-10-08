var Modules;
(function (Modules) {
    var Common = (function () {
        function Common($q, $rootScope, $timeout, commonConfig, logger) {
            this.throttles = {};
            this.$q = $q;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.commonConfig = commonConfig;
            this.logger = logger;
        }
        Common.prototype.activateController = function (promises, controllerId) {
            var _this = this;
            return this.$q.all(promises).then(function (eventArgs) {
                var data = { controllerId: controllerId };
                _this.$broadcast(_this.commonConfig.config.controllerActivateSuccessEvent, data);
            });
        };

        Common.prototype.$broadcast = function (event, data) {
            return this.$rootScope.$broadcast.apply(this.$rootScope, [event, data]);
        };

        Common.prototype.createSearchThrottle = function (viewmodel, list, filteredList, filter, delay) {
            // After a delay, search a viewmodel's list using
            // a filter function, and return a filteredList.
            // custom delay or use default
            delay = +delay || 300;

            // if only vm and list parameters were passed, set others by naming convention
            if (!filteredList) {
                // assuming list is named sessions, filteredList is filteredSessions
                filteredList = 'filtered' + list[0].toUpperCase() + list.substr(1).toLowerCase(); // string

                // filter function is named sessionFilter
                filter = list + 'Filter'; // function in string form
            }

            // create the filtering function we will call from here
            var filterFn = function () {
                // translates to ...
                // vm.filteredSessions
                //      = vm.sessions.filter(function(item( { returns vm.sessionFilter (item) } );
                viewmodel[filteredList] = viewmodel[list].filter(function (item) {
                    return viewmodel[filter](item);
                });
            };

            return (function () {
                // Wrapped in outer IFFE so we can use closure
                // over filterInputTimeout which references the timeout
                var filterInputTimeout;

                // return what becomes the 'applyFilter' function in the controller
                return function (searchNow) {
                    if (filterInputTimeout) {
                        this.$timeout.cancel(filterInputTimeout);
                        filterInputTimeout = null;
                    }
                    if (searchNow || !delay) {
                        filterFn();
                    } else {
                        filterInputTimeout = this.$timeout(filterFn, delay);
                    }
                };
            })();
        };

        Common.prototype.debouncedThrottle = function (key, callback, delay, immediate) {
            // Perform some action (callback) after a delay.
            // Track the callback by key, so if the same callback
            // is issued again, restart the delay.
            var defaultDelay = 1000;
            delay = delay || defaultDelay;
            if (this.throttles[key]) {
                this.$timeout.cancel(this.throttles[key]);
                this.throttles[key] = undefined;
            }
            if (immediate) {
                callback();
            } else {
                this.throttles[key] = this.$timeout(callback, delay);
            }
        };

        Common.prototype.isNumber = function (val) {
            // negative or positive
            return /^[-]?\d+$/.test(val);
        };

        Common.prototype.textContains = function (text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        };
        return Common;
    })();
    Modules.Common = Common;

    var CommonConfig = (function () {
        function CommonConfig() {
            var _this = this;
            this.config = {};
            this.$get = function () {
                return {
                    config: _this.config
                };
            };
        }
        return CommonConfig;
    })();
    Modules.CommonConfig = CommonConfig;
})(Modules || (Modules = {}));
//# sourceMappingURL=commonts.js.map
