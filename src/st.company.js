(function(window) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Return a single company details
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCompany = function (id) {
        return this.get('companies/' + id);
    };
}(window));
