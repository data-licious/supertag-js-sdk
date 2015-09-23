(function(window, document, $, undefined) {
    'use strict';

    var StSDK, baseUrlDefault, ajaxOpts,
        error, base64, jsonEncode, jsonDecode, validateDefined, validateInt, validateStr, validatePlainObj, validateAjaxOpts;

    baseUrlDefault = 'https://app.supert.ag/api/';

    ajaxOpts = ['dataFilter'];

    error = function(msg) {
        throw 'ERROR: SuperTag JS SDK: ' + msg;
    };

    base64 = function(input) {
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4,
            keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            output = '',
            i = 0;

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }

        return output;
    };

    jsonEncode = function(obj) {
        if (undefined === window.JSON) {
            error('[Polyfill] for JSON must be provided.');
        }

        return window.JSON.stringify(obj);
    };

    jsonDecode = function(str) {
        if (undefined === window.JSON) {
            error('[Polyfill] for JSON must be provided.');
        }

        return window.JSON.parse(str);
    };

    validateDefined = function(name, variable) {
        if (undefined === variable) {
            error('[' + name + '] must be provided.');
        }
    };

    validateInt = function(name, variable) {
        validateDefined(name, variable);
        if (variable !== parseInt(variable)) {
            return error('[' + name + '] must be an integer.');
        }
    };

    validateStr = function(name, variable) {
        validateDefined(name, variable);
        if ('string' !== $.type(variable)) {
            return error('[' + name + '] must be a string.');
        }
    };

    validatePlainObj = function(name, variable) {
        validateDefined(name, variable);
        if (variable && !$.isPlainObject(variable)) {
            error('[' + name + '] must be a plain object.');
        }
    };

    validateAjaxOpts = function(opts) {
        validatePlainObj('Ajax options', opts);
        $.each(opts, function(opt) {
            if (!(opt in ajaxOpts)) {
                error('[' + opt + '] is not a supported Ajax option.');
            }
        });
    };

    StSDK = (function() {
        /**
         * The constructor function for `StSDK`
         *
         * @param {Object} options Argument for the constructor (`token` is mandatory)
         *
         * @constructor
         */
        function StSDK(options) {
            validatePlainObj('SDK argument', options);
            validateStr('Token', options.token);
            this.basicAuth = base64('token:' + options.token);
            this.baseUrl = options.baseUrl || baseUrlDefault;
            validateStr('Base URL', this.baseUrl);
        }

        /**
         * Throws an uncaught error with SuperTag info and given message
         *
         * @param {String} msg The error message
         */
        StSDK.prototype.error = error;

        /**
         * Encodes a JS plain object into a JSON string
         *
         * @param {Object} obj The object to encode
         *
         * @returns {String}
         */
        StSDK.prototype.jsonEncode = jsonEncode;

        /**
         * Decodes a JSON string into a JS object
         *
         * @param {String} str The JSON string to decode
         *
         * @returns {Object}
         */
        StSDK.prototype.jsonDecode = jsonDecode;

        /**
         * Validates a JS variable to be defined
         *
         * @param {String} name The name of the variable
         * @param {*} variable The variable to validate
         */
        StSDK.prototype.validateDefined = validateDefined;

        /**
         * Validates a JS variable to be an integer
         *
         * @param {String} name The name of the variable
         * @param {*} variable The variable to validate
         */
        StSDK.prototype.validateInt = validateInt;

        /**
         * Validates a JS variable to be a string
         *
         * @param {String} name The name of the variable
         * @param {*} variable The variable to validate
         */
        StSDK.prototype.validateStr = validateStr;

        /**
         * Validates a JS variable to be a plain object
         *
         * @param {String} name The name of the variable
         * @param {*} variable The variable to validate
         */
        StSDK.prototype.validatePlainObj = validatePlainObj;

        /**
         * Gets the jqXHR object for a GET AJAX request
         *
         * @param {String} uri The part of endpoint URI following /api/
         * @param {Object} query The query parameters in a plain object
         * @param {Object} ajaxOpts Extra options for setting up $.ajax
         *
         * @returns {jqXHR}
         */
        StSDK.prototype.get = function(uri, query, ajaxOpts) {
            return this.ajax(this.getEndpoint(uri, query), 'GET', null, ajaxOpts);
        };

        /**
         * Gets the jqXHR object for a POST AJAX request
         *
         * @param {String} uri The part of endpoint URI following /api/
         * @param {Object} query The query parameters in a plain object
         * @param {Object} payload The content for the request
         * @param {Object} ajaxOpts Extra options for setting up $.ajax
         *
         * @returns {jqXHR}
         */
        StSDK.prototype.post = function(uri, query, payload, ajaxOpts) {
            return this.ajax(this.getEndpoint(uri, query), 'POST', payload, ajaxOpts);
        };

        /**
         * Gets the jqXHR object for a PUT AJAX request
         *
         * @param {String} uri The part of endpoint URI following /api/
         * @param {Object} query The query parameters in a plain object
         * @param {Object} payload The content for the request
         * @param {Object} ajaxOpts Extra options for setting up $.ajax
         *
         * @returns {jqXHR}
         */
        StSDK.prototype.put = function(uri, query, payload, ajaxOpts) {
            return this.ajax(this.getEndpoint(uri, query), 'PUT', payload, ajaxOpts);
        };

        /**
         * Gets the jqXHR object for a DELETE AJAX request
         *
         * @param {String} uri The part of endpoint URI following /api/
         * @param {Object} query The query parameters in a plain object
         * @param {Object} ajaxOpts Extra options for setting up $.ajax
         *
         * @returns {jqXHR}
         */
        StSDK.prototype.delete = function(uri, query, ajaxOpts) {
            return this.ajax(this.getEndpoint(uri, query), 'DELETE', null, ajaxOpts);
        };

        /**
         * Gets the complete API endpoint URL based on URI and query parameters provided
         *
         * @param {String} uri The part of endpoint URI following /api/
         * @param {Object} query The query parameters in a plain object
         *
         * @returns {string}
         */
        StSDK.prototype.getEndpoint = function(uri, query) {
            validateStr('URI', uri);
            if (query) {
                validatePlainObj('Query parameters', query);
            }

            return this.baseUrl + uri + (!query ? '' : '?' + $.param(query));
        };

        /**
         * Gets the jqXHR object for an AJAX request
         *
         * @param {String} url The API endpoint URL
         * @param {String} method The request method
         * @param {Object} data The data for the request
         * @param {Object} ajaxOpts Extra options for setting up $.ajax
         *
         * @returns {jqXHR}
         */
        StSDK.prototype.ajax = function(url, method, data, ajaxOpts) {
            var url = url || this.baseUrl,
                method = method || 'GET',
                headers = {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + this.basicAuth
                },
                opts = {
                    url: url,
                    method: method,
                    headers: headers,
                    dataType: 'json'
                };

            if (undefined !== data && null !== data) {
                validatePlainObj('Data', data);
                opts.data = jsonEncode(data);
            }

            if (undefined !== ajaxOpts) {
                validateAjaxOpts(ajaxOpts);
                $.extend(opts, ajaxOpts);
            }

            return $.ajax(opts);
        };

        return StSDK;
    })();

    window.StSDK = StSDK;
}(window, document, jQuery));
