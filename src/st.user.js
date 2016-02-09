(function(window, document, $) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Get user access details
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCurrentUserAccessDetails = function() {
        return this.get('users/current-user-access');
    };
}(window, document, jQuery));
