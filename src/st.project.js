(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Gets all projects
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getProjects = function() {
        return this.get('companies/projects');
    };
}(window, document, jQuery));
