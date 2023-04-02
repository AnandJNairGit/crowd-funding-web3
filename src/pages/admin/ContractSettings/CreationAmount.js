import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { ProgressContext } from ".";
import { ContractContext } from "../../../App";
import Centered from "../../../components/common/Centered";
import FundForm from "../../../components/common/FundForm";
import ResponsiveModal from "../../../components/common/ResponsiveModal";

const CreationAmount = () => {
  const contract = useContext(ContractContext).contract;
  const setProgress = useContext(ProgressContext);
  const [creationAmount, setCreationAmount] = useState();
  const [openModal, setOpenModal] = useState(false);

  const getCreationAmount = async () => {
    const amount = await contract.creationPrice();
    const formatedContribution = ethers.utils.formatUnits(amount);

    console.log("the minimum contribution-----", formatedContribution);
    setCreationAmount(formatedContribution);
  };

  const updateCreationAmount = async (value) => {
    try {
      setOpenModal(false);
      setProgress(true);
      const transaction = await contract.updateCreationPrice(value);
      await transaction.wait();
      await getCreationAmount();
    } catch (error) {
      console.log("Error in update creation amount: ", error);
    } finally {
      setProgress(false);
    }
  };

  useEffect(() => {
    getCreationAmount();
  }, []);

  return (
    <>
      {creationAmount ? (
        <Box textAlign="center">
          <Typography variant="h4">{creationAmount}</Typography>
          <Typography fontSize="20px">Creation Amount (ETH)</Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Change
          </Button>
        </Box>
      ) : (
        <Centered>
          <CircularProgress />
        </Centered>
      )}
      <ResponsiveModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title="Update Creation Amount"
      >
        <FundForm onSubmit={updateCreationAmount} btnName = "Update" />
      </ResponsiveModal>
    </>
  );
};

export default CreationAmount;
