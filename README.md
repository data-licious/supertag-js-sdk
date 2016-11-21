[ ![Codeship Status for data-licious/supertag-js-sdk](https://codeship.com/projects/eb6fe080-435b-0133-a126-328cc272eda8/status?branch=master)](https://codeship.com/projects/104034)

SuperTag JavaScript SDK
=========================

The SDK exposes an "object type" named StSDK to the global scope.

Example:

```JavaScript
    var st = new StSDK({
        token: 'your_supertag_api_sdk'
    });
    var tagsReq = st.getTags({
        project: 1234
    }); // tagsReq would be of jQuery jqXHR type which is Promise compatible
    tagsReq
        .done(function(data) {...})
        .fail(function(data) {...});
```

===

#### Installation:

```
    bower install supertag-js-sdk --save
```

===

#### Documentation

Automatically generated documentations is available [here](http://supertag.github.io/supertag-js-sdk-docs/src/st.js.html).

===

For details of how to run the app and tests locally and other development/contributing information, please check out [CONTRIBUTING.md](https://github.com/supertag/supertag-js-sdk/blob/master/CONTRIBUTING.md)
