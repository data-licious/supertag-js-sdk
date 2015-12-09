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
     * @constant {string} PROJECT_TAG_MOVE_POSITION_BEFORE
     */
    StSDK.PROJECT_TAG_MOVE_POSITION_BEFORE = 'before';

    /**
     * @constant {string} PROJECT_TAG_MOVE_POSITION_AFTER
     */
    StSDK.PROJECT_TAG_MOVE_POSITION_AFTER = 'after';

    /**
     * @constant {string} PROJECT_TAG_MOVE_POSITION_OVER
     */
    StSDK.PROJECT_TAG_MOVE_POSITION_OVER = 'over';

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
        StSDK.validateOpts('Format', format, [
            StSDK.PROJECT_TAG_TREE_FORMAT_STANDARD,
            StSDK.PROJECT_TAG_TREE_FORMAT_KENDOUI
        ]);

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

        return this.post('projects/' + projectId +'/tags/template/' + tagTemplateId + '?error_format=new', null, data);
    };

    /**
     * Updates a tag
     *
     * @param {Number} projectId The project ID
     * @param {Number} id The tag ID
     * @param {Object} data The data of the tag
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.updateTag = function(projectId, id, data) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Tag ID', id);
        StSDK.validatePlainObj('Tag data', data);

        return this.put('projects/' + projectId + '/tags/' + id + '?error_format=new', null, data);
    };

    /**
     * Duplicatge a tag
     *
     * @param {Number} projectId The project ID
     * @param {Number} id The tag ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.duplicateTag = function(projectId, tagId, newTagName) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Tag ID', tagId);

        return this.post('projects/' + projectId + '/tags/duplicate/' + tagId, null, {name: newTagName});
    };

    /**
     * Deletes a tag
     *
     * @param {Number} id The tag ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.deleteTag = function(id) {
        StSDK.validateInt('Tag ID', id);

        return this.delete('tags/' + id);
    };

    /**
     * Deletes a tag
     *
     * @param {Number} id The tag ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.codePreview = function(id) {
        StSDK.validateInt('Tag ID', id);

        return this.get('tags/' + id + '/code-preview');
    };

    /**
     * Activates or deactivates a tag
     *
     * @param {Number} id The tag ID
     * @param {String} action The action on the tag, options being `'activate'` and `'deactivate'`
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.toggleTag = function(id, action) {
        StSDK.validateInt('Project ID', id);
        StSDK.validateOpts('Action', action, [
            StSDK.PROJECT_TAG_ACTION_ACTIVATE,
            StSDK.PROJECT_TAG_ACTION_DEACTIVATE
        ]);

        if (StSDK.PROJECT_TAG_ACTION_ACTIVATE === action) {
            return this.put('tags/' + id + '/activate');
        } else {
            return this.put('tags/' + id + '/deactivate');
        }
    };

    /**
     * Moves a tag
     *
     * @param {Number} projectId The project ID
     * @param {Number[]} tagIds An array of the IDs of the tags to move
     * @param {Number} targetTagId The target tag ID
     * @param {String} position The drop position, options being `'before'`, `'after'` and `'over'`
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.moveTag = function(projectId, tagIds, targetTagId, pos) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateArr('Tag IDs', tagIds, true);
        for (var i = 0; i < tagIds.length; i++) {
            StSDK.validateInt('Tag ID', tagIds[i]);
        }
        StSDK.validateInt('Target tag ID', targetTagId);
        StSDK.validateOpts('Position', pos, [
            StSDK.PROJECT_TAG_MOVE_POSITION_BEFORE,
            StSDK.PROJECT_TAG_MOVE_POSITION_AFTER,
            StSDK.PROJECT_TAG_MOVE_POSITION_OVER
        ]);

        return this.put('projects/' + projectId + '/tags/move', null, {
            tagIds: tagIds,
            targetTagId: targetTagId,
            nodePosition: pos
        });
    };
}(window, document, jQuery));
