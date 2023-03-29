import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../App";
import BackdropProgress from "../../components/common/BackdropProgress";
import CreateCampaignRequest from "../../components/createCampaignRequest";
import { getCampaignsMetadata } from "../../helpers/getCampaignsMetadata";
import CampaignTile from "../../components/common/CampaignTile";
import NotFound from "../../components/common/NotFound";

const MyCampaigns = () => {
  const contract = useContext(ContractContext).contract;
  const [myCampaigns, setMyCampaigns] = useState();

  const fetchmyCampaigns = async () => {
    const campaigns = await contract.getMycampaigns();
    const campaignsMetadata = await getCampaignsMetadata(campaigns);
    setMyCampaigns(campaignsMetadata);
    console.log("the ongoing campaigns are-----------> ", myCampaigns);
  };
  useEffect(() => {
    fetchmyCampaigns();

    return () => {};
  }, []);

  return (
    <>
      {myCampaigns ? (
        myCampaigns.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {myCampaigns.map((campaign) => (
              <CampaignTile campaignObj={campaign} showStatusBadge />
            ))}
          </Box>
        ) : (
          <NotFound message="You Don't own any Campaigns" />
        )
      ) : (
        <BackdropProgress open={true} />
      )}
      <CreateCampaignRequest />
    </>
  );
};

export default MyCampaigns;
