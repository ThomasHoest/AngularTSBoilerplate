module Modules {

  export class Logger {
    private $log;

    constructor($log) {
      this.$log = $log;
    }

    public getLogFn(moduleId, fnName) {
      fnName = fnName || 'log';
     
      var $log = this.$log;
      return (msg, data, showToast) =>{
        var write = (fnName === 'error') ? $log.error : $log.log;
        var source = fnName ? '[' + fnName + '] ' : '';
        write(source, msg, data);
        if (showToast) {
          if (fnName === 'error') {
            toastr.error(msg);
          } else if (fnName === 'warning') {
            toastr.warning(msg);
          } else if (fnName === 'success') {
            toastr.success(msg);
          } else {
            toastr.info(msg);
          }
        }
      };
    }
  }
} 