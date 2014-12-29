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

module.exports = exports = {
    performance: function(options) {
        return function(req, res, next) {
            if (process.env.NODE_ENV === 'production') {
                if (req.url.indexOf('/assets/') === 0) {
                    res.setHeader('Cache-Control', 'public, max-age=' + (options.maxAge) + ', must-revalidate');
                    res.setHeader('Expires', new Date(Date.now() + (options.maxAge*1000)).toUTCString());
                } else {
                    res.setHeader('Cache-Control', 'no-cache');
                    res.setHeader('Expires', new Date(Date.now()).toUTCString());
                }
                res.setHeader('X-Frame-Options', 'deny');
                res.setHeader('X-XSS-Protection', '1; mode=block');
                res.setHeader('X-Content-Type-Options', 'nosniff');
                if (req.proto === 'https') {
                    res.setHeader('Strict-Transport-Security', 'max-age=' + (options.maxAge) + '; includeSubDomains');
                }
            }
            return next();
        };
    }
};
