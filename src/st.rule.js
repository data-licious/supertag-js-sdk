(function(window) {

    var StSDK = window.StSDK;

    /**
     * Gets all dataObjects available in the given project
     *
     * @param {Number} id ID of the project
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getDataObjectList = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id + '/data-object-list');
    };

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
     * Updates an rule
     *
     * @param {Number} id The rule ID
     * @param {Object} data The rule data
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.updateRule = function(id, projectId, data) {
        StSDK.validateInt('Rule ID', id);

        return this.put('projects/' + projectId + '/rule/' + id, null, {
            'id': data.id,
            'name': data.name,
            'description': data.description,
            'conditions': data.conditions,
            'type': data.type,
            'selector': data.selector,
            'event_name': data.event_name,
        });
    };

    /**
     * Returns rule human readable label for rule
     *
     * @param {Object} data rule object
     *
     * @returns {String}
     */
    StSDK.prototype.getRuleTypeLabel = function(data) {
        switch (data) {
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

    /**
     * Returns rule type list
     *
     * @returns {Array}
     */
    StSDK.prototype.getRuleTypeList = function() {
        return ['business_rule', 'event'];
    };

    /**
     * Returns rule condition logical operator list
     *
     * @returns {Array}
     */
    StSDK.prototype.getConditionLogicalOperatorList = function() {
        return ['logical_and', 'logical_or'];
    };


    /**
     * Returns rule condition operator list
     *
     * @returns {Array}
     */
    StSDK.prototype.getConditionOperatorList = function() {
        return [
                "contains",
                "ends_with",
                "equal",
                "greater_than",
                "less_than",
                "not_contains",
                "not_equal",
                "regex_match",
                "starts_with"
            ];
    };

}(window));
