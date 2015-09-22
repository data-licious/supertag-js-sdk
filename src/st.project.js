(function(window) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Returns companies and projects relevant to the specific user
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

    /**
     * Returns project details
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProject = function(id) {
        return this.get('projects/' + id);
    };
}(window));
