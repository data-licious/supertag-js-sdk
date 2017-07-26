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
     * Create tag monitoring dashboard
     *
     * @param {*} projectId The Project ID.
     * @param {*} data request data.
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.createTagMonitoringDashboards = function(projectId, data) {
        return this.post('tag-monitoring/' + projectId + '/dashboards', null, data);
    };

    /**
     * Update tag monitoring dashboard
     *
     * @param {*} projectId The Project ID.
     * @param {*} dashboardId The dashboard ID.
     * @param {*} data request data.
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.updateTagMonitoringDashboards = function(projectId, dashboardId, data) {
        return this.put('tag-monitoring/' + projectId + '/dashboards/' + dashboardId, null, data);
    };

    /**
     * Deletes tag monitoring dashboard
     *
     * @param {*} projectId The Project ID.
     * @param {*} dashboardId The dashboard ID.
     * @param {*} data request data.
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteTagMonitoringDashboards = function(projectId, dashboardId) {
        return this.delete('tag-monitoring/' + projectId + '/dashboards/' + dashboardId);
    };
}(window, document, jQuery));
