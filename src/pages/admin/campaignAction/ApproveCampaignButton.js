import React, { useContext, useState } from "react";
import { Button, Chip } from "@mui/material";
import { Done } from "@mui/icons-material";
import ResponsiveModal from "../../../components/common/ResponsiveModal";
import { ContractContext } from "../../../App";
import BackdropProgress from "../../../components/common/BackdropProgress";

const ApproveCampaignButton = ({ campaignId, campaignTitle, refreshCampaigns }) => {
  const [open, setOpen] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const contract = useContext(ContractContext).contract;
  const approveCampaign = async () => {
    try {
      setOpenBackDrop(true);
      closeModal();
      const transaction = await contract.approveCamaignRequest(campaignId);
      await transaction.wait();
    } catch (error) {
      console.log("approve campaign error");
    } finally {
      await refreshCampaigns();
      setOpenBackDrop(false);

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
      <BackdropProgress open={openBackDrop} />
    </>
  );
};

export default ApproveCampaignButton;
