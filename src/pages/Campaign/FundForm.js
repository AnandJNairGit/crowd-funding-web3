import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { ethers } from "ethers";
import React, { useState } from "react";

const FundForm = ({ onSubmit }) => {
  const [fund, setFund] = useState(100);
  const [unit, setUnit] = useState(0);
  const submit = async () => {
    console.log("inside submit");
    const value = unit === 0 ? fund : ethers.utils.parseEther(fund.toString());
    console.log(value);
    await onSubmit(value);
  };

  return (
    <>
      <Box margin="5px">
        <TextField
          label="Fund"
          value={fund}
          onChange={(event) => {
            setFund(event.target.value);
          }}
        />
        <Box marginTop="6px"></Box>
        <Select
          width="20px"
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          fullWidth
          value={unit}
          label="unit"
          onChange={(e) => {
            console.log("the unit ------------->", e.target.value);
            setUnit(e.target.value);
          }}
        >
          <MenuItem value={0}>Wei</MenuItem>
          <MenuItem value={1}>Ether</MenuItem>
        </Select>
        <Button sx={{ marginTop: 2 }} variant="contained" onClick={submit}>
          fund
        </Button>
      </Box>
    </>
  );
};

export default FundForm;
