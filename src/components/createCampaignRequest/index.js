import React, { useContext, useState } from "react";

import CreateForm from "./CreateForm";
import FloatingButton from "../common/FloatingButton";
import ResponsiveModal from "../common/ResponsiveModal";
import BackdropProgress from "../common/BackdropProgress";
import { ContractContext, SnackbarContext } from "../../App";

const CreateCampaignRequest = () => {
  const [open, setOpen] = React.useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const setSnackbarProps = useContext(SnackbarContext);
  const { allowCampaignCreation } = useContext(ContractContext).contractConfig;

  const handleClickOpen = () => {
    if (allowCampaignCreation) {
      setOpen(true);
    } else {
      console.log("INSIDE CAMPAIGN CREATION");
      setSnackbarProps({
        open: true,
        message:
          "Sorry, campaign creation is currently disabled. Please try again later.",
        type: "info",
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <ResponsiveModal
          open={open}
          onClose={handleClose}
          title="Create Campaign Request :"
        >
          <CreateForm
            closeModal={handleClose}
            setProgressOpen={setProgressOpen}
          />
        </ResponsiveModal>
      </div>
      <FloatingButton onClick={handleClickOpen} title="request campaign" />
      <BackdropProgress open={progressOpen} />
    </>
  );
};

export default CreateCampaignRequest;
