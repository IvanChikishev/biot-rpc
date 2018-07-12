const jayson = require('jayson');


let stream = jayson.client.http({
    port: 4303
});


stream.request('getMyDeviceWallets', [], function(err, state) {
    if(err) {
        throw err;
    }

    console.log(state);
});