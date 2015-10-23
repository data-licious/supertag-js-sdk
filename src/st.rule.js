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
            case "event":
                return "Event";
        }

        return "";
    };


    /**
     * Returns human readable label for rule operator
     *
     * @param rule operator
     *
     * @returns {String}
     */
    StSDK.prototype.getRuleOperatorLabel = function(operatorName) {
        switch (operatorName) {
            case "logical_and":
                return "And";
            case "logical_or":
                return "Or";
        }

        return "";
    };

    /**
     * Returns rule human readable label for rule condition operator
     *
     * @param rule condition operator
     *
     * @returns {String}
     */
    StSDK.prototype.getRuleConditionLabel = function(operatorName) {
        switch (operatorName) {
            case "contains":
                return "Contains";
            case "ends_with":
                return "Ends with";
            case "equal":
                return "Equal";
            case "greater_than":
                return "Greater than";
            case "less_than":
                return "Less than";
            case "not_contains":
                return "Not contains";
            case "not_equal":
                return "Not equal";
            case "regex_match":
                return "Regex match";
            case "starts_with":
                return "Starts with";
        }

        return "";
    };

}(window));
