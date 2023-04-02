import React, { useContext, useState } from "react";
import BackdropProgress from "../../components/common/BackdropProgress";
import FloatingButton from "../../components/common/FloatingButton";
import ResponsiveModal from "../../components/common/ResponsiveModal";
import FundForm from "../../components/common/FundForm";
import { ContractContext, SnackbarContext } from "../../App";

const FundCampaign = ({ campaignId, refresh }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);

  const { contract, contractConfig } = useContext(ContractContext);
  const { allowCrowdFunding } = contractConfig;
  const setSnackbarProps = useContext(SnackbarContext);

  const transferfund = async (value) => {
    if (value > contractConfig.minimumContribution) {
      try {
        setOpenModal(false);
        setOpenProgress(true);
        console.log("inside transfer fund");
        const transaction = await contract.fundCampaign(campaignId, {
          value,
        });
        console.log("Transaction sent:", transaction.hash);
        await transaction.wait();
        setSnackbarProps({
          open: true,
          message:
            "Thank you for your support! Your contribution is helping us bring our project to life.",
          type: "success",
        });
      } catch (error) {
        console.error("Error sending transaction:", error);
        setSnackbarProps({
          open: true,
          message: "Crowdfunding campaign was unsuccessful",
          type: "error",
        });
      } finally {
        await refresh();
        setOpenProgress(false);
      }
    } else {
      setSnackbarProps({
        open: true,
        message: `please contribute atleast ${contractConfig.minimumContribution} WEI`,
        type: "info",
      });
    }
  };

  const handleClick = () => {
    if (allowCrowdFunding) {
      setOpenModal(true);
    } else {
      setSnackbarProps({
        open: true,
        message:
          "Sorry, funding is currently disabled. Please try again later.",
        type: "info",
      });
    }
  };

  return (
    <>
      <FloatingButton title="fund" onClick={handleClick} />
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
