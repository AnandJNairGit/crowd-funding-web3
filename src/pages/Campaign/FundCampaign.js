import React, { useContext, useState } from "react";
import BackdropProgress from "../../components/common/BackdropProgress";
import FloatingButton from "../../components/common/FloatingButton";
import ResponsiveModal from "../../components/common/ResponsiveModal";
import FundForm from "./FundForm";
import { ContractContext } from "../../App";

const FundCampaign = ({ campaignId, refresh }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);

  const contract = useContext(ContractContext).contract;

  const transferfund = async (value) => {
    
    try {
      setOpenModal(false);
      setOpenProgress(true);
      console.log("inside transfer fund");
      const transaction = await contract.fundCampaign(campaignId, {
        value: value,
      });
      console.log("Transaction sent:", transaction.hash);
      await transaction.wait();
    } catch (error) {
      console.error("Error sending transaction:", error);
    } finally {
      await refresh();
      setOpenProgress(false);
    }
  };

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
        <FundForm onSubmit={transferfund} />
      </ResponsiveModal>
      <BackdropProgress open={openProgress} />
    </>
  );
};

export default FundCampaign;
