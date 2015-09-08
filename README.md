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
        .done(function() {...})
        .fail(function() {...});
```
