import CrowdFunding from "../contractABI/CrowdFunding.json"

async function getContract(){
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const accountAddress = await signer.getAddress();
    let contract = new ethers.Contract("0xC53A9a5ab84ed3D1B5196DfA2F7b52d8Cbe6372a", CrowdFunding.abi, signer)
    return {accountAddress,contract};
  }

 

  export default getContract;