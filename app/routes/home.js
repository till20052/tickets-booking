var path = require('path'),
    express = require('express'),
    router = express.Router();

router.get('^/home/*.html$', function (req, res) {
    res.render(path.join('../sources/home/views', req.url.split('/').slice(-1)[0].split('.')[0]));
});

module.exports = {
    router: router,
    prefix: '/',
    priority: 0
};
