const { DB } = require('./db');
const CONFIG = require('./config.json');
var collection_name = CONFIG.collections.message;
var USER = "tester"; // for testing only

class DB_Controller {
    constructor () {
        this.db = new DB();
    }

    store_uplink (uplink) {
        var data = {
            "user": USER,
            "content": uplink,
        };
        return this.db.insert(data, collection_name);
    }
    
    get_stored_uplinks () {
        var query = {user: USER};
        return this.db.get(query, collection_name);
    }
}

module.exports = {
    DB_Controller
};
