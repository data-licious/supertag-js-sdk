(function(window) {

    var StSDK = window.StSDK;

    /**
     * Create an rule
     *
     * @param {Number} projectId  The project ID
     * @param {Object} data The rule data
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.addRule = function(projectId, data) {
        StSDK.validateInt('Project ID', projectId);

        var ruleObj = {
            'name': data.name,
            'description': data.description,
            'type': data.type
        };
        if ('event' == data.type) {
            ruleObj.selector = data.selector;
            ruleObj.eventName = data.event_name;
        } else if ('combined_rule' == data.type) {
            ruleObj.logicalOperator = data.logicalOperator;
            ruleObj.innerRules = data.innerRules;
        } else {
            ruleObj.logicalOperatorHandle = data.conditions.logicalOperatorHandle;
            ruleObj.children = data.conditions.children;
        }

        return this.post('projects/' + projectId + '/rule', null, ruleObj);
    };

    /**
     * Duplicate an rule
     * @param {Number} id The rule ID
     * @param {Number} projectId  The project ID
     * @param {Object} data The rule data
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.duplicateRule = function(id, projectId, data) {
        StSDK.validateInt('Rule ID', id);

        return this.post('projects/' + projectId + '/rule/' + id, null, {
            'name': data.name
        });
    };

    /**
     * Apply an rule to tag
     *
     * @param {Number} projectId The project ID
     * @param {Number} ruleId The rule ID
     * @param {Number} tagId The tag ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.applyRuleToTag = function(projectId, ruleId, tagId) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Rule ID', ruleId);
        StSDK.validateInt('Tag ID', tagId);

        return this.post('projects/' + projectId + '/apply/' + ruleId + '/' + tagId);
    };

    /**
     * Add event to project
     *
     * @param {Number} projectId The project ID
     * @param {Number} eventId The event ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.addEventToProject = function(projectId, eventId) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Event ID', eventId);

        return this.post('projects/' + projectId + '/add-event/' + eventId);
    };

    /**
     * Add Business rule to project
     *
     * @param {Number} projectId The project ID
     * @param {Number} ruleId The rule ID
     * @param {Number} tagId The container tag ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.addBusinessRuleToProject = function(projectId, ruleId, tagId) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Rule ID', ruleId);
        StSDK.validateInt('Tag ID', tagId);

        return this.post('projects/' + projectId + '/add-business-rule/' + ruleId + '/' + tagId);
    };

    /**
     * Gets all dataObjects available in the given project
     *
     * @param {Number} id ID of the project
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getDataObjectList = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id + '/data-objects');
    };

    /**
     * Gets rule with conditions
     *
     * @param {Number} id ID of the project
     * @param {Number} ruleId ID of the rule
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectRule = function(id, ruleId) {
        StSDK.validateInt('Project ID', id);
        StSDK.validateInt('Rule ID', ruleId);

        return this.get('projects/' + id + '/rules/' + ruleId);
    };

    /**
     * Gets rule with conditions by Rule Tag
     *
     * @param {Number} id ID of the project
     * @param {Number} ruleTagId ID of the RuleTag
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectRuleByRuleTag = function(id, ruleTagId) {
        StSDK.validateInt('Project ID', id);
        StSDK.validateInt('RuleTag ID', ruleTagId);

        return this.get('projects/' + id + '/rule-by-tag/' + ruleTagId);
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
     * Gets all rules available in the given project in Simple list
     *
     * @param {Number} id ID of the project
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectRulesSimpleList = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id + '/rules?simple=1');
    };

    /**
     * Updates an rule
     *
     * @param {Number} id The rule ID
     * @param {Number} projectId  The project ID
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
            'logicalOperator': data.logicalOperator,
            'innerRules': data.innerRules
        });
    };

    /**
     * Delete an rule
     *
     * @param {Number} id The rule ID
     * @param {Number} projectId  The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteRule = function(id, projectId) {
        StSDK.validateInt('Rule ID', id);
        StSDK.validateInt('Project ID', projectId);

        return this.delete('projects/' + projectId + '/rule/' + id);
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
            case "event_container":
            case "event":
                return "Event";
            case "combined_rule":
                return "Combined rule";
            case "special_rule":
                return "Special rule";
        }

        return "";
    };


    /**
     * Returns human readable label for rule operator
     *
     * @param {String} operatorName
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
     * @param {String} operatorName Condition operator
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
        return ['business_rule', 'event', 'combined_rule'];
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

    /**
     * Returns rule(Event) type list
     *
     * @returns {Array}
     */
    StSDK.prototype.getEventTypeList = function() {
        return [
                'click',
                'dblclick',
                'focus',
                'blur',
                'mouseup',
                'mousedown',
                'load',
                'submit',
                'change'
            ];
    };


    /**
     * Returns rule(Event) human readable type
     *
     * @param {String} typeName rule type
     *
     * @returns {String}
     */
    StSDK.prototype.getEventTypeName = function(typeName) {
        switch (typeName) {
            case 'click':
                return 'Click';
            case 'dblclick':
                return 'Double Click';
            case 'focus':
                return 'Focus';
            case 'blur':
                return 'Blur';
            case 'mouseup':
                return 'Mouse Up';
            case 'mousedown':
                return 'Mouse Down';
            case 'load':
                return 'Load';
            case 'submit':
                return 'Submit';
            case 'change':
                return 'Change';
        }

        return (typeName) ? typeName : '';
    };


}(window));
