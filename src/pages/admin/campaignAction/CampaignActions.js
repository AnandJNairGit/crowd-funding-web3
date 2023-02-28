import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../../App";
import BackdropProgress from "../../../components/common/BackdropProgress";
import { getCampaignsMetadata } from "../../../helpers/getCampaignsMetadata";
import { getMetaData } from "../../../services/pinata";
import PendingCampaignTile from "./PendingCampaignTile";

const CampaignActions = () => {
  const contractContext = useContext(ContractContext);
  const [pendingCampaign, setPendingCampaign] = useState();
  const { contract, updateContract } = contractContext;
  const fetchPendingCampaigns = async () => {
    try {
      const campaigns = await contract.getPendingCampaigns();
      let campaignsInfo = await getCampaignsMetadata(campaigns);
      console.log(campaignsInfo);
      setPendingCampaign(campaignsInfo);
    } catch (error) {
      await updateContract();
    }
  };
  useEffect(() => {
    fetchPendingCampaigns();
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
              refreshCampaigns = {fetchPendingCampaigns}
            />
          ))
        ) : (
          <BackdropProgress open={true} />
        )}
      </Box>
    </>
  );
};

export default CampaignActions;
