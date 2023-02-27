
import React, { useState } from "react";


import CreateForm from "./CreateForm";
import FloatingButton from "./FloatingButton";
import ResponsiveModal from "../common/ResponsiveModal";

const CreateCampaignRequest = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
          <CreateForm />
        </ResponsiveModal>
      </div>
      <FloatingButton onClick={handleClickOpen} />
    </>
  );
};

export default CreateCampaignRequest;
