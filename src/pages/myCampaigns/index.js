import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../App";
import BackdropProgress from "../../components/common/BackdropProgress";
import CreateCampaignRequest from "../../components/createCampaignRequest";
import { getCampaignsMetadata } from "../../helpers/getCampaignsMetadata";
import CampaignTile from "../../components/common/CampaignTile";

const MyCampaigns = () => {
  const contract = useContext(ContractContext).contract;
  const [onGoingCampaigns, setOnGoingCampaigns] = useState();

  const fetchOnGoingCampaigns = async () => {
    const campaigns = await contract.getMycampaigns();
    const campaignsMetadata = await getCampaignsMetadata(campaigns);
    setOnGoingCampaigns(campaignsMetadata);
    console.log("the ongoing campaigns are-----------> ", onGoingCampaigns);
  };
  useEffect(() => {
    fetchOnGoingCampaigns();

    return () => {};
  }, []);

  return (
    <>
      {onGoingCampaigns ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {onGoingCampaigns.map((campaign) => (
            <CampaignTile campaignObj={campaign} showStatusBadge />
          ))}
        </Box>
      ) : (
        <BackdropProgress open={true} />
      )}
      <CreateCampaignRequest />
    </>
  );
};

export default MyCampaigns;
