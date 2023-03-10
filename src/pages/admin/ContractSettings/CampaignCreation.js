import { Switch, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { ProgressContext } from ".";
import { ContractContext } from "../../../App";
import Centered from "../../../components/common/Centered";

const CampaignCreation = () => {
  const [cCStatus, setCCStatus] = React.useState(false);
  const contract = useContext(ContractContext).contract;
  const setProgress = useContext(ProgressContext);

  const getCampaignCreationStatus = async () => {
    const status = await contract.AllowCampaignCreation();
    setCCStatus(status);
  };

  const updateCampaignCreationStatus = async (event) => {
    try {
      setCCStatus(event.target.checked);
      setProgress(true);
      const transaction = await contract.updateCampaignCreationStatus(
        event.target.checked
      );
      await transaction.wait();
    } catch (error) {
      console.log(
        "update campaign cretion  status error---------------->",
        error
      );
    } finally {
      await getCampaignCreationStatus();
      setProgress(false);
    }
  };

  useEffect(() => {
    getCampaignCreationStatus();
  }, []);

  return (
    <Centered>
      <Switch
        checked={cCStatus}
        onChange={updateCampaignCreationStatus}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography>
        {cCStatus ? "Campaign Creation Enabled" : "Campaign Creation Disabled"}
      </Typography>
    </Centered>
  );
};

export default CampaignCreation;
