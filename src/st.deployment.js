(function(window) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Returns deployment history for the given project
     *
     * @param {Number} projectId Project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getDeployments = function(projectId) {
        StSDK.validateInt('Project ID', projectId);

        return this.get('projects/' + projectId + '/deployments');
    };

    /**
     * Returns deployment details.
     *
     * @param {Number} projectId Project ID
     * @param {Number} deploymentId Deployment ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getDeploymentDetails = function(projectId, deploymentId) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Deployment ID', deploymentId);

        return this.get('projects/' + projectId + '/deployments/' + deploymentId);
    };

    /**
     * Schedule deployment.
     *
     * @param {Number} projectId Project ID
     * @param {String} comment Deployment comment
     * @param {Number[]} tagsToSkip Tag IDs to skip
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.scheduleDeployment = function(projectId, comment, tagsToSkip) {
        return this.post('projects/' + projectId + '/deploy', undefined, {
            comment: comment,
            tagsToSkip: tagsToSkip
        });
    };

    /**
     * Schedule re-deployment.
     *
     * @param {Number} projectId Project ID
     * @param {String} version Version to re-deploy
     * @param {String} comment Redeployment comment
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.scheduleRedeployment = function(projectId, version, comment) {

        return this.post('projects/' + projectId + '/redeploy/' + version, undefined, {comment: comment});
    };

    /**
     * Request deployment.
     *
     * @param {Number} projectId Project ID
     * @param {String} message Message to project admins
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.requestDeployment = function(projectId, message) {

        return this.post('projects/' + projectId + '/request-deployment', undefined, {message: message});
    };

}(window));
