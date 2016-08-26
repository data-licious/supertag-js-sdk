(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * @constant {string} APP_FORMAT_FLAT
     */
    StSDK.APP_FORMAT_FLAT = 'flat';

    /**
     * @constant {string} APP_FORMAT_STANDARD
     */
    StSDK.APP_FORMAT_STANDARD = 'standard';

    /**
     * @constant {String} APP_TEMPLATE_FORMAT_FLAT
     */
    StSDK.APP_TEMPLATE_FORMAT_FLAT = 'flat';

    /**
     * @constant {String} APP_TEMPLATE_FORMAT_GROUPED
     */
    StSDK.APP_TEMPLATE_FORMAT_GROUPED = 'grouped';

    /**
     * @constant {String} APP_TEMPLATE_FORMAT_GROUPED_APP_ONLY
     */
    StSDK.APP_TEMPLATE_FORMAT_GROUPED_APP_ONLY = 'grouped_app_only';

    /**
     * @constant {string} APP_TEMPLATE_FORMAT_GROUPED_VENDOR_ONLY
     */
    StSDK.APP_TEMPLATE_FORMAT_GROUPED_VENDOR_ONLY = 'grouped_vendor_only';

    /**
     * @constant {String} APP_TEMPLATE_FORMAT_STANDARD
     */
    StSDK.APP_TEMPLATE_FORMAT_STANDARD = 'standard';

    /**
     * @constant {string} APP_TEMPLATE_FORMAT_STANDARD_VENDOR_ONLY
     */
    StSDK.APP_TEMPLATE_FORMAT_STANDARD_VENDOR_ONLY = 'standard_vendor_only';

    /**
     * Gets details of a given app
     *
     * @param {Number} id The app ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getApp = function(id, format) {
        var format = format || StSDK.APP_FORMAT_FLAT;
        StSDK.validateInt('App ID', id);
        StSDK.validateOpts('Format', format, [
            StSDK.APP_FORMAT_FLAT,
            StSDK.APP_FORMAT_STANDARD
        ]);

        return this.get('apps/' + id, null, {
            dataFilter: function(data, type) {
                if (StSDK.APP_FORMAT_FLAT === format || 'json' !== type) {
                    return data;
                }

                var app = StSDK.jsonDecode(data),
                    tagTmpls = {},
                    tags = app.tags;

                $.each(tags, function(k, tag) {
                    var tagTmplId = tag.templateId;

                    if (!(tagTmplId in tagTmpls)) {
                        tagTmpls[tagTmplId] = [tag];
                    } else {
                        tagTmpls[tagTmplId].push(tag);
                    }
                });

                app['tag_templates'] = tagTmpls;
                delete app.tags;

                return StSDK.jsonEncode(app);
            }
        });
    };

    /**
     * Gets details of a given app template
     *
     * @param {Number} id The app template ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getAppTemplate = function(id) {
        StSDK.validateInt('App template ID', id);

        return this.get('app-templates/' + id);
    };

    /**
     * Gets all app template simple list [id, name]
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getAllAppTemplates = function() {
        return this.get('all-app-templates');
    };

    /**
     * Add an app template to company whitelist
     *
     * @param {Number} id The Company ID
     * @param {Number} id The app template ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.addAppTemplateWhitelist = function(companyId, appTemplateId) {
        StSDK.validateInt('Company Id', companyId);
        StSDK.validateInt('App Template Id', appTemplateId);

        return this.post('company/' + companyId + '/whitelist/' + appTemplateId, null, {});
    };

    /**
     * Add an app template to company blacklist
     *
     * @param {Number} id The Company ID
     * @param {Number} id The app template ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.addAppTemplateBlacklist = function(companyId, appTemplateId) {
        StSDK.validateInt('Company Id', companyId);
        StSDK.validateInt('App Template Id', appTemplateId);

        return this.post('company/' + companyId + '/blacklist/' + appTemplateId, null, {});
    };

    /**
     * Remove an app template from company whitelist
     *
     * @param {Number} id The Company ID
     * @param {Number} id The app template ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.removeAppTemplateFromWhitelist = function(companyId, appTemplateId) {
        StSDK.validateInt('Company Id', companyId);
        StSDK.validateInt('App Template Id', appTemplateId);

        return this.delete('company/' + companyId + '/whitelist/' + appTemplateId);
    };

    /**
     * Remove an app template from company blacklist
     *
     * @param {Number} id The Company ID
     * @param {Number} id The app template ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.removeAppTemplateFromBlacklist = function(companyId, appTemplateId) {
        StSDK.validateInt('Company Id', companyId);
        StSDK.validateInt('App Template Id', appTemplateId);

        return this.delete('company/' + companyId + '/blacklist/' + appTemplateId);
    };

    /**
     * Creates an app template
     *
     * @param {Object} data The app template data
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.createAppTemplate = function(data) {
        StSDK.validatePlainObj('App template data', data);

        return this.post('app-templates', null, data);
    };

    /**
     * Updates an app template
     *
     * @param {Number} id The app template ID
     * @param {Object} data The app template data
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.updateAppTemplate = function(id, data) {
        StSDK.validateInt('App template ID', id);
        StSDK.validatePlainObj('App template data', data);

        return this.put('app-templates/' + id, null, data);
    };

    /**
     * Deletes an app template
     *
     * @param {Number} id The app template ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteAppTemplate = function(id) {
        StSDK.validateInt('ID', id);

        return this.delete('app-templates/' + id);
    };

    /**
     * Gets details of all/some app templates
     * Examples:
     * ```javascript
     *      $.when(_stSDK.getAppTemplates('flat')).then(function(json) {
     *          // Variable `json` comes with structure:
     *          //  {
     *          //      "app_template": {
     *          //          "id": 1,
     *          //          ""
     *          //      }
     *          //  }
     *      });
     * ```
     * ```javascript
     *      $.when(_stSDK.getAppTemplates('grouped')).then(function(json) {
     *          // Variable `json` comes with structure:
     *          //  {
     *          //    "Google": {
     *          //      "Google Analytics": [
     *          //        {
     *          //          "id": 1,
     *          //          "name": "App template 1",
     *          //          "tag_templates": [
     *          //            {
     *          //              "id": 1,
     *          //              "name": "Tag template 1",
     *          //              ...
     *          //            },
     *          //            {
     *          //              "id": 2,
     *          //              "name": "Tag template 2",
     *          //              ...
     *          //            }
     *          //          ]
     *          //        },
     *          //        {
     *          //          "id": 2,
     *          //          "name": "App template 2",
     *          //          "tag_templates": [
     *          //            {
     *          //              "id": 3,
     *          //              "name": "Tag template 3",
     *          //              ...
     *          //            },
     *          //            {
     *          //              "id": 4,
     *          //              "name": "Tag template 4",
     *          //              ...
     *          //            }
     *          //          ]
     *          //        }
     *          //      ],
     *          //      "Google Adwords": [
     *          //        ...
     *          //      ]
     *          //    },
     *          //    "Adobe": {
     *          //      "Adobe Analytics": [
     *          //        ...
     *          //      ]
     *          //    }
     *          //  }
     *      });
     * ```
     * ```javascript
     *      $.when(_stSDK.getAppTemplates('standard')).then(function(json) {
     *          // Variable `json` comes with structure:
     *          //  [
     *          //    {
     *          //      "name": "Google",
     *          //      "platforms": [
     *          //        {
     *          //          "name": "Google Analytics",
     *          //          "applications": [
     *          //            {
     *          //              "id": 1,
     *          //              "name": "App template 1",
     *          //              "tag_templates": [
     *          //                {
     *          //                  "id": 1,
     *          //                  "name": "Tag template 1",
     *          //                  ...
     *          //                },
     *          //                {
     *          //                  "id": 2,
     *          //                  "name": "Tag template 2",
     *          //                  ...
     *          //                }
     *          //              ]
     *          //            },
     *          //            {
     *          //              "id": 2,
     *          //              "name": "App template 2"
     *          //              "tag_templates": [
     *          //                {
     *          //                  "id": 3,
     *          //                  "name": "Tag template 3",
     *          //                  ...
     *          //                },
     *          //                {
     *          //                  "id": 4,
     *          //                  "name": "Tag template 4",
     *          //                  ...
     *          //                }
     *          //              ]
     *          //            }
     *          //          ]
     *          //        },
     *          //        {
     *          //          "name": "Google Adwords",
     *          //          "applications": [
     *          //            ...
     *          //          ]
     *          //        }
     *          //      ]
     *          //    },
     *          //    {
     *          //      "name": "Adobe",
     *          //      "platforms": [
     *          //        ...
     *          //      ]
     *          //    }
     *          //  ]
     *      });
     * ```
     *
     * @param {Number} projectId The project ID
     * @param {String} format The format of the response, options being `'flat'` (default), `'grouped'`, `'grouped_app_only'`, `'grouped_vendor_only'`, `'standard'` or `'standard_vendor_only'`
     * @param {Boolean} isInstalledOnly The flag to get only installed App Templates
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getAppTemplates = function(projectId, format, isInstalledOnly) {
        StSDK.validateInt('Project ID', projectId);

        var format = format || StSDK.APP_TEMPLATE_FORMAT_FLAT;
        StSDK.validateOpts('Format', format, [
            StSDK.APP_TEMPLATE_FORMAT_FLAT,
            StSDK.APP_TEMPLATE_FORMAT_GROUPED,
            StSDK.APP_TEMPLATE_FORMAT_GROUPED_APP_ONLY,
            StSDK.APP_TEMPLATE_FORMAT_GROUPED_VENDOR_ONLY,
            StSDK.APP_TEMPLATE_FORMAT_STANDARD,
            StSDK.APP_TEMPLATE_FORMAT_STANDARD_VENDOR_ONLY
        ]);
        var installedParamStr = (isInstalledOnly) ? '?installed_only=1' : '';

        return this.get('projects/' + projectId + '/app-templates' + installedParamStr, null, {
            dataFilter: function(data, type) {

                if (StSDK.APP_TEMPLATE_FORMAT_FLAT === format || 'json' !== type) {
                    return data;
                }

                var grouped = {},
                    groupedAppOnly = {},
                    groupedVendorOnly = {},
                    groupedPlatformOnly = {},
                    standard = [],
                    standardVendorOnly = [],
                    standardPlatformOnly = [],
                    apps = StSDK.jsonDecode(data);

                $.each(apps, function(k, app) {
                    var vendor = app.vendor.toLowerCase(),
                        platform = app.platform.toLowerCase(),
                        appId = app.id,
                        tagsObj = {};

                    if (!(vendor in grouped)) {
                        grouped[vendor] = {};
                        grouped[vendor][platform] = [app];
                    } else if (!(platform in grouped[vendor])) {
                        grouped[vendor][platform] = [app];
                    } else {
                        grouped[vendor][platform].push(app);
                    }

                    if (!(vendor in groupedVendorOnly)) {
                        groupedVendorOnly[vendor] = [app];
                    } else {
                        groupedVendorOnly[vendor].push(app);
                    }

                    if (!(platform in groupedPlatformOnly)) {
                        groupedPlatformOnly[platform] = [app];
                    } else {
                        groupedPlatformOnly[platform].push(app);
                    }

                    if (StSDK.APP_TEMPLATE_FORMAT_GROUPED_APP_ONLY === format) {
                        $.each(app['tag_templates'], function(j, tag) {
                            if (!(tag.id in tagsObj)) {
                                tagsObj[tag.id] = tag;
                            }
                        });

                        delete app['tag_templates'];
                        app['tag_templates'] = tagsObj;

                        if (!(appId in groupedAppOnly)) {
                            groupedAppOnly[appId] = app;
                        }
                    }
                });

                if (StSDK.APP_TEMPLATE_FORMAT_GROUPED === format) {
                    return StSDK.jsonEncode(grouped);
                } else if (StSDK.APP_TEMPLATE_FORMAT_GROUPED_APP_ONLY === format) {
                    return StSDK.jsonEncode(groupedAppOnly);
                } else if (StSDK.APP_TEMPLATE_FORMAT_GROUPED_VENDOR_ONLY === format) {
                    return StSDK.jsonEncode(groupedVendorOnly);
                }

                if (StSDK.APP_TEMPLATE_FORMAT_STANDARD === format) {
                    $.each(grouped, function(vendorName, platforms) {
                        var platformsFormatted = [];
                        $.each(platforms, function(platformName, apps) {
                            platformsFormatted.push({
                                name: platformName,
                                applications: apps
                            });
                        });
                        standard.push({
                            name: vendorName,
                            platforms: platformsFormatted
                        });
                    });

                    return StSDK.jsonEncode(standard);
                }

                $.each(groupedPlatformOnly, function(platformName, apps) {
                    standardPlatformOnly.push({
                        platform: platformName,
                        applications: apps
                    });
                });

                return StSDK.jsonEncode(standardPlatformOnly);
            }
        });
    };
}(window, document, jQuery));
