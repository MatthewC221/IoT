class Session {
    constructor () {
        this.callbacks = [];
        this.user = 'tester'; //for demo only
    }
    
    set_callback (callback_obj) {
        this.callbacks.push(callback_obj);
    }

    dispatch_callback (data) {
        this.callbacks.map((callback_obj) => {
            callback_obj.res.json(data);
            callback_obj.res.end();
        })
        this.callbacks = [];
    }
}

var session = new Session();
exports.callbacks = session.callbacks;
exports.user = session.user;
exports.set_callback = session.set_callback;
exports.dispatch_callback = session.dispatch_callback;
