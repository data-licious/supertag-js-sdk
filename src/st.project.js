(function(window) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * @constant {String} PROJECT_ROLE_ADMINISTRATOR
     */
    StSDK.PROJECT_ROLE_ADMINISTRATOR = 'administrator';

    /**
     * @constant {String} PROJECT_ROLE_EDITOR
     */
    StSDK.PROJECT_ROLE_EDITOR = 'editor';

    /**
     * @constant {String} PROJECT_ROLE_VIEWER
     */
    StSDK.PROJECT_ROLE_VIEWER = 'viewer';

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
     * @constant {string} PROJECT_VERSION_UNDEPLOYED
     */
    StSDK.PROJECT_VERSION_UNDEPLOYED = 'undeployed';

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
     * Gets companies and projects with details relevant to the specific user
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCompaniesData = function() {

        return this.get('companies/home-list');
    };

    /**
     * Gets projects with details by company for Home Page
     *
     * @param {Number} id The company ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectsDataByCompany = function(companyId) {
        StSDK.validateInt('Company ID', companyId);

        return this.get('companies/' + companyId + '/projects');
    };

    /**
     * Gets the details of a given project
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProject = function(id, ajaxOpts) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id, {}, ajaxOpts);
    };

    /**
     * Updates an project
     *
     * @param {Number} projectId  The project ID
     * @param {Object} data The project data
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.updateProject = function(projectId, data) {

        return this.put('projects/' + projectId, null, {
            'async': data.async,
            'compressor': data.compressor,
            'tag_governance': data.tag_governance,
            'minify_js': data.minify_js,
            'name': data.name,
            'description': data.description,
            'deployment_type': data.deployment_type,
            'hosted_subdomain': data.hosted_subdomain,
            'download_path': data.download_path,
            'include_turbobytes_code': data.include_turbobytes_code,
            'obfuscate_js': data.obfuscate_js,
            'live_testing_refresh_interval': data.liveTestingRefreshInterval,
            'testAndroidUuids': data.testAndroidUuids,
            'testAdvertiserIds': data.testAdvertiserIds,
            'use_opt_out': data.use_opt_out,
            'is_realtime_enabled': data.is_realtime_enabled,
            'is_monitoring_enabled': data.is_monitoring_enabled
        });
    };

    /**
     * Gets the audit of a given project
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectAudit = function(id, version) {
        StSDK.validateInt('Project ID', id);

        var url = 'projects/' + id + '/audits';

        if (undefined !== version) {
            if (version !== parseInt(version) && version !== StSDK.PROJECT_VERSION_UNDEPLOYED) {
                StSDK.error('[Version] must be an integer or "' + StSDK.PROJECT_VERSION_UNDEPLOYED + '".');
            }

            return this.get(url, {
                project_version: version
            });
        }

        return this.get(url);
    };

    /**
     * Gets the code of a given project
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCode = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id + '/code-preview');
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
     * @param {String} withDefault Flag with default
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectSites = function(id, withDefault) {
        StSDK.validateInt('Project ID', id);
        var paramWithDefault = '';
        if (withDefault) {
            paramWithDefault = '?with_default=1';

        }

        return this.get('projects/' + id + '/sites' + paramWithDefault);
    };

    /**
     * Create project site
     *
     * @param {Number} id The project ID
     * @param {Object} data The site data
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.createProjectSite = function(id, data) {
        StSDK.validateInt('Project ID', id);
        var createData = {
            'url': data.url,
            'name': data.name,
            'testing_url': data.testing_url
        };

        return this.post('projects/' + id + '/site', null, createData);
    };

    /**
     * Delete project site
     *
     * @param {Number} projectId The project ID
     * @param {Number} siteId The site ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteProjectSite = function(projectId, siteId) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Site ID', siteId);

        return this.delete('projects/' + projectId + '/sites/' + siteId);
    };

    /**
     * Update project site
     *
     * @param {Number} projectId The project ID
     * @param {Number} siteId The site ID
     * @param {Object} data The site data
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.updateProjectSite = function(projectId, siteId, data) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Site ID', siteId);
        var updateData = {
            'url': data.url,
            'name': data.name,
            'testing_url': data.testing_url
        };

        return this.put('projects/' + projectId + '/sites/' + siteId, null, updateData);
    };


    /**
     * Runs project deploy preview
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.runProjectDeployPreview = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.post('projects/' + id + '/deploy-preview');
    };

    /**
     * Get project's overview details
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectOverview = function(id) {
        StSDK.validateInt('Project ID', id);

        return this.get('projects/' + id + '/overview', null, {
            dataFilter: function(data, type) {
                var overviewDetails = StSDK.jsonDecode(data);

                return StSDK.jsonEncode(overviewDetails);
            }
        });
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

    /**
     * Installs an application onto a given project
     *
     * @param {String} appName The application name
     * @param {Number} projectId The project ID
     * @param {Number} appTmplId The application template name
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.installApplication = function(appName, projectId, appTmplId) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Application template ID', appTmplId);

        return this.post('projects/' + projectId + '/app-templates/' + appTmplId + '/install', null, {
            app_name: appName
        });
    };

    /**
     * Delete application with tags
     *
     * @param {Number} projectId The project ID
     * @param {Number} appId The application ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteApplication = function(projectId, appId) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Application ID', appId);

        return this.delete('projects/' + projectId + '/apps/' + appId);
    };

    /**
     * Retrieve project Install Code.
     *
     * @param {Number} projectId The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectInstallCode = function(projectId) {
        StSDK.validateInt('Project ID', projectId);

        return this.get('projects/' + projectId + '/code-install');
    };

    /**
     * Get project Access Rights
     *
     * @param {Number} projectId The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectAccessRights = function(projectId) {
        StSDK.validateInt('Project ID', projectId);

        return this.get('projects/' + projectId + '/access-rights');
    };

    /**
     * Revoke project Access Rights
     *
     * @param {Number} projectId The project ID
     * @param {Number} userId The User ID
     * @param {string} role [editor|viewer|administrator]
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.revokeProjectAccess = function(projectId, userId, role) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('User ID', userId);
        StSDK.validateOpts('Format', role, [
            StSDK.PROJECT_ROLE_ADMINISTRATOR,
            StSDK.PROJECT_ROLE_EDITOR,
            StSDK.PROJECT_ROLE_VIEWER
        ]);

        return this.delete('projects/' + projectId + '/revoke-access/' + userId + '/' + role);
    };

    /**
     * Grant project Access Rights
     *
     * @param {Number} projectId The project ID
     * @param {string} email The User email
     * @param {string} role [editor|viewer|administrator]
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.grantProjectAccess = function(projectId, email, role, boolInvite) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateOpts('Format', role, [
            StSDK.PROJECT_ROLE_ADMINISTRATOR,
            StSDK.PROJECT_ROLE_EDITOR,
            StSDK.PROJECT_ROLE_VIEWER
        ]);
        var data = {};
        if (boolInvite) {
            data = {
                'invite': 1
            };
        }

        return this.post('projects/' + projectId + '/grant-access/' + email + '/' + role, null, data);
    };

    /**
     * Installs a tag into a project
     *
     * @param {Number} projectId The project ID
     * @param {Number} tagTemplateId The tag template ID
     * @param {Object} data The data of the tag
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.installTag = function(projectId, tagTemplateId, data) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Tag template ID', tagTemplateId);
        StSDK.validatePlainObj('Tag data', data);

        return this.post('projects/' + projectId +'/tags/template/' + tagTemplateId, {
            error_format: 'new'
        }, data);
    };

    /**
     * Create project
     *
     * @param {Number} companyId The company ID
     * @param {Object} data The site data
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.createProject = function(companyId, data) {
        StSDK.validateInt('Company ID', companyId);
        var createData = {
            'name': data.name,
            'type': data.type,
            'async': data.async
        };

        return this.post('companies/' + companyId + '/project', null, createData);
    };

    /**
     * Delete the project
     *
     * @param {Number} projectId The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteProject = function(projectId) {
        StSDK.validateInt('Project ID', projectId);

        return this.delete('projects/' + projectId);
    };

    /**
     * Get project Codes versions for code compare
     *
     * @param {Number} projectId The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectCodeForCodeCompare = function(projectId, baseVersion, matchVersion) {
        StSDK.validateInt('Project ID', projectId);

        return this.get('projects/' + projectId + '/code-compare/' + baseVersion + '/' + matchVersion);
    };

    /**
     * Get File size of Project Code
     *
     * @param {Number} projectId The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjectCodeFileSize = function(projectId) {
        StSDK.validateInt('Project ID', projectId);

        return this.get('projects/' + projectId + '/code-size');
    };

    /**
     * Create a new live testing session
     *
     * @param {Number} projectId
     * @param {String} deviceId
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.createLiveTestingSession = function(projectId, deviceId) {
        StSDK.validateInt('Project ID', projectId);

        return this.post('projects/' + projectId + '/live-testing-sessions/' + deviceId);
    };

    /**
     * Delete a live testing session
     *
     * @param {Number} projectId
     * @param {String} deviceId
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteLiveTestingSession = function(projectId, deviceId) {
        StSDK.validateInt('Project ID', projectId);

        return this.delete('projects/' + projectId + '/live-testing-sessions/' + deviceId);
    }
}(window));
