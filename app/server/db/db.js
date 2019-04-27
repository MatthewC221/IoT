var mongo_client = require('mongodb').MongoClient;
const CONFIG = require('./config.json');
var url = CONFIG.url;
var db_name = CONFIG.db_name;
var db;

class DB {
    insert (data, collection) {
        return new Promise((resolve, reject) => {
           return mongo_client.connect(url, (err, conn) => {
                if (err) reject(err);
                conn.db(db_name).collection(collection).insertOne(data, (err, res) => {
                    if (err) reject(err);
                    resolve(res.result);
                    conn.close();
                })
            })
        })
    }
    
    get (query, collection) {
        return new Promise((resolve, reject) => {
            return mongo_client.connect(url, (err, conn) => {
                if (err) reject(err);
                conn.db(db_name).collection(collection).find(query).toArray((err, res) => {
                    if (err) reject(err);
                    resolve(res);
                    conn.close();
                })
            })
        })
    }
    
    update (query, data, collection) {
        return new Promise((resolve, reject) => {
            return mongo_client.connect(url, (err, conn) => {
                if (err) reject(err);
                conn.db(db_name).collection(collection).updateOne(query, data, (err, res) => {
                    if (err) reject(err);
                    resolve(res.result);
                    conn.close();
                })
            })
        })
    }

    remove (query, collection) {
        return new Promise((resolve, reject) => {
            return mongo_client.connect(url, (err, conn) => {
                if (err) reject(err);
                conn.db(db_name).collection(collection).deleteOne(query, (err, res) => {
                    if (err) reject(err);
                    resolve(res.result);
                    conn.close();
                })
            })
        })

    }

}

module.exports = {
    DB
};
