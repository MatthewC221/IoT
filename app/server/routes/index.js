var express = require('express');
var ttn = require('ttn');
var router = express.Router();

var config = require('../../client/src/config')

// app.use(express.static(path.join(__dirname, 'build')));

router.get('/ttn', (req, res) => {
    console.log('connect to ttn');

    // discover handler and open mqtt connection
    ttn.data(config.ttnConfig.appId, config.ttnConfig.accessKey)
    .then(client => {
        client.on("uplink", function (devID, payload) {
            console.log("Received uplink from ", devID)
            console.log(payload)
            console.log(payload.payload_raw.toString())
            res.json({
                timestamp: payload.metadata.time,
                message: payload.payload_raw.toString()
            });
            // return payload.payload_raw;
        })
    })
    .catch(err => {
        console.error(err)
        process.exit(1)
    })

    // var list = ["item1", "item2", "item3"];
    // res.json(list);
    // console.log('Sent list of items');
})

// router.listen(port, () => console.log(`App is listening on port ${port}!`));

module.exports = router;
