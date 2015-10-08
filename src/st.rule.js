(function(window) {

    var StSDK = window.StSDK;

    /**
     * Gets all rules available in the specific project.
     *
     * @param {Number} id ID of the project
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectRules = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id + '/rules');
    };

}(window));
