import { Box, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../../App";
import Centered from "../../../components/common/Centered";
import { getCampaignsMetadata } from "../../../helpers/getCampaignsMetadata";
import AdminCampaignTile from "./AdminCampaignTile";

const RefundableCampaigns = () => {
  const contractContext = useContext(ContractContext);
  const [refundableCampaign, setRefundableCampaign] = useState();
  const { contract, updateContract } = contractContext;

  const fetchRefundableCampaigns = async () => {
    try {
      const campaigns = await contract.getRefundableCampaigns();
      let campaignsInfo = await getCampaignsMetadata(campaigns);
      console.log(campaignsInfo);
      setRefundableCampaign(campaignsInfo);
    } catch (error) {
      await updateContract();
    }
  };

  const refundCampaign = async (id) => {
    try {
      console.log("inside approve campaign ----->");
      const transaction = await contract.refundCampaign(id);
      await transaction.wait();
    } catch (error) {

      console.log("refund campaign error-------->", error);
    }
  };

  useEffect(() => {
    fetchRefundableCampaigns();
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
      {refundableCampaign ? (
        refundableCampaign.map((campaign) => (
          <AdminCampaignTile
            campaignObj={campaign}
            refreshCampaigns={fetchRefundableCampaigns}
            action={refundCampaign}
            actionBtnName="Refund"
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

export default RefundableCampaigns;
