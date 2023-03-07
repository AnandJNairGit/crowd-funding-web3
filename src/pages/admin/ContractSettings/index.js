import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { createContext, useState } from "react";
import BackdropProgress from "../../../components/common/BackdropProgress";
import Centered from "../../../components/common/Centered";
import MinimumContribution from "./MinimumContribution";

export const ProgressContext = createContext();
const ContractSettings = () => {
  const [openProgress, setOpenProgress] = useState(false);
  return (
    <>
      <ProgressContext.Provider value={setOpenProgress}>
        <Container>
          <MinimumContribution />
        </Container>
      </ProgressContext.Provider>

      <BackdropProgress open={openProgress} />
    </>
  );
};

export default ContractSettings;
