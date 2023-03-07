import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { ProgressContext } from ".";
import { ContractContext } from "../../../App";
import Centered from "../../../components/common/Centered";
import FundForm from "../../../components/common/FundForm";
import ResponsiveModal from "../../../components/common/ResponsiveModal";

const MinimumContribution = () => {
  const contract = useContext(ContractContext).contract;
  const setProgress = useContext(ProgressContext);
  const [minimumContribution, setMinimumContribution] = useState();
  const [openModal, setOpenModal] = useState(false);

  const getMinimumContribution = async () => {
    const contribution = await contract.minimumContribution();
    const formatedContribution = ethers.utils.formatUnits(contribution);

    console.log("the minimum contribution-----", formatedContribution);
    setMinimumContribution(formatedContribution);
  };

  const updateMinimumContribution = async (value) => {
    try {
      setOpenModal(false);
      setProgress(true);
      const transaction = await contract.updateMinimumContribution(value);
      await transaction.wait();
      await getMinimumContribution();
    } catch (error) {
      console.log("Error in update mininum contribution: ", error);
    } finally {
      setProgress(false);
    }
  };

  useEffect(() => {
    getMinimumContribution();
  }, []);

  return (
    <>
      {minimumContribution ? (
        <Box textAlign="center">
          <Typography variant="h4">{minimumContribution}</Typography>
          <Typography fontSize="20px">Minimum Contribution (ETH)</Typography>
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
        title="Update Minimum Contribution"
      >
        <FundForm onSubmit={updateMinimumContribution} />
      </ResponsiveModal>
    </>
  );
};

export default MinimumContribution;
