import React, { useState } from "react";
import FloatingButton from "../../components/common/FloatingButton";
import ResponsiveModal from "../../components/common/ResponsiveModal";
import FundForm from "./FundForm";

const FundCampaign = ({ campaignId }) => {
  const [openModal, setOpenModal] = useState(false);

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
        <FundForm id={campaignId} />
      </ResponsiveModal>
    </>
  );
};

export default FundCampaign;
