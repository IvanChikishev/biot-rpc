const rpc = require('../core/remoteProtocolController');


function exampleData(id) {
    return `has worked:${id}`
}

async function testArgs(name, family = "remmelgas") {
    await new Promise(res => setTimeout(res, 2000));
    return [name, family];
}

async function Start() {
    let map = rpc.contract([exampleData, testArgs]);
    let service = rpc.openService(map, {host: '127.0.0.1', port: 4303});

    let remote = await rpc.connect();

    console.log(await remote.exampleData(123));
    console.log(await remote.testArgs('ivan', 'chikishev'));

    return 'Ok';
}

Start().then(console.log).catch(console.error);