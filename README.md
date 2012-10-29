Node.js - markdown-walker
================

Simple directory walker that specifically looks for markdown files.


Why?
----

I use Markdown files for blogging, documentation, and pretty much every type of writing that I do now. I'm starting to develop more and more utilities and that incorporate markdown. I wanted a module that encapsulates the finding and possibly the reading of markdown.


Installation
------------

    npm install markdown-walker



Example
------

```javascript
var mdw = require('markdown-walker');

var walker = mdw('/tmp/mydir');
walker.on('markdown', function(file, stat) {
  console.log(file);
});
walker.on('end', function() {
  console.log('Done.');
});
```

License
-------

(MIT License)

Copyright 2012, JP Richardson  <jprichardson@gmail.com>


