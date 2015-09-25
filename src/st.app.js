(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * @constant {String} APP_TEMPLATE_FORMAT_FLAT
     */
    StSDK.prototype.APP_TEMPLATE_FORMAT_FLAT = 'flat';

    /**
     * @constant {String} APP_TEMPLATE_FORMAT_GROUPED
     */
    StSDK.prototype.APP_TEMPLATE_FORMAT_GROUPED = 'grouped';

    /**
     * @constant {String} APP_TEMPLATE_FORMAT_STANDARD
     */
    StSDK.prototype.APP_TEMPLATE_FORMAT_STANDARD = 'standard';

    /**
     * Gets details of a given app template
     *
     * @param {Number} id The app template ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getAppTemplate = function(id) {
        this.validateInt('App template ID', id);

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
        this.validatePlainObj('App template data', data);

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
        this.validatePlainObj('Argument', options);
        var id, content;
        this.validateInt('ID', id = options.id);
        this.validatePlainObj('Content', content = options.content);

        return this.put('app-templates/' + id, null, content);
    };

    /**
     * Deletes an app template
     *
     * @param {Number} id The app template ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteAppTemplate = function(id) {
        this.validateInt('ID', id);

        return this.delete('app-templates/' + id);
    };

    /**
     * Gets details of all/some app templates
     * Examples:
     * ```javascript
     *      $.when(_stSDK.getAppTemplates({format: 1})).then(function(json) {
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
     *      $.when(_stSDK.getAppTemplates({format: 2})).then(function(json) {
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
     *      $.when(_stSDK.getAppTemplates({format: 3})).then(function(json) {
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
        var format = format || this.APP_TEMPLATE_FORMAT_FLAT;
        if (!(format in [this.APP_TEMPLATE_FORMAT_FLAT, this.APP_TEMPLATE_FORMAT_GROUPED, this.APP_TEMPLATE_FORMAT_STANDARD])) {
            this.error('[Format] is not valid.');
        }

        return this.get('app-templates', null, {
            'dataFilter': function(data, type) {
                if (this.APP_TEMPLATE_FORMAT_FLAT === format || 'json' !== type) {
                    return data;
                }

                data = this.jsonDecode(data);
                if (!('app_templates' in data || !data[app_templates])) {
                    return data;
                }

                var grouped = {},
                    standard = [],
                    apps = data['app_templates'];

                $.each(apps, function(k, app) {
                    var vendor = app.vendor,
                        platform = app.platform;

                    if (!(vendor in grouped)) {
                        grouped[vendor] = {};
                        grouped[vendor][platform] = [app];
                    } else if (!(platform in grouped[vendor])) {
                        grouped[vendor][platform] = [app];
                    } else {
                        grouped[vendor][platform].push(app);
                    }
                });

                if (this.APP_TEMPLATE_FORMAT_GROUPED === format) {
                    return this.jsonEncode(grouped);
                }

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

                return this.jsonEncode(standard);
            }
        });
    };
}(window, document, jQuery));
