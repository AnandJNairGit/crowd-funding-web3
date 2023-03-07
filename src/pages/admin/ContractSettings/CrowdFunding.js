import { Switch, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { ContractContext } from "../../../App";
import Centered from "../../../components/common/Centered";

const CrowdFunding = () => {
  const [cFStatus, setCFStatus] = React.useState(false);
  const contract = useContext(ContractContext).contract;

  const getCrowdFundingStatus = async () => {
    const status = await contract.AllowCrowdFunding();
    console.log("status----------->", status);
    setCFStatus(status)
  };

  useEffect(() => {
    getCrowdFundingStatus();
  }, []);

  const handleChange = (event) => {
    setCFStatus(event.target.checked);
    console.log(event.target.checked);
  };
  return (
    <Centered>
      <Switch
        checked={cFStatus}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography>Crowd Funding Enabled</Typography>
    </Centered>
  );
};

export default CrowdFunding;
