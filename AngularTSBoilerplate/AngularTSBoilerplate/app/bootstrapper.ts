class Bootstrapper {
  constructor() {
    var app = angular.module('app', [
    // Angular modules 
      'ngAnimate',        // animations
      'ngRoute',          // routing
      'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)

    // Custom modules 
      'common',           // common functions, logger, spinner
      'common.bootstrap', // bootstrap dialog wrapper functions

    // 3rd Party Modules
      'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
    ]);

    // Handle routing errors and success events
    app.run(['$route', function ($route) {
      // Include $route to kick start the router.
    }]);
  }

  public ConfigRoutes() {
    var self = this;
    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', this.GetRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', ($routeProvider, routes) => self.RouteConfigurator($routeProvider, routes)]);
  }

  private RouteConfigurator($routeProvider, routes) {
    routes.forEach(function (r) {
      $routeProvider.when(r.url, r.config);
    });
    $routeProvider.otherwise({ redirectTo: '/' });
  }

  public ConfigExceptionHandler() {
    var self = this;
    var app = angular.module('app');

    // Configure by setting an optional string value for appErrorPrefix.
    // Accessible via config.appErrorPrefix (via config value).

    app.config(['$provide', function ($provide) {
      $provide.decorator('$exceptionHandler',
        ['$delegate', 'config', 'logger', ($delegate, config, logger) => self.ExtendExceptionHandler($delegate, config, logger)]);
    }]);
  }

  private ExtendExceptionHandler($delegate, config, logger) {
    var appErrorPrefix = config.appErrorPrefix;
    var logError = logger.getLogFn('app', 'error');
    return function (exception, cause) {
      $delegate(exception, cause);
      if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) { return; }

      var errorData = { exception: exception, cause: cause };
      var msg = appErrorPrefix + exception.message;
      logError(msg, errorData, true);
    };
  }


  public Config() {
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
      appErrorPrefix: '[HT Error] ', //Configure the exceptionHandler decorator
      docTitle: 'HotTowel: ',
      events: events,
      remoteServiceName: remoteServiceName,
      version: '2.1.0'
    };

    app.value('config', config);

    app.config(['$logProvider', function ($logProvider) {
      // turn debugging off/on (no info or warn)
      if ($logProvider.debugEnabled) {
        $logProvider.debugEnabled(true);
      }
    }]);

    //#region Configure the common services via commonConfig
    app.config(['commonConfigProvider', function (cfg) {
      cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
      cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
    }]);
  }

  private GetRoutes() {
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
  }

  public Services() {
    var app = angular.module('app');
    app.factory('datacontext', ['common', (common) => { return new Services.datacontext(common); }]);
  }

  public Controllers() {
    var app = angular.module('app');
    app.controller(Controllers.Shell.ControllerId,
      ['$rootScope', 'common', 'config', Controllers.Shell]);

    app.controller(Controllers.Sidebar.ControllerId,
        ['$route', 'config', 'routes', Controllers.Sidebar]);
  }

  public Directives() {
    var app = angular.module('app');
    app.directive('ccImgPerson', ['config', (config) => { return new Services.ImgPerson(config); }]);
    app.directive('ccSidebar', () => { return new Services.SideBar(); });
    app.directive('ccWidgetClose', () => { return new Services.WidgetClose(); });
    app.directive('ccWidgetMinimize', () => { return new Services.WidgetMinimize(); });
    app.directive('ccScrollToTop', ['$window',($window) => { return new Services.ScrollToTop($window); }]);
    app.directive('ccSpinner', ['$window',($window) => { return new Services.Spinner($window); }]);
    app.directive('ccWidgetHeader', () => { return new Services.WidgetHeader(); });
  }
}

(() => {
  var bootstrapper = new Bootstrapper();
  bootstrapper.Config();
  bootstrapper.ConfigExceptionHandler();
  bootstrapper.ConfigRoutes();
  bootstrapper.Directives();
  bootstrapper.Services();
  bootstrapper.Controllers();
})();

