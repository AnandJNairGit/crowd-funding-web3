import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip } from "@mui/material";
import { Done } from "@mui/icons-material";
import ApproveCampaignButton from "./ApproveCampaignButton";

export default function PendingCampaignTile({
  id,
  title,
  description,
  imageUrl,
}) {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt="campaign image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <ApproveCampaignButton campaignTitle={title} campaignId={id} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
