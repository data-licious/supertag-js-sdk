(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

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

    StSDK.prototype.getAppTemplates = function() {
        return this.get('app-templates', null, {
            'dataFilter': function(data, type) {
                if ('json' !== type) {
                    return;
                }

                data = this.jsonDecode(data);
                if (!('app_templates' in data || !data[app_templates])) {
                    return;
                }

                var vendors = {},
                    res = [],
                    apps = data['app_templates'];

                $.each(apps, function(k, app) {
                    var vendor = app.vendor,
                        platform = app.platform;

                    if (!(vendor in vendors)) {
                        vendors[vendor] = {};
                        vendors[vendor][platform] = [app];
                    } else if (!(platform in vendors[vendor])) {
                        vendors[vendor][platform] = [app];
                    } else {
                        vendors[vendor][platform].push(app);
                    }
                });

                $.each(vendors, function(vendorName, platforms) {
                    var platformsFormatted = [];
                    $.each(platforms, function(platformName, apps) {
                        platformsFormatted.push({
                            name: platformName,
                            applications: apps
                        });
                    });
                    res.push({
                        name: vendorName,
                        platforms: platformsFormatted
                    });
                });

                return this.jsonEncode(res);
            }
        });
    };
}(window, document, jQuery));
