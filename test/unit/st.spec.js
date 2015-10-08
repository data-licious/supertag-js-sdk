'use strict';

describe('st', function() {

    var _stSDK = new StSDK({
        'token': 'my_testing_supertag_api_token'
    });

    describe('StSDK', function() {
        it('should have a correct default API base URL', function() {
            expect(_stSDK.baseUrl).toBe('https://app.supert.ag/api/');
        });
    });

    describe('StSDK.buildUrlParams', function() {
        it('should return empty string if empty params', function() {
            expect(_stSDK.buildUrlParams({})).toBe('');
        });
        it('should return valid string for single parameter', function() {
            expect(_stSDK.buildUrlParams({one: 1})).toBe('?one=1');
        });
        it('should return valid string for two parameter', function() {
            expect(_stSDK.buildUrlParams({one: 1, two: 'two'})).toBe('?one=1&two=two');
        });
        it('should not include param if value is false', function() {
            expect(_stSDK.buildUrlParams({one: 1, two: null})).toBe('?one=1');
        });
        it('should not include param if value is undefined', function() {
            expect(_stSDK.buildUrlParams({one: 1, two: undefined})).toBe('?one=1');
        });
        it('should not include param if value is an empty string', function() {
            expect(_stSDK.buildUrlParams({one: 1, two: ""})).toBe('?one=1');
        });
    });

    describe('StSDK.getDataObjectTypeLabel', function() {
        it('should return "Affinity" for affinity data objects', function() {
            expect(_stSDK.getDataObjectTypeLabel({"type": "affinity_group_variable" })).toBe("Affinity");
        });
        it('should return "Vendor" for generic data objects', function() {
            expect(_stSDK.getDataObjectTypeLabel({"type": "variable_template_variable", "vendor": "Datalicious"})).toBe("Datalicious");
        });
    });
});
