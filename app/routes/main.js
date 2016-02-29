var router = require('express').Router();

router
    .get('/', function (req, res) {
        res.render('index', {
            title: 'Благословенна Україна. Традиції і сучасність'
        });
    })
    .get('^/([A-z0-9-_]+)/([A-z0-9-_/]+).html$', function (req, res) {
        res.render(
            '../sources/' + (new RegExp(req.route.path))
                .exec(req.url)
                .splice(1)
                .join('/views/') + '.jade'
        );
    });

module.exports = {
    router: router,
    prefix: '/',
    priority: 0
};
