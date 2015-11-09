(function(window) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * @constant {String} PROJECT_APP_FORMAT_FLAT
     */
    StSDK.PROJECT_APP_FORMAT_FLAT = 'flat';

    /**
     * @constant {String} PROJECT_APP_FORMAT_GROUPED_WITH_PLATFORM
     */
    StSDK.PROJECT_APP_FORMAT_GROUPED_WITH_PLATFORM = 'grouped_with_platform';

    /**
     * @constant {String} PROJECT_APP_FORMAT_STANDARD_WITH_PLATFORM
     */
    StSDK.PROJECT_APP_FORMAT_STANDARD_WITH_PLATFORM = 'standard_with_platform';

    /**
     * Gets companies and projects relevant to the specific user
     *
     * @param {Number} limit The limit of search
     * @param {String} filter The filter of the search
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCompaniesAndProjects = function(limit, filter) {
        var params = this.buildUrlParams({
            limit: limit,
            filter: filter
        });

        return this.get('companies/projects' + params);
    };

    /**
     * Gets the details of a given project
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProject = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id);
    };


    /**
     * Gets the deployment history for a given project
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectDeployHistory = function(id) {
        StSDK.validateInt('Project ID', id);
        return this.get('projects/' + id + '/deployments');
    };


    /**
     * Gets the release notes for a given project
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectReleaseNotes = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id + '/release-notes');
    };

    /**
     * Gets project sites
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectSites = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id + '/sites');
    };

    /**
     * Gets the applications installed in a given project
     *
     * @param {Number} id The project ID
     * @param {String} format The format of the response, options are `'flat'`, `'grouped_with_platform'` or `'standard_with_platform'`
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectApplications = function(id, format) {
        var format = format || StSDK.PROJECT_APP_FORMAT_FLAT;
        StSDK.validateInt('Project ID', id);
        StSDK.validateOpts('Format', format, [
            StSDK.PROJECT_APP_FORMAT_FLAT,
            StSDK.PROJECT_APP_FORMAT_GROUPED_WITH_PLATFORM,
            StSDK.PROJECT_APP_FORMAT_STANDARD_WITH_PLATFORM
        ]);

        return this.get('projects/' + id + '/apps', null, {
            dataFilter: function(data, type) {
                if (StSDK.PROJECT_APP_FORMAT_FLAT === format || 'json' !== type) {
                    return data;
                }

                var grouped = {},
                    standard = [],
                    apps = StSDK.jsonDecode(data);

                $.each(apps, function(k, app) {
                    var tagTmpls = {},
                        vendor = app.vendor.toLowerCase(),
                        platform = '[' + vendor +  ']' + app.platform.toLowerCase(),
                        tags = app.tags;

                    $.each(tags, function(j, tag) {
                        var tagTmplId = tag.templateId;

                        if (!(tagTmplId in tagTmpls)) {
                            tagTmpls[tagTmplId] = [tag];
                        } else {
                            tagTmpls[tagTmplId].push(tag);
                        }
                    });

                    app['tag_templates'] = tagTmpls;
                    delete app.tags;

                    if (!(platform in grouped)) {
                        grouped[platform] = [app];
                    } else {
                        grouped[platform].push(app);
                    }
                });

                if (StSDK.PROJECT_APP_FORMAT_GROUPED_WITH_PLATFORM === format) {
                    return StSDK.jsonEncode(grouped);
                }

                $.each(grouped, function(platformName, apps) {
                    standard.push({
                        platform: platformName,
                        applications: apps
                    });
                });

                return StSDK.jsonEncode(standard);
            }
        });
    };
}(window));
