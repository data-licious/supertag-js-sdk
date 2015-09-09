(function(window, document, $, undefined) {
    'use strict';

    var StSDK = window.StSDK;

    StSDK.prototype.getAppTemplates = function(options) {
        this.validatePlainObj('Argument', options);
        var id;
        this.validateInt('ID', id = options.id);

        return this.get('app-templates/' + id);
    };

    StSDK.prototype.createAppTemplate = function(options) {
        this.validatePlainObj('Argument', options);
        var content;
        this.validatePlainObj('Content', content = options.content);

        return this.post('app-templates', null, content);
    };

    StSDK.prototype.updateAppTemplate = function(options) {
        this.validatePlainObj('Argument', options);
        var id, content;
        this.validateInt('ID', id = options.id);
        this.validatePlainObj('Content', content = options.content);

        return this.put('app-templates/' + id, null, content);
    };

    StSDK.prototype.deleteAppTemplate = function(options) {
        this.validatePlainObj('Argument', options);
        var id;
        this.validateInt('ID', id = options.id);

        return this.delete('app-templates/' + id);
    };
}(window, document, jQuery));
