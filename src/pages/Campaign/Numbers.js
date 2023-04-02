import { Box, Typography } from "@mui/material";
import React from "react";
import { ethers } from "ethers";

const weiToEther = (wei) => {
  console.log("the wei is--------->", wei);
  const requiredAmountWei = ethers.BigNumber.from(`${wei}`);
  return ethers.utils.formatEther(requiredAmountWei);
};

const unixTimestampToIST = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};
const Numbers = ({ requiredAmount, raisedAmount, deadline }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        "& > :not(style)": {
          marginY: 5,
        },
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="h4"
          color="#f24e35"
        >
          {weiToEther(requiredAmount)}
        </Typography>
        <Typography>required amount (ETH)</Typography>
      </Box>
      <Box textAlign="center">
        <Typography variant="h4" color="#5af25f">
          {weiToEther(raisedAmount)}
        </Typography>
        <Typography>raised amount (ETH)</Typography>
      </Box>
      <Box textAlign="center">
        <Typography variant="h4" color="#f2a641">
          {unixTimestampToIST(deadline)}
        </Typography>
        <Typography>deadline</Typography>
      </Box>
    </Box>
  );
};

export default Numbers;
