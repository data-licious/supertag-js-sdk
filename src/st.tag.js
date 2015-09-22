(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Gets the tag tree for the given project
     *
     * @param {Object} options `id` is mandatory
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagTree = function(options) {
        this.validatePlainObj('Argument', options);
        var id;
        this.validateInt('ID', id = options.id);

        return this.get('projects/' + id + '/tags');
    };
}(window, document, jQuery));
