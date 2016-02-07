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

        return this.post('companies/' + companyId + '/access/' + email, null, data);
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

        return this.delete('companies/' + companyId + '/access/' + userId);
    };
}(window));
