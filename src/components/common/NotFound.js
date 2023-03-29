import { Box, Typography } from "@mui/material";
import React from "react";
import notFound from "../../assets/notFound.svg";
import Centered from "./Centered";

const NotFound = ({ message }) => {
  return (
    <>
      <Box marginTop="100px">
        <Centered>
          <img src={notFound} alt="My SVG Image" width="350px" />
        </Centered>
        <Centered>
          <Typography marginTop="20px">{message}</Typography>
        </Centered>
      </Box>
    </>
  );
};

export default NotFound;
