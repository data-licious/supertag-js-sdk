(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

    StSDK.prototype.APP_TEMPLATE_FORMAT_FLAT = 1;

    StSDK.prototype.APP_TEMPLATE_FORMAT_GROUPED = 2;

    StSDK.prototype.APP_TEMPLATE_FORMAT_STANDARD = 3;

    StSDK.prototype.getAppTemplate = function(options) {
        this.validatePlainObj('Argument', options);
        var id;
        this.validateInt('ID', id = options.id);

        return this.get('app-templates/' + id);
    };

    StSDK.prototype.createAppTemplate = function(options) {
        this.validatePlainObj('Argument', options);
        var content;
        this.validatePlainObj('Content', content = options.content);

        return this.post('app-templates', null, content);
    };

    StSDK.prototype.updateAppTemplate = function(options) {
        this.validatePlainObj('Argument', options);
        var id, content;
        this.validateInt('ID', id = options.id);
        this.validatePlainObj('Content', content = options.content);

        return this.put('app-templates/' + id, null, content);
    };

    StSDK.prototype.deleteAppTemplate = function(options) {
        this.validatePlainObj('Argument', options);
        var id;
        this.validateInt('ID', id = options.id);

        return this.delete('app-templates/' + id);
    };

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
