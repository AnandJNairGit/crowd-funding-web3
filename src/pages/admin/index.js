import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import CampaignActions from "./campaignAction/CampaignActions";
import ContractSettings from "./ContractSettings/ContractSettings";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "#0f0802", marginTop: "1px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="fullWidth"
        >
          <Tab label="Campaigns Actions" />
          <Tab label="Contract Settings" />
        </Tabs>
      </Box>
      {value==0?<CampaignActions/>:<ContractSettings />}
    </>
  );
}
