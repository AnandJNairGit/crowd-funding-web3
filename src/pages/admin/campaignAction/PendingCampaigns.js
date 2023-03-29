import { Box, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../../App";
import Centered from "../../../components/common/Centered";
import { getCampaignsMetadata } from "../../../helpers/getCampaignsMetadata";
import AdminCampaignTile from "./AdminCampaignTile";

const PendingCampaigns = () => {
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

  const approveCampaign = async (id) => {
    try {
      console.log("inside approve campaign ----->");
      const transaction = await contract.approveCamaignRequest(id);
      await transaction.wait();
    } catch (error) {

      console.log("approve campaign error-------->", error);
    }
  };

  useEffect(() => {
    fetchPendingCampaigns();
  }, []);
  return (
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
          <AdminCampaignTile
            campaignObj={campaign}
            refreshCampaigns={fetchPendingCampaigns}
            action={approveCampaign}
            actionBtnName="Approve"
          />
        ))
      ) : (
        // <BackdropProgress open={true} />
        <Centered>
          <CircularProgress />
        </Centered>
      )}
    </Box>
  );
};

export default PendingCampaigns;
