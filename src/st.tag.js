(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * @constant {String} PROJECT_TAG_TREE_FORMAT_STANDARD
     */
    StSDK.prototype.PROJECT_TAG_TREE_FORMAT_STANDARD = 'standard';

    /**
     * @constant {String} PROJECT_TAG_TREE_FORMAT_KENDOUI
     */
    StSDK.prototype.PROJECT_TAG_TREE_FORMAT_KENDOUI = 'kendoui';

    /**
     * Gets the tag tree for a given project
     *
     * @param {Number} id The project ID
     * @param {String} format Should be either `'standard'` (default) or `'kendoui'`
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagTree = function(id, format) {
        this.validateInt('Project ID', id);

        var format = format || this.PROJECT_TAG_TREE_FORMAT_STANDARD;
        if (!~$.inArray(format, [this.PROJECT_TAG_TREE_FORMAT_STANDARD, this.PROJECT_TAG_TREE_FORMAT_KENDOUI])) {
            this.error('[Format] is not valid.');
        }

        return this.get('projects/' + id + '/tags', null, {
            dataFilter: function(data, type) {
                if (this.APP_TEMPLATE_FORMAT_STANDARD === format || 'json' !== type) {
                    return data;
                }

                data = this.jsonDecode(data);
                if (!('tag_tree' in data) || !data['tag_tree']) {
                    return data;
                }

                var kendouiFormated = [],
                    tagTree = data['tag_tree'];

                $.each();
            }
        });

        function transform(tags) {
            $.map(tags, function() {

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
        this.validateInt('Project ID', projectId);
        this.validateInt('Tag template ID', tagTemplateId);
        this.validatePlainObj('Tag data', data);

        return this.post('projects/' + projectId +'/tags/template/' + tagTemplateId, null, data);
    };
}(window, document, jQuery));
