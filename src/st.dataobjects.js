(function(window) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Gets all data objects available in the specific project
     *
     * @param {Number} projectId ID of the project
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectDataObjects = function(projectId) {
        return this.get('projects/' + projectId + '/data-objects');
    };
}(window));