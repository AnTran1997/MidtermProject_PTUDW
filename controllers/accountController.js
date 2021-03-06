var express = require('express'),
sha256 = require('crypto-js/sha256'),
moment = require('moment');

var restrict = require('../middle-wares/restrict');
var accountRepo = require('../repos/accountRepo');

var router = express.Router();

router.get('/register', (req, res) => {
    res.render('account/register');
});

router.post('/register', (req, res) => {

    var user = {
        username: req.body.username,
        password: sha256(req.body.password).toString(),
        name: req.body.fullname,
        email: req.body.email,
        dob: req.body.dob,
        permisson: 0,
        gender: 0
    };

    accountRepo.add(user).then(value => {
        req.session.isLogged = true;
        req.session.curUser = user;
        req.session.cart = [];
        var vm = {
            curUser: user,
            isLogged: true
        }
        res.render('users/userAccount', vm);
    });
});


router.post('/login', (req, res) => {
    var user = {
        username: req.body.username_login,
        password: sha256(req.body.password_login).toString()
    };

    accountRepo.login(user).then(rows => {
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.curUser = rows[0];
            req.session.curUser.dob = rows[0].dob.toISOString().split('T')[0];
            req.session.cart = [];
            var url = '/';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.redirect(url);
        } else {
           
        }
    });
});

router.get('/logout', restrict, (req, res) => {
    req.session.isLogged = false;
    req.session.curUser = null;
    req.session.cart = [];

    res.redirect(req.headers.referer);
});

router.get('/profile', restrict, (req, res) => {
    res.render('account/profile');
});

module.exports = router;