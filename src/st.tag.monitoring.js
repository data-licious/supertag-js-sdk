(function(window, document, $) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Gets all the tag monitoring dashboards
     *
     * @param {*} projectId The Project ID.
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagMonitoringDashboards = function(projectId) {
        return this.get('tag-monitoring/' + projectId + '/dashboards');
    };

    /**
     * Gets all the tag monitoring dashboards
     *
     * @param {*} projectId The Project ID.
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagMonitoringDashboards = function(projectId) {
        return this.get('tag-monitoring/' + projectId + '/dashboards');
    };
}(window, document, jQuery));
