(function(window, document, $) {
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
     * Gets the full information of a tag
     *
     * @param {Number} tagId The tag ID
     * @param {Number} projectId The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagFullInfo = function(tagId, projectId) {
        StSDK.validateInt('Tag ID', tagId);
        StSDK.validateInt('Project ID', projectId);

        return this.get('tags/' + tagId + '/full', {
            project: projectId
        });
    };

    /**
     * Create Tag Function.
     *
     * @param {Number} projectId The project ID
     * @param {Object} param Object parameter (<strong>function_name</strong> ,  <strong>name</strong>, description, top_code, params)
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.createTagFunction = function(projectId, param) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validatePlainObj('Create Tag Function parameter', param);

        return this.post('projects/' + projectId +'/functions', null, param);
    };

    /**
     * Retrieve list of Tag Functions of a project.
     *
     * @param {Number} projectId The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagFunctionsList = function(projectId) {
        StSDK.validateInt('Project ID', projectId);

        return this.get('projects/' + projectId +'/functions');
    };


    /**
     * Retrieve a Tag Function Container information.
     *
     * @param {Number} fnId Tag Function ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagFunctionInfo = function(fnId) {
        StSDK.validateInt('Function Id ', fnId);

        return this.get('functions/' + fnId +'/info');
    };

    /**
     * Retrieve a Tag Function Call information.
     *
     * @param {Number} fnId Tag Function ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagFunctionCallInfo = function(fnId) {
        StSDK.validateInt('Function Id ', fnId);

        return this.get('function-call/' + fnId +'/info');
    };


    /**
     * Edit a Tag Function.
     *
     * @param {Number} fnId Tag Function Id
     * @param {Object} param Object parameter (<strong>function_name</strong> ,  <strong>name</strong>, description, top_code, params)
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.editTagFunction = function(fnId, param) {
        StSDK.validateInt('Tag Function ID', fnId);
        StSDK.validatePlainObj('Edit Tag Function parameter', param);

        return this.put('functions/' + fnId +'/edit', null, param);
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
     * Create a tag governance
     *
     * @param {Number} projectId The project ID
     * @param {Number} id The tag ID
     * @param {Number} tagOwnerId The tag owner ID
     * @param {Object} data The data of the tag
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.createTagGovernance = function(projectId, id, tagOwnerId, data) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Tag Owner ID', tagOwnerId);
        StSDK.validateInt('Tag ID', id);
        StSDK.validatePlainObj('Tag data', data);

        return this.post('projects/' + projectId + '/tag-governance/' + id + '/' + tagOwnerId, null, data);
    };

    /**
     * Duplicates a tag
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
     * Gets the code of a tag
     *
     * @param {Number} id The tag ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagCode = function(id) {
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

    /**
     * Adds function call for a tag container
     *
     * @param {Number} projectId The project ID
     * @param {Number} id The tag ID
     * @param {Object} functionData Object parameter (<strong>function_id</strong> ,  <strong>params</strong>)
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.addFunctionCall = function(projectId, tagId, functionData) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Tag ID', tagId);

        return this.post('projects/' + projectId + '/function-call/' + tagId, null, functionData);
    };

    /**
     * Gets function call info
     *
     * @param {Number} projectId The project ID
     * @param {Number} id Function call ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.functionCallInfo = function(projectId, tagId) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Tag ID', tagId);

        return this.get('projects/' + projectId + '/function-call/' + tagId + '/info');
    };

    /**
     * Edits function call tag
     *
     * @param {Number} projectId The project ID
     * @param {Number} id The function call tag ID
     * @param {Object} functionData Object parameter (<strong>function_id</strong> ,  <strong>params</strong>)
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.editFunctionCall = function(projectId, tagId, functionData) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Function call tag ID', tagId);

        return this.put('projects/' + projectId + '/function-call/' + tagId + '/edit', null, functionData);
    };

    /**
     * Gets all functions for a project
     *
     * @param {Number} projectId The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getFunctionShortList = function(projectId) {
        StSDK.validateInt('Project ID', projectId);

        return this.get('projects/' + projectId + '/functions?simple=1');
    };

    /**
     * Gets all tags, data-objects and rules will be duplicated on the tag copying
     *
     * @param {Number} tagId The root tag ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getCopyDryData = function(tagId) {
        StSDK.validateInt('Tag ID', tagId);

        return this.get('tags/' + tagId + '/copy-dry');
    };

    /**
     * Copies a tag to another project
     *
     * @param {Number} projectId Copy TO Project ID
     * @param {Number} tagId The tag ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.copyToProject = function(tagId, projectId) {
        StSDK.validateInt('Project ID', projectId);
        StSDK.validateInt('Tag ID', tagId);

        return this.post('tags/' + tagId + '/copy-to-project/' + projectId);
    };

    /**
     * Gets tag audit
     *
     * @param {Number} tagId The tag ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagAudit = function(tagId) {
        StSDK.validateInt('Tag ID', tagId);

        return this.get('tags/' + tagId + '/audits');
    };
}(window, document, jQuery));
