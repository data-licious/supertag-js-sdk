(function(window, document, $) {
    'use strict';

    var StSDK = window.StSDK;

    /**
     * Gets the information of a tag template
     *
     * @param {*} tagTemplateIdOrHandle The tag template ID or handle
     *
     * @returns {jqXHR}
     */
    StSDK.prototype.getTagTemplate = function(tagTemplateIdOrHandle) {
        return this.get('tag-templates/' + tagTemplateIdOrHandle);
    };
}(window, document, jQuery));
