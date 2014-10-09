module Controllers {

  export class Admin {
    public static ControllerId = 'admin';
    public title;
    private _log;
    private _common;
    constructor(common) {
      this._log = common.logger.getLogFn(Dashboard.ControllerId);
      this._common = common;
      var vm = this;
      vm.title = 'Admin';

      this.activate();
    }

    public activate() {
      this._common.activateController([], Admin.ControllerId)
        .then(() =>{ this._log('Activated Admin View'); });
    }
  }

} 