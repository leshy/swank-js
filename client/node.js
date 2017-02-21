var SwankJS = require('./swank-js'),
    SWANKJS_HOST = process.env.SWANKJS_HOST || "localhost",
    SWANKJS_PORT = process.env.SWANKJS_PORT || 8009;

SwankJS.setupNodeJSClient = function(opts) {
  var serverURL = 'http://' + (opts.host || SWANKJS_HOST) + ':' + (opts.port || SWANKJS_PORT);
  
  if (opts.name) { global.navigator = {userAgent: "nodejs/" + opts.name}; }

  this.setup(serverURL, opts.name);
}

// making these objects available through eval for development purposes
global.module = module;
global.require = require;

// if required by another module just export and leave start to the module
if (module.parent) {
  module.exports = SwankJS;
} else {
  // otherwise make the connection now
  SwankJS.setupNodeJSClient();
}
