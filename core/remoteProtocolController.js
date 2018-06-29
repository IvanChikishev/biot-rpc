const net = require('net');

const compress = (state) =>
    JSON.stringify(state) || null;

const decompress = (state) =>
    JSON.parse(state) || null;
    
/**
 * @param {*} state 
 * @description converts an array of functions
 * @returns {Array}
 * @example let bind = contract([func, func1, func2]);
 */
function controller(state) {
    let _m_array = {};
    for (let _callbackID in state) {
        let _callback = state[_callbackID];
        _m_array[_callback.name] = _callback;
    }
    return _m_array;
}
/**
 * @param {*} state
 * @description initializes the rpc socket
 * @returns {net.Server} server
 * @example let service = openService(bind, {host: '127.0.0.1', port: 4303});
 */

function open(state, configure) {
    let perfomanceRoadmap = {};
    for (let _callbackID in state) {
        let _callback = state[_callbackID];
        perfomanceRoadmap[_callbackID] = {
            count: _callback.length
        };
    }

    let server = new net.createServer(socket => {
        socket.write(compress(perfomanceRoadmap));

        socket.on('data', async function (stateData) {
            stateData = decompress(stateData);
            let invisibleSource = await state[stateData.__name](...stateData.args);
            socket.write(compress({ __id: stateData.__id, __name: stateData.__name, resource: invisibleSource }));
        });
    });

    server.listen(configure);
    return server;
}

/**
 * @async
 * @param {*} host 
 * @param {*} port 
 * @description creates an rpc connection
 * @example
 *  let remote = await connect();
 */
async function connect(host = '127.0.0.1', port = 4303) {
    const EventEmitter = new (require('events'))();

    let client = net.connect({ host: host, port: port });
    let isContract = false;

    let strongData = await new Promise(resolve => {
        client.on('data', stateData => {
            stateData = decompress(stateData);
            if (!isContract) {
                let decodeBase = {};
                for (let _index in stateData) {
                    let _actionBase = stateData[_index];
                    decodeBase[_index] = async function (...args) {
                        if (_actionBase.count > args.length)
                            throw new Error("too few arguments for this function");

                        let personalIndex = Math.random();

                        return new Promise(resolve => {
                            EventEmitter.on(`event:rpc:${personalIndex}:${_index}`, function (stateData) {
                                return resolve(stateData);
                            });

                            client.write(compress({ __id: personalIndex, __name: _index, args: args }));
                        });
                    }
                }

                isContract = true;
                return resolve(decodeBase);
            }
            else EventEmitter.emit(`event:rpc:${stateData.__id}:${stateData.__name}`, stateData.resource);
        });
    });

    return strongData;
}

module.exports = {
    contract: controller,
    openService: open,
    connect: connect
}