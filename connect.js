const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');

require('dotenv').config();

const main = async () => {
  if (!process.argv || process.argv.length != 3) {
    console.log("wrong command or missing apiKey")
    return
  }
  const fs = require("fs")
  const apiKey = process.argv[2]
  fs.writeFileSync("./.env", `REST_URL='https://celo-alfajores--rpc.datahub.figment.io/apikey/${apiKey}/'\n`)
  const web3 = new Web3(process.env.REST_URL);
  const client = ContractKit.newKitFromWeb3(web3);

  // Query chain ID
  const chainId = await web3.eth.getChainId()
    .catch((err) => { throw new Error(`Could not get chain id: ${err}`); });

  // Query chain height
  const height = await web3.eth.getBlockNumber()
    .catch((err) => { throw new Error(`Could not get block height: ${err}`); });

  console.log('ChainId:', chainId);
  console.log('Block height:', height);

  console.log('Successfully connected to Celo Network');
};

main().catch((err) => {
  console.error(err);
});
