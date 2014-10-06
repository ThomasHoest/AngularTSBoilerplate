var Directives;
(function (Directives) {
    var ImgPerson = (function () {
        function ImgPerson(config) {
            this.restrict = 'A';
            this._basePath = config.imageSettings.imageBasePath;
            this._unknownImage = config.imageSettings.unknownPersonImageSource;
            this.link = function (scope, element, attrs) {
                attrs.$observe('ccImgPerson', function (value) {
                    value = this._basePath + (value || this._unknownImage);
                    attrs.$set('src', value);
                });
            };
        }
        return ImgPerson;
    })();
    Directives.ImgPerson = ImgPerson;

    var SideBar = (function () {
        function SideBar() {
            this.restrict = 'A';
        }
        SideBar.prototype.link = function (scope, element, attrs) {
            var $sidebarInner = element.find('.sidebar-inner');
            var $dropdownElement = element.find('.sidebar-dropdown a');
            element.addClass('sidebar');
            $dropdownElement.click(function (e) {
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
        };
        return SideBar;
    })();
    Directives.SideBar = SideBar;

    var WidgetClose = (function () {
        function WidgetClose() {
            this.template = '<i class="fa fa-remove"></i>';
            this.restrict = 'A';
        }
        WidgetClose.prototype.link = function (scope, element, attrs) {
            attrs.$set('href', '#');
            attrs.$set('wclose');
            element.click(function (e) {
                e.preventDefault();
                element.parent().parent().hide(100);
            });
        };
        return WidgetClose;
    })();
    Directives.WidgetClose = WidgetClose;

    var WidgetMinimize = (function () {
        function WidgetMinimize() {
            this.template = '<i class="fa fa-chevron-up"></i>';
            this.restrict = 'A';
        }
        WidgetMinimize.prototype.link = function (scope, element, attrs) {
            //$('body').on('click', '.widget .wminimize', minimize);
            attrs.$set('href', '#');
            attrs.$set('wminimize');
            element.click(function (e) {
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
        };
        return WidgetMinimize;
    })();
    Directives.WidgetMinimize = WidgetMinimize;

    var ScrollToTop = (function () {
        function ScrollToTop($window) {
            this.template = '<a href="#"><i class="fa fa-chevron-up"></i></a>';
            this.restrict = 'A';
            this.link = function (scope, element, attrs) {
                var $win = $($window);
                element.addClass('totop');
                $win.scroll(function () {
                    $win.scrollTop() > 300 ? element.slideDown() : element.slideUp();
                });

                element.find('a').click(function (e) {
                    e.preventDefault();

                    // Learning Point: $anchorScroll works, but no animation
                    //$anchorScroll();
                    $('body').animate({ scrollTop: 0 }, 500);
                });
            };
        }
        return ScrollToTop;
    })();
    Directives.ScrollToTop = ScrollToTop;

    var Spinner = (function () {
        function Spinner($window) {
            this.restrict = 'A';
            this.link = function (scope, element, attrs) {
                scope.spinner = null;
                scope.$watch(attrs.ccSpinner, function (options) {
                    if (scope.spinner) {
                        scope.spinner.stop();
                    }
                    scope.spinner = new $window.Spinner(options);
                    scope.spinner.spin(element[0]);
                }, true);
            };
        }
        return Spinner;
    })();
    Directives.Spinner = Spinner;

    var WidgetHeader = (function () {
        function WidgetHeader() {
            this.restrict = 'A';
            this.scope = {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            };
            this.templateUrl = '/app/layout/widgetheader.html';
        }
        WidgetHeader.prototype.link = function (scope, element, attrs) {
            attrs.$set('class', 'widget-head');
        };
        return WidgetHeader;
    })();
    Directives.WidgetHeader = WidgetHeader;
})(Directives || (Directives = {}));
//# sourceMappingURL=directivests.js.map
