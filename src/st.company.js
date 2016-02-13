(function(window) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Company details
     *
     * @param {Number} id The company ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCompany = function (id) {
        StSDK.validateInt('Company ID', id);

        return this.get('companies/' + id);
    };

    /**
     * Creates first project and company
     *
     * @param {String} companyName
     * @param {String} projectName
     * @param {String} projectSite
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getStarted = function (companyName, projectName, projectSite) {
        return this.post('get-started', {
            'companyName': companyName,
            'projectName': projectName,
            'projectSite': projectSite
        });
    };

}(window));
