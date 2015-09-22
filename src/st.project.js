(function(window) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Gets companies and projects relevant to the specific user
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCompaniesAndProjects = function(limit, filter) {
        var params = buildUrlParams({
            limit: limit,
            filter: filter
        });

        return this.get('companies/projects' + params);
    };
}(window));
