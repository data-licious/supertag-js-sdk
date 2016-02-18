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
    StSDK.prototype.getCompany = function (id, ajaxOpts) {
        StSDK.validateInt('Company ID', id);

        return this.get('companies/' + id, {}, ajaxOpts);
    };

    /**
     * Gets the access rights of a given company
     *
     * @param {Number} id The company ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCompanyAccessRights = function (id) {
        StSDK.validateInt('Company ID', id);

        return this.get('companies/' + id + '/access-rights');
    };

    /**
     * Grant company Access Rights
     *
     * @param {Number} companyId The company ID
     * @param {string} email The User email
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.grantCompanyAccess = function(companyId, email, boolInvite) {
        StSDK.validateInt('company ID', companyId);

        var data = {};
        if (boolInvite) {
            data = {
                'invite': 1
            };
        }

        return this.post('companies/' + companyId + '/grant-access/' + email, null, data);
    };


    /**
     * Revoke company Access Rights
     *
     * @param {Number} companyId The company ID
     * @param {Number} userId The User ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.revokeCompanyAccess = function(companyId, userId) {
        StSDK.validateInt('company ID', companyId);
        StSDK.validateInt('User ID', userId);

        return this.delete('companies/' + companyId + '/revoke-access/' + userId);
    };

    /**
     * Updates company settings
     *
     * @param {Number} id The company ID
     * @param {Object} data The comapny settings
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.updateCompanySettings = function(id, data) {
        StSDK.validateInt('Company ID', id);

        return this.put('companies/' + id + '/settings', null, {
            'name': data.name,
            'new_ip_range': data.new_ip_range,
            'test_ip': data.test_ip,
            'delete_ip_ranges': data.delete_ip_ranges,
        });
    };

    /**
     * Get company settings
     *
     * @param {Number} id The company ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCompanySettings = function(id) {
        StSDK.validateInt('Company ID', id);

        return this.get('companies/' + id + '/settings');
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
        return this.post('get-started', null, {
            'companyName': companyName,
            'projectName': projectName,
            'projectSite': projectSite
        });
    };

    /**
     * Delete company
     *
     * @param {Number} companyId The company ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteCompany = function(companyId) {
        StSDK.validateInt('company ID', companyId);

        return this.delete('companies/' + companyId);
    };

}(window));
