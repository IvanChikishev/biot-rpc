const rpc = require('../core/remoteProtocolController');


function exampleData(id) {
    return [id, 'Hello, World!'];
}


async function Start() {
    let map = rpc.contract([exampleData]);
    let service = rpc.openService(map, {host: '127.0.0.1', port: 4303});

    let remote = await rpc.connect();

    console.log(await remote.exampleData(123));

    return 'Ok';
}

Start().then(console.log).catch(console.error);