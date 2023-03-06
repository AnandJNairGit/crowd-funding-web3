import { getMetaData } from "../services/pinata";

export const getCampaignsMetadata = async (campaigns) => {
  // console.log("inside helper function-------->", campaigns);
  try {
    let campaignsInfo = [];
    for (let index = 0; index < campaigns.length; index++) {
      const campaignMetadata = await (
        await getMetaData(campaigns[index].ipfsUrl)
      ).data;
      const campaignInfo = {
        id: campaigns[index].id.toNumber(),
        recepient: campaigns[index].recepient,
        title: campaignMetadata.campaignTitle,
        description: campaignMetadata.campaignDescription,
        requiredFund: campaigns[index].requiredFunding.toNumber(),
        raisedAmount: campaigns[index].raisedAmount.toNumber(),
        imageUrl: campaignMetadata.imgUrl,
        deadline: campaigns[index].deadline.toNumber(),
        approved: campaigns[index].approved,
        completed: campaigns[index].completed,
      };
      campaignsInfo.push(campaignInfo);
    }
    // console.log(campaignsInfo);
    return campaignsInfo;
  } catch (error) {
    return [];
  }
};
