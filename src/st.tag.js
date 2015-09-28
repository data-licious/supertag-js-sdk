(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Gets the tag tree for the given project
     *
     * @param {Number} id The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagTree = function(id) {
        this.validateInt('Project ID', id);

        return this.get('projects/' + id + '/tags');
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
