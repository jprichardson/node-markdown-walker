var mkdw = require('../lib/markdown-walker')
  , testutil = require('testutil')
  , path = require('path')
  , fs = require('fs-extra')

var TEST_DIR = '';

describe('markdown-walker', function () {
  beforeEach(function(done) {
    TEST_DIR = testutil.createTestDir('test-markdown-walker')
    var files = [path.join(TEST_DIR, 'hi.md')
      , path.join(TEST_DIR, 'test.markdown')
      , path.join(TEST_DIR, 'test.text')
      , path.join(TEST_DIR, 'somedir', 'test.mkd')
      , path.join(TEST_DIR, 'somedir', 'index.html')
    ];

    fs.mkdirpSync(path.join(TEST_DIR, 'somedir'))

    files.forEach(function(file) {
      fs.writeFileSync(file, '')
    })

    done()
  })

  describe('walk', function() {
    it('should walk the directory and emit markdown events', function(done) {
      var walker = mkdw(TEST_DIR)
        , files = [];

      walker.on('markdown', function(markdown) {
        files.push(markdown);
      })

      walker.on('end', function() {
        T (files.length === 3)
        done()
      })

    })
  })
})