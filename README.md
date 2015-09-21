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

For docs, details of how to run the app and tests locally and other development/contributing information, please check out [CONTRIBUTING.md](https://github.com/supertag/supertag-js-sdk/blob/master/CONTRIBUTING.md)
