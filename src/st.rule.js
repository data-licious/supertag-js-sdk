(function(window) {

    var StSDK = window.StSDK;

    /**
     * Gets all rules available in the given project
     *
     * @param {Number} id ID of the project
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectRules = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id + '/rules');
    };


    /**
     * Returns rule human readable label for rule
     *
     * @param {Object} data rule object
     *
     * @returns {String}
     */
    StSDK.prototype.getRuleObjectTypeLabel = function(data) {
        switch (data.type) {
            case "business_rule":
                return "Business rule";
        }

        return "";
    };

}(window));
