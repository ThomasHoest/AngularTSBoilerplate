module Controllers {

  export class Dashboard {
    public static ControllerId = 'dashboard';
    public messageCount = 0;
    public people = [];
    public title = "Dashboard";
    public news = {
      title: 'Hot Towel Angular',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };

    private _log;
    private _datacontext;
    private _common;

    constructor(common, datacontext) {
      this._datacontext = datacontext;
      this._common = common;
      this._log = common.logger.getLogFn(Dashboard.ControllerId);
      this.activate();
    }

    public activate() {
      var promises = [this.getMessageCount(), this.getPeople()];
      this._common.activateController(promises, Dashboard.ControllerId)
        .then(() => { this._log('Activated Dashboard View'); });
    }

    public getMessageCount() {
      return this._datacontext.getMessageCount().then((data) => {
        return this.messageCount = data;
      });
    }

    public getPeople() {
      return this._datacontext.getPeople().then((data) => {
        return this.people = data;
      });
    }

  }
} 