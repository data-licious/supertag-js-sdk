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
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id);
    };


    /**
     * Gets Project deployment history data based on Project Id
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectDeployHistory = function(id) {
        StSDK.validateInt('Project ID', id);
        return this.get('projects/' + id + '/deployments');        
    };


    /**
     * Retrieves Project Release notes prior to deployement (requires Admin role)
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectReleaseNotes = function(id) {
        StSDK.validateInt('Project ID', id);
        return this.get('projects/' + id + '/release-notes');
    };
}(window));
