/**
 * HarpJS in OpenShift
 * 
 * @author Marco Grätsch
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
