const { DB } = require('./db');
const CONFIG = require('./config.json');

var collection_name = CONFIG.collections.message;

class DB_Controller {
    constructor () {
        this.db = new DB();
    }

    store_uplink (uplink, user) {
        var data = uplink;
        data['user'] = user;
        return this.db.insert(data, collection_name)
        .then((res) => console.log("insert: " + JSON.stringify(res)))
    }
    
    get_stored_uplinks (user) {
        var query = {user: user};
        return this.db.get(query, collection_name)
    }

    update_read (id, read, user) {
        var query = {ID: id, user: user};
        var update = {$set: {read: read}};
        return this.db.update(query, update, collection_name)
        .then((res) => console.log("read_update: " + JSON.stringify(res)))
    }

    remove_uplink (id, user) {
        var query = {ID: id, user: user};
        return this.db.remove(query, collection_name)
        .then((res) => console.log("remove: " + JSON.stringify(res)))
    }
}

module.exports = {
    DB_Controller
};
