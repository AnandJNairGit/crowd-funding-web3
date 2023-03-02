import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CampaignBanner = ({ id, image, title, description }) => {
  const formattedTitle = title
    .replace(/\b(\w)/g, (match) => match.toUpperCase());

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "16px",
        padding: "32px",
        // overflow: "hidden",
        // background:"red"
      }}
    >
      <Typography variant="h3">{formattedTitle}</Typography>
      <img
        src={image}
        alt={title}
        style={{ width: "100%", maxWidth: "600px" }}
      />
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};

export default CampaignBanner;
