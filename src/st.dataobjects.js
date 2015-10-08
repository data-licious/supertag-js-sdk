(function(window) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Gets all data objects available in the specific project
     *
     * @param {Number} id ID of the project
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectDataObjects = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id + '/data-objects');
    };

    /**
     * Returns data object human readable label for data object
     *
     * @param {Object} data Data object
     *
     * @returns {String}
     */
    StSDK.prototype.getDataObjectTypeLabel = function(data) {
        switch (data.type) {
            case "affinity_group_variable":
                return "Affinity";
            case "cookie_parameter_variable":
                return "Cookie";
            case "double_click_advertiser_id_variable":
                return "DoubleClick Advertiser";
            case "element_text_variable":
                return "Element text";
            case "javascript_variable":
            case "special_javascript_value_variable":
                return "JavaScript";
            case "query_parameter_variable":
                return "URL Parameter";
            case "string_variable":
                return "String";
            case "variable_template_variable":
                return data.vendor;
            case "rule_bound_variable":
                return "Rule based";
            case "referrer_parameter_variable":
                return "Referrer parameter";
        }

        return "";
    };

}(window));
