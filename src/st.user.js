(function(window, document, $) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Updates a user
     *
     * @param {Number} userId The user ID
     * @param {Object} data The user data
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.updateUser = function(userId, data) {
        return this.put('users/' + userId, null, data);
    };
}(window, document, jQuery));
