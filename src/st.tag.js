(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Gets the tag tree for the given project
     *
     * @param {Object} options The project ID
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagTree = function(id) {
        this.validateInt('Project ID', id);

        return this.get('projects/' + id + '/tags');
    };
}(window, document, jQuery));
