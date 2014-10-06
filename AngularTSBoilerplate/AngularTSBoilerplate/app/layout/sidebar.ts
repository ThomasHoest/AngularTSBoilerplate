module Controllers{
  export class Sidebar{
    public static ControllerId = 'sidebar';
    public navRoutes;

    private _routes;    
    private $route;

    constructor($route, config, routes){
      this._routes = routes;
      this.$route = $route;
      this.Activate();
    }

    public Activate(){
      this.GetNavRoutes();
    }

    public GetNavRoutes() {
      this.navRoutes = this._routes.filter(function(r) {
        return r.config.settings && r.config.settings.nav;
      }).sort(function(r1, r2) {
        return r1.config.settings.nav - r2.config.settings.nav;
      });
    }
        
    public IsCurrent(route) {
      if (!route.config.title || !this.$route.current || !this.$route.current.title) {
        return '';
      }
      var menuName = route.config.title;
      return this.$route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }
  }
}


//(function () { 
//    'use strict';
    
//    var controllerId = 'sidebar';
//    angular.module('app').controller(controllerId,
//        ['$route', 'config', 'routes', sidebar]);

//    function sidebar($route, config, routes) {
//        var vm = this;

//        vm.isCurrent = isCurrent;

//        activate();

//        function activate() { getNavRoutes(); }
        
//        function getNavRoutes() {
//            vm.navRoutes = routes.filter(function(r) {
//                return r.config.settings && r.config.settings.nav;
//            }).sort(function(r1, r2) {
//                return r1.config.settings.nav - r2.config.settings.nav;
//            });
//        }
        
//        function isCurrent(route) {
//            if (!route.config.title || !$route.current || !$route.current.title) {
//                return '';
//            }
//            var menuName = route.config.title;
//            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
//        }
//    };
//})();
 