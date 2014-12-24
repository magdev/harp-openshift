/**
 * New node file
 */

var harp = require('harp'),
	connect = require('connect'),
	middleware = require('./node_modules/harp/lib/middleware');

// Extend harp to use it on openshift
harp.openshift = function(dirPath, callback) {
	var port = (process.env.OPENSHIFT_NODEJS_PORT || 9000),
		ip = (process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
	
	connect.createServer(
		middleware.regProjectFinder(dirPath),
	    middleware.setup,
	    middleware.basicAuth,
	    middleware.underscore,
	    middleware.mwl,
	    middleware.static,
	    middleware.poly,
	    middleware.process,
	    middleware.fallback
	).listen(port, ip, callback);
};

module.exports = exports = harp;