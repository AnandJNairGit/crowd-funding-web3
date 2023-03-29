import React, {useState } from "react";
import { Button, Chip } from "@mui/material";
import { Done } from "@mui/icons-material";
import ResponsiveModal from "../../../components/common/ResponsiveModal";
import BackdropProgress from "../../../components/common/BackdropProgress";

const CampaignActionButton = ({
  btnName,
  onClick,
  campaignObj,
  refreshCampaigns,
}) => {
  const { id, title } = campaignObj;
  const [open, setOpen] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const performAction = async () => {
    try {
      setOpenBackDrop(true);
      closeModal();
      await onClick(id);
      // const transaction = await contract.approveCamaignRequest(id);
      // await transaction.wait();
    } catch (error) {
      console.log("campaign action error");
    } finally {
      await refreshCampaigns();
      setOpenBackDrop(false);
    }
  };

  return (
    <>
      <Chip
        icon={<Done />}
        label={btnName}
        color="success"
        clickable
        onClick={openModal}
      />
      <ResponsiveModal
        open={open}
        title={`${btnName} Campaign "${title}" #${id} ?`}
        onClose={closeModal}
      >
        <>
          <Button variant="contained" onClick={performAction}>
            Yes
          </Button>
        </>
      </ResponsiveModal>
      <BackdropProgress open={openBackDrop} />
    </>
  );
};

export default CampaignActionButton;
