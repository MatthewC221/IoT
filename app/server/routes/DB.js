var express = require('express');
var router = express.Router();

const { DB_Controller } = require('../db/db_controller');
var db = new DB_Controller();
var config = require('../../client/src/config');
var session = require('../db/session');

router.get('/get', (req, res) => {
    console.log("GET from DB");
    db.get_stored_uplinks(session.user)
        .then((uplinks) => {
            var data = [];
            for (var i=0;i<uplinks.length;++i) {
                prep = {
                    ID: uplinks[i].ID,
                    timestamp: uplinks[i].timestamp,
                    message: uplinks[i].message,
                    devID: uplinks[i].devID,
                    read: uplinks[i].read
                }
                data.push(prep);
            }
            res.json(data);
            res.end();
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        })
})

router.post('/remove', (req, res) => {
    console.log("REMOVE from DB");
    var msg_id = req.body.ID;
    db.remove_uplink(msg_id, session.user)
        .then((val) => {
            res.end();
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
})

router.post('/read', (req, res) => {
    console.log("UPDATE to DB");
    var msg_id = req.body.ID;
    var read = req.body.read;
    db.update_read(msg_id, read, session.user)
        .then((val) => {
            res.end();
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
})

module.exports = router;
