module Modules {
  export class Spinner {
    private common;
    private commonConfig;

    constructor(common, commonConfig) {
      this.common = common;
      this.commonConfig = commonConfig;
    }
    public spinnerHide() {
      this.spinnerToggle(false);
    }

    public spinnerShow() {
      this.spinnerToggle(true);
    }

    private spinnerToggle(show) {
      this.common.$broadcast(this.commonConfig.config.spinnerToggleEvent, { show: show });
    }
  }
} 