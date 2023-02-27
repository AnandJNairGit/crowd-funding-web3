import React, { useContext, useState } from "react";
import { Button, Chip } from "@mui/material";
import { Done } from "@mui/icons-material";
import ResponsiveModal from "../../../components/common/ResponsiveModal";
import { ContractContext } from "../../../App";

const ApproveCampaignButton = ({ campaignId, campaignTitle }) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const contract = useContext(ContractContext).contract;
  const approveCampaign = async () => {
    try {
      await contract.approveCamaignRequest(campaignId);
    } catch (error) {
      console.log("approve campaign error");
    }
  };

  return (
    <>
      <Chip
        icon={<Done />}
        label="Approve"
        color="success"
        clickable
        onClick={openModal}
      />
      <ResponsiveModal
        open={open}
        title={`Approve Campaign "${campaignTitle}" #${campaignId} ?`}
        onClose={closeModal}
      >
        <>
          <Button onClick={approveCampaign}>Yes</Button>
        </>
      </ResponsiveModal>
    </>
  );
};

export default ApproveCampaignButton;
