var Bootstrapper = (function () {
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
                return new services.datacontext(common);
            }]);
    };
    return Bootstrapper;
})();

(function () {
    var bootstrapper = new Bootstrapper();
    bootstrapper.Config();
    bootstrapper.ConfigExceptionHandler();
    bootstrapper.ConfigRoutes();
    bootstrapper.Services();
}());
//# sourceMappingURL=bootstrapper.js.map
