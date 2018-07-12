const core = require('biot-core');
const net = require('./core');

async function Start() {
    await core.init('test');
    
    let stream = net.createServer([
        core.getWallets,
        core.getMyDeviceWallets,
        core.getAddressesInWallet,
        core.createNewWallet,
        core.createNewAddress,
        core.getWalletBalance,
        core.getAddressBalance,
        core.sendTextMessageToDevice,
        core.sendTechMessageToDevice,
        core.sendPaymentFromWallet,
        core.sendPaymentFromWalletUseUnstableUnits,
        core.getListTransactionsForAddress,
        core.getListTransactionsForWallet,
        core.myAddressInfo,
        core.signDevicePrivateKey,
        core.signWithAddress,
        core.verifySign,
        core.addCorrespondent,
        core.removeCorrespondent,
        core.listCorrespondents
      ]);

      stream.http().listen(4303);

      return 'Ok';
};

Start().then(console.log).catch(console.error);