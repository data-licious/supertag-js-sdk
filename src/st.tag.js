(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * @constant {String} PROJECT_TAG_TREE_FORMAT_STANDARD
     */
    StSDK.PROJECT_TAG_TREE_FORMAT_STANDARD = 'standard';

    /**
     * @constant {String} PROJECT_TAG_TREE_FORMAT_KENDOUI
     */
    StSDK.PROJECT_TAG_TREE_FORMAT_KENDOUI = 'kendoui';

    /**
     * @constant {String} PROJECT_TAG_ACTION_ACTIVATE
     */
    StSDK.PROJECT_TAG_ACTION_ACTIVATE = 'activate';

    /**
     * @constant {String} PROJECT_TAG_ACTION_DEACTIVATE
     */
    StSDK.PROJECT_TAG_ACTION_DEACTIVATE = 'deactivate';

    /**
     * Gets the tag tree for a given project
     *
     * @param {Number} id The project ID
     * @param {String} format Should be either `'standard'` (default) or `'kendoui'`
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagTree = function(id, format) {
        StSDK.validateInt('Project ID', id);

        var format = format || StSDK.PROJECT_TAG_TREE_FORMAT_STANDARD;
        if (!~$.inArray(format, [StSDK.PROJECT_TAG_TREE_FORMAT_STANDARD, StSDK.PROJECT_TAG_TREE_FORMAT_KENDOUI])) {
            StSDK.error('[Format] is not valid.');
        }

        return this.get('projects/' + id + '/tags', null, {
            dataFilter: function(data, type) {
                if (StSDK.APP_TEMPLATE_FORMAT_STANDARD === format || 'json' !== type) {
                    return data;
                }

                data = StSDK.jsonDecode(data);
                if (!('tag_tree' in data) || !data['tag_tree']) {
                    return StSDK.jsonEncode(data);
                }

                var kendouiFormatted = data['tag_tree'];
                transform(kendouiFormatted);

                return StSDK.jsonEncode(kendouiFormatted);
            }
        });

        function transform(tags) {
            $.map(tags, function(tag) {
                tag.text = tag.name;

                if ('children' in tag) {
                    tag.items = tag.children;
                    delete tag.children;
                    transform(tag.items);
                }

                return tag;
            });
        }
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

        return this.post('projects/' + projectId +'/tags/template/' + tagTemplateId, null, data);
    };

    /**
     * Activate or deactivate a tag
     *
     * @param {Number} id The tag ID
     * @param {String} action The action on the tag, options being `'activate'` and `'deactivate'`
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.toggleTag = function(id, action) {
        StSDK.validateInt('Project ID', id);
        if (!~$.inArray(action, [StSDK.PROJECT_TAG_ACTION_ACTIVATE, StSDK.PROJECT_TAG_ACTION_DEACTIVATE])) {
            StSDK.error('[Action] is not valid.');
        }

        if (StSDK.PROJECT_TAG_ACTION_ACTIVATE === action) {
            return this.put('tags/' + id + '/activate');
        } else {
            return this.put('tags/' + id + '/deactivate');
        }
    };
}(window, document, jQuery));
