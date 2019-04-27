var express = require('express');
var ttn = require('ttn');
var router = express.Router();

var config = require('../../client/src/config');
var session = require('../db/session');

router.use(function(req, res, next) {
    if(req.path != '/ttn') next();
    console.log("GET from TTN")
    var callback_obj = {
        req: req,
        res: res,
        next: next
    };
    session.set_callback(callback_obj);
});

router.get('/', (req, res) => {
})

module.exports = router;
