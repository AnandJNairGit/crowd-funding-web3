import CrowdFunding from "../contractABI/CrowdFunding.json";

async function getContract() {
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const accountAddress = await signer.getAddress();

  // Create the contract instance
  const contract = new ethers.Contract(
    "0x6f1EACCc7A1C6C49a1043Bb1932C7eCFb0cFd2c1",
    CrowdFunding.abi,
    signer
  );

  // Call multiple contract methods at once using Promise.all()
  const [
    isAdmin,
    hasAdminAccess,
    minimumContribution,
    allowCrowdFunding,
    allowCampaignCreation,
    creationPrice
  ] = await Promise.all([
    contract.isAdmin(), // Check if the current user is the admin of the contract
    contract.doesAdminAccountExist(accountAddress), // Check if the current user has admin access
    contract.minimumContribution(), // Get the minimum contribution required to participate in the crowdfunding
    contract.AllowCrowdFunding(), // Check if crowdfunding is allowed for the contract
    contract.AllowCampaignCreation(), // Check if campaign creation is allowed for the contract
    contract.creationPrice()
  ]);

  // Create an object with the constant values returned from the contract methods
  const contractConfig = {
    isAdmin,
    hasAdminAccess,
    minimumContribution,
    allowCrowdFunding,
    allowCampaignCreation,
    creationPrice
  };

  // Return an object containing the account address, contract instance, and constant values
  return { accountAddress, contract, contractConfig };
}

export default getContract;
