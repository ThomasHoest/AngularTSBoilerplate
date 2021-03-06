﻿var Bootstrapper = (function () {
    function Bootstrapper() {
        var app = angular.module('app', [
            'ngAnimate',
            'ngRoute',
            'ngSanitize',
            'common',
            'common.bootstrap',
            'ui.bootstrap'
        ]);

        // Handle routing errors and success events
        app.run([
            '$route', function ($route) {
                // Include $route to kick start the router.
            }]);
    }
    Bootstrapper.prototype.ConfigRoutes = function () {
        var self = this;
        var app = angular.module('app');

        // Collect the routes
        app.constant('routes', this.GetRoutes());

        // Configure the routes and route resolvers
        app.config(['$routeProvider', 'routes', function ($routeProvider, routes) {
                return self.RouteConfigurator($routeProvider, routes);
            }]);
    };

    Bootstrapper.prototype.RouteConfigurator = function ($routeProvider, routes) {
        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    };

    Bootstrapper.prototype.ConfigExceptionHandler = function () {
        var self = this;
        var app = angular.module('app');

        // Configure by setting an optional string value for appErrorPrefix.
        // Accessible via config.appErrorPrefix (via config value).
        app.config([
            '$provide', function ($provide) {
                $provide.decorator('$exceptionHandler', ['$delegate', 'config', 'logger', function ($delegate, config, logger) {
                        return self.ExtendExceptionHandler($delegate, config, logger);
                    }]);
            }]);
    };

    Bootstrapper.prototype.ExtendExceptionHandler = function ($delegate, config, logger) {
        var appErrorPrefix = config.appErrorPrefix;
        var logError = logger.getLogFn('app', 'error');
        return function (exception, cause) {
            $delegate(exception, cause);
            if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) {
                return;
            }
            var errorData = { exception: exception, cause: cause };
            var msg = appErrorPrefix + exception.message;
            logError(msg, errorData, true);
        };
    };

    Bootstrapper.prototype.Config = function () {
        var app = angular.module('app');

        // Configure Toastr
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';

        // For use with the HotTowel-Angular-Breeze add-on that uses Breeze
        var remoteServiceName = 'breeze/Breeze';

        var events = {
            controllerActivateSuccess: 'controller.activateSuccess',
            spinnerToggle: 'spinner.toggle'
        };

        var config = {
            appErrorPrefix: '[HT Error] ',
            docTitle: 'HotTowel: ',
            events: events,
            remoteServiceName: remoteServiceName,
            version: '2.1.0'
        };

        app.value('config', config);

        app.config([
            '$logProvider', function ($logProvider) {
                // turn debugging off/on (no info or warn)
                if ($logProvider.debugEnabled) {
                    $logProvider.debugEnabled(true);
                }
            }]);

        //#region Configure the common services via commonConfig
        app.config([
            'commonConfigProvider', function (cfg) {
                cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
                cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
            }]);
    };

    Bootstrapper.prototype.GetRoutes = function () {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }
        ];
    };

    Bootstrapper.prototype.Services = function () {
        var app = angular.module('app');
        app.factory('datacontext', ['common', function (common) {
                return new Services.Datacontext(common);
            }]);
    };

    Bootstrapper.prototype.Modules = function () {
        var commonModule = angular.module('common', []);
        commonModule.provider('commonConfig', function () {
            return new Modules.CommonConfig();
        });
        commonModule.factory('common', ['$q', '$rootScope', '$timeout', 'commonConfig', 'logger', function ($q, $rootScope, $timeout, commonConfig, logger) {
                return new Modules.Common($q, $rootScope, $timeout, commonConfig, logger);
            }]);

        commonModule.factory('logger', ['$log', function ($log) {
                return new Modules.Logger($log);
            }]);
        commonModule.factory('spinner', ['common', 'commonConfig', function (common, commonConfig) {
                return new Modules.Spinner(common, commonConfig);
            }]);

        var bootstrapModule = angular.module('common.bootstrap', ['ui.bootstrap']);
        bootstrapModule.factory('bootstrap.dialog', ['$modal', '$templateCache', function ($modal, $templateCache) {
                return new Modules.ModalDialog($modal, $templateCache);
            }]);
    };

    Bootstrapper.prototype.Controllers = function () {
        var app = angular.module('app');
        app.controller(Controllers.Shell.ControllerId, ['$rootScope', 'common', 'config', Controllers.Shell]);

        app.controller(Controllers.Sidebar.ControllerId, ['$route', 'config', 'routes', Controllers.Sidebar]);

        app.controller(Controllers.Dashboard.ControllerId, ['common', 'datacontext', Controllers.Dashboard]);

        app.controller(Controllers.Admin.ControllerId, ['common', Controllers.Admin]);
    };

    Bootstrapper.prototype.Directives = function () {
        var app = angular.module('app');
        app.directive('ccImgPerson', ['config', function (config) {
                return new Services.ImgPerson(config);
            }]);
        app.directive('ccSidebar', function () {
            return new Services.SideBar();
        });
        app.directive('ccWidgetClose', function () {
            return new Services.WidgetClose();
        });
        app.directive('ccWidgetMinimize', function () {
            return new Services.WidgetMinimize();
        });
        app.directive('ccScrollToTop', ['$window', function ($window) {
                return new Services.ScrollToTop($window);
            }]);
        app.directive('ccSpinner', ['$window', function ($window) {
                return new Services.Spinner($window);
            }]);
        app.directive('ccWidgetHeader', function () {
            return new Services.WidgetHeader();
        });
    };
    return Bootstrapper;
})();

(function () {
    var bootstrapper = new Bootstrapper();
    bootstrapper.Modules();
    bootstrapper.Config();
    bootstrapper.ConfigExceptionHandler();
    bootstrapper.ConfigRoutes();
    bootstrapper.Directives();
    bootstrapper.Services();
    bootstrapper.Controllers();
})();
//# sourceMappingURL=bootstrapper.js.map
