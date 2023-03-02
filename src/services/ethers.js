import CrowdFunding from "../contractABI/CrowdFunding.json"

async function getContract(){
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract("0x9882baDE0a3e4B319c6EE3e38b184740f1b7Fa53", CrowdFunding.abi, signer)
    return contract;
  }

  export default getContract;