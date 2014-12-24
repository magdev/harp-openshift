/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014, Marco Grätsch <magdev3.0@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var harp = require('harp'),
	path = require('path'),
	connect = require('connect'),
	middleware = require(path.join(__dirname, '..', 'node_modules/harp/lib/middleware'));


/**
 * OpenShift
 *
 * Host a single Harp Application.on OpenShift
 */
harp.openshift = function(dirPath, callback) {
	var port = (process.env.OPENSHIFT_NODEJS_PORT || 9000),
	    ip = (process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
	    
	return connect.createServer(
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
