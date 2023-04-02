import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import OnGoingCampaigns from "./OngoingCampaigns";
import CompletedCampaigns from "./CompletedCampaigns";

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
          <Tab label="On Going Campaigns" />
          <Tab label="Completed Campaigns" />
        </Tabs>
      </Box>
      {value == 0 ? <OnGoingCampaigns /> : <CompletedCampaigns />}
    </>
  );
}
