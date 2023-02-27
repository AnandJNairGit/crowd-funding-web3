import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../../App";
import { getMetaData } from "../../../services/pinata";
import PendingCampaignTile from "./PendingCampaignTile";

const CampaignActions = () => {
  const contractContext = useContext(ContractContext);
  const [pendingCampaign, setPendingCampaign] = useState();
  const { contract } = contractContext;
  const test = async () => {
    // console.log("pending contracts-------------->", contract);
    const campaigns = await contract.getPendingCampaigns();

    // console.log("pending contracts ------------------>", campaigns);
    let campaignsInfo = [];
    for (let index = 0; index < campaigns.length; index++) {
      const campaignMetadata = await (
        await getMetaData(campaigns[index].ipfsUrl)
      ).data;
      // console.log(campaignMetadata);
      const campaignInfo = {
        id: campaigns[index].id.toNumber(),
        recepient: campaigns[index].recepient,
        title: campaignMetadata.campaignTitle,
        description: campaignMetadata.campaignDescription,
        requiredFund: campaigns[index].requiredFunding.toNumber(),
        imageUrl: campaignMetadata.imgUrl,
        deadline: campaigns[index].deadline.toNumber(),
        approved: campaigns[index].approved,
        completed: campaigns[index].completed,
      };
      // console.log(campaignInfo);
      campaignsInfo.push(campaignInfo);
    }
    console.log(campaignsInfo);
    setPendingCampaign(campaignsInfo);
  };
  useEffect(() => {
    test();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {pendingCampaign ? (
          pendingCampaign.map((campaign) => (
            <PendingCampaignTile
              title={campaign.title}
              description={campaign.description}
              imageUrl={campaign.imageUrl}
              id={campaign.id}
            />
          ))
        ) : (
          <Typography>loading</Typography>
        )}
      </Box>
    </>
  );
};

export default CampaignActions;
