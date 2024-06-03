// truffle-config.js
require('dotenv').config({ path: './my.env' });
const HDWalletProvider = require('@truffle/hdwallet-provider');

console.log("**********************************************************************************************************");
console.log("MNEMONIC:", process.env.MNEMONIC);
console.log("MNEMONIC_SEPOLIA:", process.env.MNEMONIC_SEPOLIA);
console.log("INFURA_PROJECT_ID:", process.env.INFURA_PROJECT_ID);
console.log("ALCHEMY_PROJECT_ID:", process.env.ALCHEMY_PROJECT_ID);

module.exports = {
  networks: {
    dev: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 6721975, // Default gas limit
      gasPrice: 200000000000  // 20 Gwei
    },
    sepolia: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: process.env.MNEMONIC_SEPOLIA
        },
        providerOrUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_PROJECT_ID}`,
        shareNonce: true,
        derivationPath: `m/44'/60'/0'/0/`
      }),
      network_id: 11155111, // ID de la red Sepolia
      gas: 4700000, // Límite de gas
      gasPrice: 10000000000, // Precio del gas en wei (10 gwei)
    },
    geth: {
      host: "127.0.0.1",
      port: 8545, // Puerto por defecto de Geth
      network_id: "1", // ID de la red principal de Ethereum
      from: "0xYourAccountAddress", // Dirección de la cuenta desde la cual se desplegarán los contratos
      gas: 4700000
    },
  },
  compilers: {
    solc: {
      version: "0.8.20", // Specify the exact version you are using
      // settings: {
      //   evmVersion: "istanbul" // Versión de EVM que se debe usar
      // }
    },
  },
};

//geth --sepolia --http --http.addr "127.0.0.1" --http.port 8545 --http.api eth,net,web3,personal --http.corsdomain "*" --allow-insecure-unlock
