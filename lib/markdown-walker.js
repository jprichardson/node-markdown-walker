var Walker = require('walker')
  , path = require('path')

var extensions = ['.md', '.markdown', '.mkd'];

module.exports = function walk(dir, options) {
  options = normalizeOptions(options);

  var walker = Walker(dir);
  
  walker.on('file', function(file, stat) {
    if (stat.mtime.getTime() > options.lastModified) {
      extensions.forEach(function(ext) {
        if (path.extname(file) === ext) {
          walker.emit('markdown', file, stat);
        }
      });
    }
  }); 
  return walker;
}

function normalizeOptions(options) {
  if (!options) options = {};

  var opts = {};
  if (typeof options.lastModified === 'number')
    opts.lastModified = options.lastModified;
  else if (options.lastModified instanceof Date)
    opts.lastModified = options.lastModified.getTime();
  else 
    opts.lastModified = 0;
  
  return opts;
}