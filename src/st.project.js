(function(window) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Gets companies and projects relevant to the specific user
     *
     * @param {Number} limit The limit of search
     * @param {String} filter The filter of the search
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCompaniesAndProjects = function(limit, filter) {
        var params = this.buildUrlParams({
            limit: limit,
            filter: filter
        });

        return this.get('companies/projects' + params);
    };

    /**
     * Gets the details of a given project
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProject = function(id) {
        return this.get('projects/' + id);
    };
}(window));
