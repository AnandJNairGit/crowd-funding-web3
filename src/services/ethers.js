import CrowdFunding from "../contractABI/CrowdFunding.json"

async function getContract(){
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract("0x8091797C9E3E4B10996Cd41615083B6355EA138D", CrowdFunding.abi, signer)
    return contract;
  }

  export default getContract;