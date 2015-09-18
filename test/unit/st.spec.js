'use strict';

describe('st', function() {
    describe('StSDK', function() {
        var _stSDK = new StSDK({
            'token': 'my_testing_supertag_api_token'
        });

        it('should have a correct default API base URL', function() {
            expect(_stSDK.baseUrl).toBe('https://app.supert.ag/api/');
        });
    });
});
