module Directives {

  export interface IDirective {
    restrict: string;
    template: string;
    link: (scope, element, attrs) => void;
  }

  export class ImgPerson {
    private _basePath;
    private _unknownImage;
    public link;
    public restrict: string = 'A';

    constructor(config) {
      this._basePath = config.imageSettings.imageBasePath;
      this._unknownImage = config.imageSettings.unknownPersonImageSource;
      this.link = (scope, element, attrs) => {
        attrs.$observe('ccImgPerson', function (value) {
          value = this._basePath + (value || this._unknownImage);
          attrs.$set('src', value);
        });
      }
    }
  }

  export class SideBar {
    public restrict: string = 'A';

    public link(scope, element, attrs) {
      var $sidebarInner = element.find('.sidebar-inner');
      var $dropdownElement = element.find('.sidebar-dropdown a');
      element.addClass('sidebar');
      $dropdownElement.click((e) => {
        var dropClass = 'dropy';
        e.preventDefault();
        if (!$dropdownElement.hasClass(dropClass)) {
          hideAllSidebars();
          $sidebarInner.slideDown(350);
          $dropdownElement.addClass(dropClass);
        } else if ($dropdownElement.hasClass(dropClass)) {
          $dropdownElement.removeClass(dropClass);
          $sidebarInner.slideUp(350);
        }

        function hideAllSidebars() {
          $sidebarInner.slideUp(350);
          $('.sidebar-dropdown a').removeClass(dropClass);
        }
      });
    }
  }

  export class WidgetClose {

    public template: string = '<i class="fa fa-remove"></i>';
    public restrict: string = 'A';
    public link(scope, element, attrs) {
      attrs.$set('href', '#');
      attrs.$set('wclose');
      element.click((e) => {
        e.preventDefault();
        element.parent().parent().hide(100);
      });
    }
  }

  export class WidgetMinimize {
    public template: string = '<i class="fa fa-chevron-up"></i>';
    public restrict: string = 'A';
    public link(scope, element, attrs) {
      //$('body').on('click', '.widget .wminimize', minimize);
      attrs.$set('href', '#');
      attrs.$set('wminimize');
      element.click((e) => {
        e.preventDefault();
        var $wcontent = element.parent().parent().next('.widget-content');
        var iElement = element.children('i');
        if ($wcontent.is(':visible')) {
          iElement.removeClass('fa fa-chevron-up');
          iElement.addClass('fa fa-chevron-down');
        } else {
          iElement.removeClass('fa fa-chevron-down');
          iElement.addClass('fa fa-chevron-up');
        }
        $wcontent.toggle(500);
      });
    }
  }

  export class ScrollToTop {
    public template: string = '<a href="#"><i class="fa fa-chevron-up"></i></a>';
    public restrict: string = 'A';
    public link;

    constructor($window) {
      this.link = (scope, element, attrs) => {
        var $win = $($window);
        element.addClass('totop');
        $win.scroll(() => {
          $win.scrollTop() > 300 ? element.slideDown() : element.slideUp();
        });

        element.find('a').click((e) => {
          e.preventDefault();
          // Learning Point: $anchorScroll works, but no animation
          //$anchorScroll();
          $('body').animate({ scrollTop: 0 }, 500);
        });
      };
    }
  }

  export class Spinner {
    public restrict: string = 'A';
    public link;

    constructor($window) {
      this.link = (scope, element, attrs) => {
        scope.spinner = null;
        scope.$watch(attrs.ccSpinner, (options) => {
          if (scope.spinner) {
            scope.spinner.stop();
          }
          scope.spinner = new $window.Spinner(options);
          scope.spinner.spin(element[0]);
        }, true);
      };
    }
  }

  export class WidgetHeader {
    public restrict: string = 'A';
    public scope = {
      'title': '@',
      'subtitle': '@',
      'rightText': '@',
      'allowCollapse': '@'
    };
    public templateUrl = '/app/layout/widgetheader.html';

    public link(scope, element, attrs) {
      attrs.$set('class', 'widget-head');
    }
  }
} 