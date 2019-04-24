var express = require('express');
var ttn = require('ttn');
var router = express.Router();

const { DB_Controller } = require('../db/db_controller');
var db = new DB_Controller();
var config = require('../../client/src/config');

router.get('/ttn', (req, res) => {
    console.log('connect to ttn');

    // discover handler and open mqtt connection
    ttn.data(config.ttnConfig.appId, config.ttnConfig.accessKey)
    .then(client => {
        return new Promise((resolve, reject) => { 
            client.on("uplink", function (devID, payload) {
                console.log("Received uplink from ", devID)
                console.log(payload)
                console.log(payload.payload_raw.toString())
                var data = {
                    timestamp: payload.metadata.time,
                    message: payload.payload_raw.toString(),
                    devId: payload.dev_id,
                    read: false
                };
                res.json(data);
                client.close();
                resolve(data);
            })
            
        })
    })
    .then(data => {
        db.store_uplink(data);
    })
    .catch(err => {
        console.error(err)
        process.exit(1)
    })

})

module.exports = router;
