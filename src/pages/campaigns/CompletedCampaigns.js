import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../App";
import BackdropProgress from "../../components/common/BackdropProgress";
import CreateCampaignRequest from "../../components/createCampaignRequest";
import { getCampaignsMetadata } from "../../helpers/getCampaignsMetadata";
import CampaignTile from "../../components/common/CampaignTile";

const CompletedCampaigns = () => {
  const contract = useContext(ContractContext).contract;
  const [completedCampaigns, setCompletedCampaigns] = useState();

  const fetchOnGoingCampaigns = async () => {
    const campaigns = await contract.getCompletedCampaigns();
    const campaignsMetadata = await getCampaignsMetadata(campaigns);
    setCompletedCampaigns(campaignsMetadata);
    console.log("the ongoing campaigns are-----------> ", completedCampaigns);
  };
  useEffect(() => {
    fetchOnGoingCampaigns();

    return () => {};
  }, []);

  return (
    <>
      {completedCampaigns ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {completedCampaigns.map((campaign) => (
            <CampaignTile campaignObj={campaign} />
          ))}
        </Box>
      ) : (
        <BackdropProgress open={true} />
      )}
      <CreateCampaignRequest />
    </>
  );
};

export default CompletedCampaigns;
