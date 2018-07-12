const jayson = require('jayson');


const createServer = function (state) {
    let temporaryState = new Array();
    for(let stateIndex in state) {
        let stateData = state[stateIndex];

        temporaryState[stateData.name] = async function(args, callback) {
            let resource = await stateData(...args);
            callback(null, resource);
        }
    }

    let server = new jayson.server(temporaryState);
    return server;
}

module.exports.createServer = createServer;