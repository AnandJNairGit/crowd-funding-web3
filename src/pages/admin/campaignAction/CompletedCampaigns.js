import { Box, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../../App";
import Centered from "../../../components/common/Centered";
import NotFound from "../../../components/common/NotFound";
import { getCampaignsMetadata } from "../../../helpers/getCampaignsMetadata";
import AdminCampaignTile from "./AdminCampaignTile";

const CompletedCampaigns = () => {
  const contractContext = useContext(ContractContext);
  const [completedCampaign, setCompletedCampaign] = useState();
  const { contract, updateContract } = contractContext;

  const fetchCompletedCampaigns = async () => {
    try {
      const campaigns = await contract.getCompletedCampaigns();
      let campaignsInfo = await getCampaignsMetadata(campaigns);
      console.log(campaignsInfo);
      setCompletedCampaign(campaignsInfo);
    } catch (error) {
      await updateContract();
    }
  };

  const transactAmpount = async (id) => {
    try {
      const transaction = await contract.transactRaisedAmount(id);
      await transaction.wait();
    } catch (error) {
      console.log("transaction error-------->", error);
    }
  };

  useEffect(() => {
    fetchCompletedCampaigns();
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
      {completedCampaign ? (
        completedCampaign.length > 0 ? (
          completedCampaign.map((campaign) => (
            <AdminCampaignTile
              campaignObj={campaign}
              refreshCampaigns={fetchCompletedCampaigns}
              action={transactAmpount}
              actionBtnName={campaign.amountReceived ? false : "Transact"}
            />
          ))
        ) : (
          <NotFound message="No Campaigns Are Completed Yet" />
        )
      ) : (
        // <BackdropProgress open={true} />
        <Centered>
          <CircularProgress />
        </Centered>
      )}
    </Box>
  );
};

export default CompletedCampaigns;
