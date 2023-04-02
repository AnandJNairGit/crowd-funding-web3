import { Person } from "@mui/icons-material";
import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CampaignBanner = ({ id, image, title, description,recepient }) => {
  const formattedTitle = title.replace(/\b(\w)/g, (match) =>
    match.toUpperCase()
  );

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
      <Chip
        sx={{ marginTop: 1 }}
        icon={<Person />}
        label={recepient}
        color="default"
      />
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};

export default CampaignBanner;
