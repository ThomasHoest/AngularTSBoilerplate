var Services;
(function (Services) {
    var Sidebar = (function () {
        function Sidebar($route, config, routes) {
            this._routes = routes;
            this.$route = $route;
        }
        Sidebar.prototype.Activate = function () {
            this.GetNavRoutes();
        };

        Sidebar.prototype.GetNavRoutes = function () {
            this._navRoutes = this._routes.filter(function (r) {
                return r.config.settings && r.config.settings.nav;
            }).sort(function (r1, r2) {
                return r1.config.settings.nav - r2.config.settings.nav;
            });
        };

        Sidebar.prototype.IsCurrent = function (route) {
            if (!route.config.title || !this.$route.current || !this.$route.current.title) {
                return '';
            }
            var menuName = route.config.title;
            return this.$route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        };
        return Sidebar;
    })();
    Services.Sidebar = Sidebar;
})(Services || (Services = {}));
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
//# sourceMappingURL=s.js.map
