# biot-rpc

### The library for initializing the rpc connection, in conjunction with [biot-core](https://github.com/BIoTws/biot-core), is used for remote invocation of async / await functions.
</br></br>

## How to install

#### npm
```
> npm --save -i https://github.com/remmelgas/biot-rpc.git
```
#### yarp
```
> npm --save -i yarp add https://github.com/remmelgas/biot-rpc.git
```
</br>

## Example server


```javascript
const core = require('biot-core');
const net = require('biot-rpc');

/**
/* Permissions for remote access to functions array
**/

const allocEvents = [
    core.getMyDeviceWallets,
    core.getWallets
];

async Start() => {
    //initialize biot-core in test mode
    await core.init('test');

    //create a listener server
    let stream = net.createServer();
    stream.http().listen(4303);


    return 'Ok';
};

Start().then(console.log).error(console.error);
```
</br>

## Example client

> For an example on nodejs, we will use the jayson library

</br>

```
> npm --save -i jayson
```

</br></br>

```javascript
const jayson = require('jayson');


let stream = jayson.client.http({port: 4303});


stream.request('getMyDeviceWallets', function(err, state) {
    if(err) {
        throw err;
    }

    console.log(state.result);
});
```