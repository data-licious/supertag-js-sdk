(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * @constant {String} APP_TEMPLATE_FORMAT_FLAT
     */
    StSDK.APP_TEMPLATE_FORMAT_FLAT = 'flat';

    /**
     * @constant {String} APP_TEMPLATE_FORMAT_GROUPED
     */
    StSDK.APP_TEMPLATE_FORMAT_GROUPED = 'grouped';

    /**
     * @constant {String} APP_TEMPLATE_FORMAT_STANDARD
     */
    StSDK.APP_TEMPLATE_FORMAT_STANDARD = 'standard';

    /**
     * @constant {string} APP_TEMPLATE_FORMAT_VENDOR_ONLY_GROUPED
     */
    StSDK.APP_TEMPLATE_FORMAT_VENDOR_ONLY_GROUPED = 'vendor_only_grouped';

    /**
     * @constant {string} APP_TEMPLATE_FORMAT_VENDOR_ONLY_STANDARD
     */
    StSDK.APP_TEMPLATE_FORMAT_VENDOR_ONLY_STANDARD = 'vendor_only_standard';

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
     * @param {String} format The format of the response, options being `'flat'` (default), `'grouped'` or `'standard'`
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getAppTemplates = function(format) {
        var format = format || StSDK.APP_TEMPLATE_FORMAT_FLAT;
        StSDK.validateOpts('Format', format, [
            StSDK.APP_TEMPLATE_FORMAT_FLAT,
            StSDK.APP_TEMPLATE_FORMAT_GROUPED,
            StSDK.APP_TEMPLATE_FORMAT_STANDARD,
            StSDK.APP_TEMPLATE_FORMAT_VENDOR_ONLY_GROUPED,
            StSDK.APP_TEMPLATE_FORMAT_VENDOR_ONLY_STANDARD
        ]);

        return this.get('app-templates', null, {
            dataFilter: function(data, type) {
                if (StSDK.APP_TEMPLATE_FORMAT_FLAT === format || 'json' !== type) {
                    return data;
                }

                var grouped = {},
                    standard = [],
                    vendorOnlyGrouped = {},
                    vendorOnlyStandard = [],
                    apps = StSDK.jsonDecode(data);

                $.each(apps, function(k, app) {
                    var vendor = app.vendor.toLowerCase(),
                        platform = app.platform.toLowerCase();

                    if (!(vendor in grouped)) {
                        grouped[vendor] = {};
                        grouped[vendor][platform] = [app];
                    } else if (!(platform in grouped[vendor])) {
                        grouped[vendor][platform] = [app];
                    } else {
                        grouped[vendor][platform].push(app);
                    }

                    if (!(vendor in vendorOnlyGrouped)) {
                        vendorOnlyGrouped[vendor] = [app];
                    } else {
                        vendorOnlyGrouped[vendor].push(app);
                    }
                });

                if (StSDK.APP_TEMPLATE_FORMAT_GROUPED === format) {
                    return StSDK.jsonEncode(grouped);
                } else if (StSDK.APP_TEMPLATE_FORMAT_VENDOR_ONLY_GROUPED === format) {
                    return StSDK.jsonEncode(vendorOnlyGrouped);
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

                $.each(vendorOnlyGrouped, function(vendorName, apps) {
                    vendorOnlyStandard.push({
                        vendor: vendorName,
                        applications: apps
                    });
                });

                return StSDK.jsonEncode(vendorOnlyStandard);
            }
        });
    };
}(window, document, jQuery));
