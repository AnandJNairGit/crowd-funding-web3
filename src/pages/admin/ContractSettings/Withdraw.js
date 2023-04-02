import { Button, CircularProgress, Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { ProgressContext } from ".";
import { ContractContext, SnackbarContext } from "../../../App";

const Withdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState();
  const { contract } = useContext(ContractContext);
  const setProgress = useContext(ProgressContext);
  const setSnackbarProps = useContext(SnackbarContext);
  const getWithdrawAmount = async () => {
    const amount = await contract.raisedCreationAmount();
    const formatedAmount = ethers.utils.formatUnits(amount);

    console.log("the amount is---------->", amount);
    setWithdrawAmount(formatedAmount);
  };

  const withdraw = async () => {
    if (withdrawAmount > 0) {
      try {
        setProgress(true);
        const transaction = await contract.withdrawCreationAmount();
        await transaction.wait();
        await getWithdrawAmount();
        setSnackbarProps({
          open: true,
          message: "Amount Withdrawal Successfull",
          type: "success",
        });
      } catch (error) {
        setSnackbarProps({
          open: true,
          message: "Amount Withdrawal Unsuccessfull",
          type: "error",
        });
        console.log("withdrawl error");
      } finally {
        setProgress(false);
      }
    } else {
      setSnackbarProps({
        open: true,
        message: "No creation amount  raised yet",
        type: "info",
      });
    }
  };

  useEffect(() => {
    getWithdrawAmount();
  }, []);

  return (
    <>
      {withdrawAmount ? (
        <>
          <Button variant="contained" onClick={withdraw}>
            Withdraw
          </Button>
          <Typography marginTop="5px">{withdrawAmount + " ETH"}</Typography>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Withdraw;
