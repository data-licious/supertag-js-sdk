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
     * Add new Data Object to a Project
     *
     * @param {Number} projectId ID of the project
     * @param {Object} data Payload data object
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.createDataObject = function(projectId, data) {
        var field;

        switch (data.type) {

            case "cookie_parameter_variable":
                field = 'cookie_name';
                break;

            case "element_text_variable":
                field = 'element_selector';
                break;

            case "javascript_variable":
            case "special_javascript_value_variable":
                field = "variable_name";
                break;

            case "query_parameter_variable":
                field = "query_string_key";
                break;

            case "double_click_advertiser_id_variable":
            case "string_variable":
                field = "value";
                break;

            case "referrer_parameter_variable":
                field = 'referrer_parameter_key';
                break;

            case "variable_template_variable":
                //field = "parameter_value";
                throw "Not implemented";

            case "affinity_group_variable":
                throw "Not implemented";

            case "rule_bound_variable":
                throw "Not implemented";

            default:
                throw 'Undefined type';
        }

        data[field] = data.value;
        delete data.value;

        return this.post('projects/'+ projectId + '/data-objects', null, data);
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
