var Walker = require('walker')
  , path = require('path')

var extensions = ['.md', '.markdown', '.mkd'];

module.exports = function walk(dir, options) {
  options = normalizeOptions(options);

  var walker = Walker(dir);
  
  walker.on('file', function(file, stat) {
    var ext = path.extname(file)
    if (extensions.indexOf(ext) < 0) 
      return

    walker.emit('markdown', file, stat)

    if (options.lastModified > 0) {
      stat.mtime.getTime() > options.lastModified
        ? walker.emit('modified', file, stat)
        : walker.emit('notModified', file, stat);
    }
  })

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