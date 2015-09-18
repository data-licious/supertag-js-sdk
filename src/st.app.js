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
     * @param {Object} options `id` is mandatory
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getAppTemplate = function(options) {
        this.validatePlainObj('Argument', options);
        var id;
        this.validateInt('ID', id = options.id);

        return this.get('app-templates/' + id);
    };

    /**
     * Creates an app template
     *
     * @param {Object} options `content` is mandatory
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.createAppTemplate = function(options) {
        this.validatePlainObj('Argument', options);
        var content;
        this.validatePlainObj('Content', content = options.content);

        return this.post('app-templates', null, content);
    };

    /**
     * Updates an app template
     *
     * @param {Object} options `id` and `content` are mandatory
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.updateAppTemplate = function(options) {
        this.validatePlainObj('Argument', options);
        var id, content;
        this.validateInt('ID', id = options.id);
        this.validatePlainObj('Content', content = options.content);

        return this.put('app-templates/' + id, null, content);
    };

    /**
     * Deletes an app template
     *
     * @param {Object} options `id` is mandatory
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteAppTemplate = function(options) {
        this.validatePlainObj('Argument', options);
        var id;
        this.validateInt('ID', id = options.id);

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
     * @param {Object} options `format` is mandatory and value should be 1 (default), 2 or 3
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getAppTemplates = function(options) {
        this.validatePlainObj('Argument', options);
        var format = options.format || this.APP_TEMPLATE_FORMAT_FLAT;
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
