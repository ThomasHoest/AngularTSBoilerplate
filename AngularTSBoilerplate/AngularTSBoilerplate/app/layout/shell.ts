module Controllers {

  export class Shell {
    public static ControllerId = 'shell';
    public busyMessage: string = "Please wait...";
    public isBusy: boolean = true;
    public spinnerOptions = {
      radius: 40,
      lines: 7,
      length: 0,
      width: 30,
      speed: 1.7,
      corners: 1.0,
      trail: 100,
      color: '#F58A00'
    };

    private logSuccess;
    private common;
    private events;

    constructor($rootScope, common, config) {
      //var vm = this;
      this.logSuccess = common.logger.getLogFn(Shell.ControllerId, 'success');
      this.common = common;
      this.events = config.events;
      this.Activate();

      $rootScope.$on('$routeChangeStart',
          (event, next, current) => { this.toggleSpinner(true); }
        );

      $rootScope.$on(this.events.controllerActivateSuccess,
          (data) => { this.toggleSpinner(false); }
        );

      $rootScope.$on(this.events.spinnerToggle,
          (data) => { this.toggleSpinner(data.show); }
        );
    }

    private Activate() {
      this.logSuccess('Hot Towel Angular loaded!', null, true);
      this.common.activateController([], Shell.ControllerId);
    }

    public toggleSpinner(on) {
      this.isBusy = on;
    }

  }
}