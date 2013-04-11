Node.js - markdown-walker
================

[![Build Status](https://secure.travis-ci.org/jprichardson/node-markdown-walker.png)](http://travis-ci.org/jprichardson/node-markdown-walker)

Simple directory walker that specifically looks for markdown files.


Why?
----

I use Markdown files for blogging, documentation, and pretty much every type of writing that I do. I'm starting to develop more and more utilities and that incorporate markdown so I wanted a module that encapsulates the finding of markdown.


Installation
------------

    npm install --save markdown-walker



Usage
-----

The code is very simple. But it's essentially a modification of https://github.com/daaku/nodejs-walker except that it emits
`markdown` events when it discovers files that have any of the following extensions: `.md`, `.markdown`, `.mkd`.


### Quick Example

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


### API

#### constructor(dir, [options])

- **dir**: The directory to walk or search.
- **options**: Optional argument that only has one field: `lastModified`. `lastModified` can either be a `Date` object or a `number` that represents the number of milliseconds since the UNIX epoch, e.g: `(new Date).getTime()`. 


**Example:**

```js
var mdw = require('markdown-walker')
var walker = mdw('/tmp', {lastModified: new Date('2013-04-01')})
```

#### events

- **markdown**: Emitted when a markdown file is found.
- **notModified**: Only emmitted when `lastModified` is set and it doesn't meet the condition.
- **modified**: Only emmitted when `lastModified` is set and it does meet the condition.





License
-------

(MIT License)

Copyright 2012-2013 JP Richardson  <jprichardson@gmail.com>


