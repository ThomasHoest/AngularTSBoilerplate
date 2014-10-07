var Controllers;
(function (Controllers) {
    var Dashboard = (function () {
        function Dashboard(common, datacontext) {
            this.messageCount = 0;
            this.people = [];
            this.title = "Dashboard";
            this.news = {
                title: 'Hot Towel Angular',
                description: 'Hot Towel Angular is a SPA template for Angular developers.'
            };
            this._datacontext = datacontext;
            this._common = common;
            this._log = common.logger.getLogFn(Dashboard.ControllerId);
            this.activate();
        }
        Dashboard.prototype.activate = function () {
            var _this = this;
            var promises = [this.getMessageCount(), this.getPeople()];
            this._common.activateController(promises, Dashboard.ControllerId).then(function () {
                _this._log('Activated Dashboard View');
            });
        };

        Dashboard.prototype.getMessageCount = function () {
            var _this = this;
            return this._datacontext.getMessageCount().then(function (data) {
                return _this.messageCount = data;
            });
        };

        Dashboard.prototype.getPeople = function () {
            var _this = this;
            return this._datacontext.getPeople().then(function (data) {
                return _this.people = data;
            });
        };
        Dashboard.ControllerId = 'dashboard';
        return Dashboard;
    })();
    Controllers.Dashboard = Dashboard;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=dashboardts.js.map
