(function(window, document, $, undefined) {
    'use strict';

    window.st = window.st || {};

    var RestClient, baseUrlDefault, error, base64, stringify, validateStr, validatePlainObj;

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
            error('[polyfill] for JSON must be provided.');
        }

        return window.JSON.stringify(obj);
    };

    validateStr = function(name, str) {
        if ('string' !== $.type(str)) {
            return error('[' + name + '] must be a string.');
        }
    };

    validatePlainObj = function(name, obj) {
        if (!$.isPlainObject(obj)) {
            error('[' + name + '] must be a plain object.');
        }
    };

    RestClient = (function() {
        function RestClient(baseUrl, token) {
            this.baseUrl = baseUrl || baseUrlDefault;
            validateStr('Base URL', this.baseUrl);
            if (undefined === token) {
                error('[Token] must be provided.');
            }
            validateStr(token);
            this.basicAuth = base64('token:' + token);
        }

        RestClient.prototype.get = function(uri, query) {
            return this.ajax(this.getEndpoint(uri, query), 'GET');
        };

        RestClient.prototype.post = function(uri, query, payload) {
            return this.ajax(this.getEndpoint(uri, query), 'POST', payload);
        };

        RestClient.prototype.put = function(uri, query, payload) {
            return this.ajax(this.getEndpoint(uri, query), 'PUT', payload);
        };

        RestClient.prototype.delete = function(uri, query) {
            return this.ajax(this.getEndpoint(uri, query), 'DELETE');
        };

        RestClient.prototype.getEndpoint = function(uri, query) {
            validateStr('URI', uri);
            validatePlainObj('Query parameters', query);

            return this.baseUrl + uri + '?' + $.param(query);
        };

        RestClient.prototype.ajax = function(url, method, data) {
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
    })();

    st.RestClient = RestClient;
}(window, document, jQuery));
