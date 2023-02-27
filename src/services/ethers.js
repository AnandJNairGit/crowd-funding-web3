import CrowdFunding from "../contractABI/CrowdFunding.json"

async function getContract(){
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract("0x70E5aBc01d1efDec8A654DA935B65398bfE78E34", CrowdFunding.abi, signer)
    return contract;
  }

  export default getContract;