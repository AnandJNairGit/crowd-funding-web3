import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { truncate } from "../../helpers/string";
import { useNavigate } from "react-router-dom";

export default function CampaignTile({ campaignObj }) {
  const { id, imageUrl, title, description } = campaignObj;
  const navigate = useNavigate();
  const navigateToCampaign = () => {
    navigate(`/campaigns/${id}`, { state: campaignObj });
  };

  return (
    <Card sx={{ width: 350, height: 320, margin: 5 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncate(description, 100)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={navigateToCampaign}>
          View
        </Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
