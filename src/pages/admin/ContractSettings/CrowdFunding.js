import { Switch, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { ProgressContext } from ".";
import { ContractContext } from "../../../App";
import Centered from "../../../components/common/Centered";

const CrowdFunding = () => {
  const [cFStatus, setCFStatus] = React.useState(false);
  const contract = useContext(ContractContext).contract;
  const setProgress = useContext(ProgressContext);

  const getCrowdFundingStatus = async () => {
    const status = await contract.AllowCrowdFunding();
    setCFStatus(status);
  };

  const updateCrowdFundingStatus = async (event) => {
    try {
      setCFStatus(event.target.checked);
      setProgress(true);
      const transaction = await contract.updateCrowdFundingStatus(
        event.target.checked
      );
      await transaction.wait();
    } catch (error) {
      console.log("update funding status error---------------->", error);
    } finally {
      await getCrowdFundingStatus();
      setProgress(false);
    }
  };

  useEffect(() => {
    getCrowdFundingStatus();
  }, []);

  return (
    <Centered>
      <Switch
        checked={cFStatus}
        onChange={updateCrowdFundingStatus}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography>
        {cFStatus ? "Crowd Funding Enabled" : "Crowd Funding Disabled"}
      </Typography>
    </Centered>
  );
};

export default CrowdFunding;
