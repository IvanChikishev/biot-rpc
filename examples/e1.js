const rpc = require('../core/core.js');
const jayson = require('jayson');
const core = require('biot-core');

function exampleData(id) {
    return [id, 'Hello, World!'];
}


async function Start() {
    await core.init('test');

    let server = rpc.createServer([exampleData, core.getMyDeviceWallets]);
    server.http().listen(4303);
    let client = jayson.client.http({ port: 4303 });

    client.request('getMyDeviceWallets', [], function (err, response) {
        if (err)
            throw new Error(err);

        console.error(response.result);
    });

    return 'Ok';
}

Start().then(console.log).catch(console.error);