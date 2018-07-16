const {
    server
} = require('jayson');


exports.createServer = (state) => {
    let temporaryState = [];
    for(let stateIndex in state) {
        let stateData = state[stateIndex];

        temporaryState[stateData.name] = async (args, callback) => {
            callback(null, await stateData(...args));
        }
    }

    return new server(temporaryState);
};