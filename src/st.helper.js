(function(window, $) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Compile params object in URL parameters. Will not append param on empty value.
     * Please, note that "?" will be added in front if result is not an empty string.
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.buildUrlParams = function(params) {
        var filtered = {};
        for (var key in params) {
            if (null !== params[key] && undefined !== params[key] && "" !== params[key]) {
                filtered[key] = params[key];
            }
        }

        var res = $.param(filtered);

        return res ? "?" + res : res;
    };
}(window, jQuery));
