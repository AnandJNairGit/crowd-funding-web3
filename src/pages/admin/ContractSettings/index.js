import { Box, Button, Container, Typography } from "@mui/material";
import React, { createContext, useState } from "react";
import BackdropProgress from "../../../components/common/BackdropProgress";
import Centered from "../../../components/common/Centered";
import MinimumContribution from "./MinimumContribution";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CrowdFunding from "./CrowdFunding";
import CampaignCreation from "./CampaignCreation";
import AdminAccounts from "./adminAccounts";

const AccordionContent = ({ summary, children }) => {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{summary}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </>
  );
};

export const ProgressContext = createContext();
const ContractSettings = () => {
  const [openProgress, setOpenProgress] = useState(false);
  return (
    <>
      <ProgressContext.Provider value={setOpenProgress}>
        <Container sx={{ marginTop: 10 }}>
          <AccordionContent summary="Minimum Contribution">
            <MinimumContribution />
          </AccordionContent>
          <AccordionContent summary="Crowd Funding">
            <CrowdFunding />
          </AccordionContent>
          <AccordionContent summary="Campaign Creation">
            <CampaignCreation />
          </AccordionContent>
          <AccordionContent summary="Admins">
            <AdminAccounts />
          </AccordionContent>
        </Container>
      </ProgressContext.Provider>

      <BackdropProgress open={openProgress} />
    </>
  );
};

export default ContractSettings;
