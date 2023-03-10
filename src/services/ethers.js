import CrowdFunding from "../contractABI/CrowdFunding.json";

async function getContract() {
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const accountAddress = await signer.getAddress();
  let contract = new ethers.Contract(
    "0xFaa05Fc978E11D8f4465dbA2BC1E9629D2C8A5d3",
    CrowdFunding.abi,
    signer
  );
  return { accountAddress, contract };
}

export default getContract;
