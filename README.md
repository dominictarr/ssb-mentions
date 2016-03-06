# ssb-mentions

extract the mentions in a ssb message, just using the markdown.
this is _mostly compatible_ with the way patchwork does it.
but simpler, because it relies only on the markdown.

``` js
var mentions = require('ssb-mentions')

var ary = mentions(markdown)

```

## License

MIT
