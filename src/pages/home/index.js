import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" sx={{ mb: 4 }}>
        Welcome to our Crowd Funding Platform
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 8 }}>
        Join the Future of Crowd Funding with our Web3 daap Platform.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/campaigns");
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default Home;
