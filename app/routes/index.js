var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Благословенна Україна. Традиції і сучасність'
    });
});

module.exports = {
    router: router,
    prefix: '/',
    priority: 0
};
