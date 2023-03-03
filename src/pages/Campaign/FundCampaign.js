import React, { useState } from "react";
import BackdropProgress from "../../components/common/BackdropProgress";
import FloatingButton from "../../components/common/FloatingButton";
import ResponsiveModal from "../../components/common/ResponsiveModal";
import FundForm from "./FundForm";

const FundCampaign = ({ campaignId, refresh }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);

  return (
    <>
      <FloatingButton
        title="fund"
        onClick={() => {
          setOpenModal(true);
        }}
      />
      <ResponsiveModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title="Fund Campaign"
      >
        <FundForm
          id={campaignId}
          setOpenModal={setOpenModal}
          setOpenprogress={setOpenProgress}
          refresh={refresh}
        />
      </ResponsiveModal>
      <BackdropProgress open={openProgress} />
    </>
  );
};

export default FundCampaign;
