var mkdw = require('../lib/markdown-walker')
  , testutil = require('testutil')
  , path = require('path')
  , fs = require('fs-extra')

var TEST_DIR = '';

describe('markdown-walker', function () {
  var date = null;

  beforeEach(function(done) {
    if (TEST_DIR)
      fs.removeSync(TEST_DIR)

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

    date = new Date().getTime();
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

    describe('> when lastModified', function() {
      it('should walk the directory and emit markdown events if the last modified time is greater than or equal', function(done) {
        
        setTimeout(function(){
          fs.writeFileSync(path.join(TEST_DIR, 'mod.md'), '')

          var walker = mkdw(TEST_DIR, {lastModified: date})
            , files = [];

          walker.on('markdown', function(markdown) {
            files.push(markdown);
          })

          walker.on('end', function() {
            T (files.length === 1)
            T (path.basename(files[0]) === 'mod.md')
            done()
          })
        },1000); //have to at least use 1 sec because file stat times are in chopped to secs.
        
      })
    })
  })

  
})