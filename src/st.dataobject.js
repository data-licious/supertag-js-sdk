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

        return this.get('projects/' + id + '/data-objects', null, {
            'dataFilter': function (data) {
                var res = [];

                $.each(StSDK.jsonDecode(data), function(k, dataObject) {
                    res.push({
                        id: dataObject.id,
                        name: dataObject.name,
                        description: dataObject.description,
                        value: _getFieldNameByType(dataObject.type),
                        date_created: dataObject.date_created,
                        date_updated: dataObject.date_updated,
                        tags: dataObject.usage ? dataObject.usage.tags : [],
                        rules: dataObject.usage ? dataObject.usage.rules : [],
                        numTags: dataObject.usage ? (dataObject.usage.tags ? dataObject.usage.tags.length : 0) : 0,
                        numRules: dataObject.usage ? (dataObject.usage.rules ? dataObject.usage.rules.length : 0) : 0
                    });
                });

                return StSDK.jsonEncode(res);
            }
        });
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
        data[_getFieldNameByType(data.type)] = data.value;

        delete data.value;

        return this.post('projects/'+ projectId + '/data-objects', null, data);
    };

    /**
     * Update Data Object
     *
     * @param {Number} projectId ID of the project
     * @param {Object} data Payload data object
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.updateDataObject = function(projectId, data) {
        var payload = {
            name: data.name,
            description: data.description
        };

        payload[_getFieldNameByType(data.type)] = data.value;

        return this.put('projects/'+ projectId + '/data-objects/' + data.id, null, payload);
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

    /**
     * Returns information about data object type
     *
     * @param dataObject
     * @returns {*}
     */
    StSDK.prototype.getDataObjectTypeInformation = _getDataObjectTypeInformation;

    function _getFieldNameByType(type) {
        switch (type) {
            case "cookie_parameter_variable":
                return 'cookie_name';
            case "element_text_variable":
                return 'element_selector';
            case "javascript_variable":
            case "special_javascript_value_variable":
                return "variable_name";
            case "query_parameter_variable":
                return "query_string_key";
            case "double_click_advertiser_id_variable":
            case "string_variable":
                return "value";
            case "referrer_parameter_variable":
                return 'referrer_parameter_key';
            case "variable_template_variable":
                return "parameter_value";
            case "affinity_group_variable":
                throw "Not implemented";
            case "rule_bound_variable":
                throw "Not implemented";
            default:
                throw 'Undefined type';
        }
    }

    function _getDataObjectTypeInformation(dataObject) {
        var dataObjectTypes = [
            {
                type: "javascript_variable",
                name: "JavaScript",
                paramName: "Javascript Code"
            },
            {
                type: "variable_template_variable",
                name: dataObject.vendor,
                parameterName: dataObject.parameter_name
            },
            {
                type: "query_parameter_variable",
                name: "Query parameter",
                paramName: "Parameter Name"
            },
            {
                type: "cookie_parameter_variable",
                name: "Cookie parameter",
                paramName: "Cookie Name"
            },
            {
                type: "element_text_variable",
                name: "Element text",
                paramName: "Element Selector"
            },
            {
                type: "string_variable",
                name: "String",
                paramName: "String"
            },
            {
                type: "referrer_parameter_variable",
                name: "Referrer parameter",
                paramName: "Parameter Name"
            },
            {
                type: "double_click_advertiser_id_variable",
                name: "Advertiser ID",
                paramName: "Advertiser ID"
            },
            {
                type: "double_click_advertiser_id_variable",
                name: "Generic",
                paramName: "Advertiser ID"
            },
            {
                type: "rule_bound_variable",
                name: "Rule bound",
                paramName: "Default"
            }
        ];

        var res = $.grep(dataObjectTypes, function (entry) {
            return entry.type == dataObject.type;
        });

        if (!res.length) throw "Undefined type";

        return res[0];
    }

}(window));
