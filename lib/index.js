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
    connect = require('connect'),
    middleware = require('../../harp/lib/middleware'),
    localMiddleware = require('./middleware'),
    compression = require('compression');


/**
 * OpenShift
 *
 * Host a single Harp Application.on OpenShift
 */
harp.openshift = function(dirPath, options, callback) {
    options = options || {};
    var port = (process.env.OPENSHIFT_NODEJS_PORT || options.port || 9000),
        ip = (process.env.OPENSHIFT_NODEJS_IP || options.ip || '0.0.0.0');
        
    return connect.createServer(
        middleware.regProjectFinder(dirPath),
        middleware.setup,
        middleware.basicAuth,
        middleware.underscore,
        middleware.mwl,
        localMiddleware.performance({maxAge: (60*60*24*30)}),
        compression({threshold: 512}),
        middleware.static,
        middleware.poly,
        middleware.process,
        middleware.fallback
    ).listen(port, ip, callback);
};

module.exports = exports = harp;
