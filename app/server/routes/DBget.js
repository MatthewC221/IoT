var express = require('express');
var router = express.Router();

const { DB_Controller } = require('../db/db_controller');
var db = new DB_Controller();
var config = require('../../client/src/config');

router.get('/', (req, res) => {
    console.log("retrieving stored uplinks from db");
    db.get_stored_uplinks()
        .then((uplinks) => {
            var data = [];
            for (var i=0;i<uplinks.length;++i) {
                prep = {
                    timestamp: uplinks[i].content.timestamp,
                    message: uplinks[i].content.message
                }
                data.push(prep);
            }
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        })
})

module.exports = router;
