import CrowdFunding from "../contractABI/CrowdFunding.json";

async function getContract() {
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const accountAddress = await signer.getAddress();
  let contract = new ethers.Contract(
    "0xCA735871a7BE0132A02Df30f0b6110CD279ECe9C",
    CrowdFunding.abi,
    signer
  );
  return { accountAddress, contract };
}

export default getContract;
