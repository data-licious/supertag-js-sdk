(function(window) {
    'use strict';

    var StSDK = window.StSDK;


    /**
     * Delete an DataObject
     *
     * @param {Number} id The DataObject ID
     * @param {Number} projectId  The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteDataObject = function(id, projectId) {
        StSDK.validateInt('DataObject ID', id);
        StSDK.validateInt('Project ID', projectId);

        return this.delete('projects/' + projectId + '/data-objects/' + id);
    };

    /**
     * Gets system data object types
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getAllSystemDataObjects = function(tagId, projectId) {

        return this.get('system-data-object-types');
    };

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
                        js_code: dataObject.js_code,
                        is_new:dataObject.is_new,
                        is_updated:dataObject.is_updated,
                        is_editable:dataObject.is_editable,
                        autoinstall_app_list: dataObject.autoinstall_app_list,
                        variable_type: dataObject.variable_type,
                        name: dataObject.name,
                        type: dataObject.type,
                        owner_type: dataObject.owner_type,
                        description: dataObject.description,
                        paramValue: dataObject[_getFieldNameByType(dataObject.type)],
                        date_created: dataObject.date_created,
                        date_updated: dataObject.date_updated,
                        tags: dataObject.usage ? dataObject.usage.tags : [],
                        rules: dataObject.usage ? dataObject.usage.rules : [],
                        num_tags: dataObject.usage ? (dataObject.usage.tags ? dataObject.usage.tags.length : 0) : 0,
                        num_rules: dataObject.usage ? (dataObject.usage.rules ? dataObject.usage.rules.length : 0) : 0,
                        variable_template: dataObject.variable_template,
                        variable_template_name: dataObject.variable_template_name,
                        parameter_name: dataObject.parameter_name,
                        parameter_value: dataObject.parameter_value,
                        twig_template: dataObject.twig_template,
                        vendor: dataObject.vendor,
                        platform: dataObject.platform,
                        version: dataObject.version
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
        data[_getFieldNameByType(data.type)] = data.paramValue;

        delete data.paramValue;

        return this.post('projects/'+ projectId + '/data-objects', null, data, {
            dataFilter: _doJsonDataFilter
        });
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

        payload[_getFieldNameByType(data.type)] = data.paramValue;

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
        if (data.type === 'variable_template_variable') {
            var _label = _getGetDataObjectTypeLabelByType(data.variable_type);

            return (_label)?_label:data.variable_template_name; // in case of existed VariableTemplateVariable
        }

        return _getGetDataObjectTypeLabelByType(data.type);
    };

    function _getGetDataObjectTypeLabelByType(dataObjectType) {
        switch (dataObjectType) {
            case "affinity_group_variable":
                return "Affinity";
            case "cookie_parameter_variable":
                return "Cookie";
            case "double_click_advertiser_id_variable":
                return "DoubleClick Advertiser ID";
            case "element_text_variable":
                return "Element text";
            case "javascript_variable":
            case "special_javascript_value_variable":
                return "JavaScript";
            case "query_parameter_variable":
                return "Query Parameter";
            case "string_variable":
                return "String";
            case "rule_bound_variable":
                return "Rule based";
            case "referrer_parameter_variable":
                return "Referrer parameter";
        }

        return "";
    }

    /**
     * Returns information about data object type
     *
     * @param dataObject
     * @returns {*}
     */
    StSDK.prototype.getDataObjectTypeInformation = _getDataObjectTypeInformation;

    function _doJsonDataFilter(data) {
        var res = StSDK.jsonDecode(data);
        res.paramValue = res[_getFieldNameByType(res.type)];
        delete res[_getFieldNameByType(res.type)];

        return StSDK.jsonEncode(res);
    }

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
                return "";
            case "rule_bound_variable":
                return "";
            default:
                return "value";
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
