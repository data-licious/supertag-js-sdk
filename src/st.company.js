(function(window) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Gets the details of a given company
     *
     * @param {Number} id The company ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCompany = function (id) {
        StSDK.validateInt('Company ID', id);

        return this.get('companies/' + id);
    };
}(window));
