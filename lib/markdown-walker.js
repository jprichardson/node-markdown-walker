var Walker = require('walker')
  , path = require('path')

var extensions = ['.md', '.markdown', '.mkd'];

module.exports = function walk(dir) {
  var walker = Walker(dir);
  walker.on('file', function(file, stat) {
    extensions.forEach(function(ext) {
      if (path.extname(file) === ext) {
        walker.emit('markdown', file, stat);
      }
    });
  }); 
  return walker;
}