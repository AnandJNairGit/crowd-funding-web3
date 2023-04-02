import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Chip } from "@mui/material";
import { Done } from "@mui/icons-material";
import CampaignActionButton from "./CampaignActionButton";
import { useNavigate } from "react-router-dom";

export default function AdminCampaignTile({
  campaignObj,
  refreshCampaigns,
  action,
  actionBtnName,
}) {
  const { id, title, description, imageUrl } = campaignObj;
  const navigate = useNavigate();

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
        </CardContent>
        <CardActions>
          {actionBtnName ? (
            <CampaignActionButton
              btnName={actionBtnName}
              onClick={action}
              campaignObj={campaignObj}
              refreshCampaigns={refreshCampaigns}
            />
          ) : (
            ""
          )}
          <Button
            onClick={() => {
              navigate(`/campaigns/${id}`, { state: campaignObj });
            }}
          >
            View
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
