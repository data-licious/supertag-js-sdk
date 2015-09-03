(function(window, document, $, undefined) {
    'use strict';

    window.st = window.st || {};

    var RestClient, baseUrlDefault, error, base64, stringify, validateStr, validatePlainObj;

    baseUrlDefault = 'https://app.supert.ag/api/';

    error = function(msg) {
        throw 'ERROR: SuperTag: ' + msg;
    };

    base64 = function(str) {
        // TODO
        return window.btoa(str);
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
            this.token = token;
            validateStr(this.token);
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
            return this.ajax(this.getEndpoint(uri, query), 'DELETE', payload);
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
                    Authorization: 'Basic ' + base64('token:' + this.token)
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
