(function(window, document, $, undefined) {
    'use strict';

    var StSDK, baseUrlDefault, error, base64, stringify, validateDefined, validateInt, validateStr, validatePlainObj;

    baseUrlDefault = 'https://app.supert.ag/api/';

    error = function(msg) {
        throw 'ERROR: SuperTag: ' + msg;
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

    stringify = function(obj) {
        if (undefined === window.JSON) {
            error('[Polyfill] for JSON must be provided.');
        }

        return window.JSON.stringify(obj);
    };

    validateDefined = function(name, variable) {
        if (undefined === variable) {
            error('[' + name + '] must be provided.');
        }
    };

    validateInt = function(name, int) {
        validateDefined(name, int);
        if (int !== parseInt(int)) {
            return error('[' + name + '] must be an integer.');
        }
    }

    validateStr = function(name, str) {
        validateDefined(name, str);
        if ('string' !== $.type(str)) {
            return error('[' + name + '] must be a string.');
        }
    };

    validatePlainObj = function(name, obj) {
        validateDefined(name, obj);
        if (obj && !$.isPlainObject(obj)) {
            error('[' + name + '] must be a plain object.');
        }
    };

    StSDK = (function() {
        function StSDK(options) {
            validatePlainObj('SDK argument', options);
            validateStr('Token', options.token);
            this.basicAuth = base64('token:' + options.token);
            this.baseUrl = options.baseUrl || baseUrlDefault;
            validateStr('Base URL', this.baseUrl);
        }

        StSDK.prototype.validateDefined = validateDefined;

        StSDK.prototype.validateInt = validateInt;

        StSDK.prototype.validateStr = validateStr;

        StSDK.prototype.validatePlainObj = validatePlainObj;

        StSDK.prototype.get = function(uri, query) {
            return this.ajax(this.getEndpoint(uri, query), 'GET');
        };

        StSDK.prototype.post = function(uri, query, payload) {
            return this.ajax(this.getEndpoint(uri, query), 'POST', payload);
        };

        StSDK.prototype.put = function(uri, query, payload) {
            return this.ajax(this.getEndpoint(uri, query), 'PUT', payload);
        };

        StSDK.prototype.delete = function(uri, query) {
            return this.ajax(this.getEndpoint(uri, query), 'DELETE');
        };

        StSDK.prototype.getEndpoint = function(uri, query) {
            validateStr('URI', uri);
            if (undefined !== query) {
                validatePlainObj('Query parameters', query);
            }

            return this.baseUrl + uri + (undefined === query ? '' : '?' + $.param(query));
        };

        StSDK.prototype.ajax = function(url, method, data) {
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

            if (undefined !== data) {
                validatePlainObj('Data', data);
                opts.data = stringify(data);
            }

            return $.ajax(opts);
        };

        return StSDK;
    })();

    window.StSDK = StSDK;
}(window, document, jQuery));
