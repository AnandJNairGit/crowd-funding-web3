import { Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ContractContext } from "../../App";
import BackdropProgress from "../../components/common/BackdropProgress";
import FloatingButton from "../../components/common/FloatingButton";
import { getCampaignsMetadata } from "../../helpers/getCampaignsMetadata";
import CampaignBanner from "./CampaignBanner";
import FundCampaign from "./FundCampaign";
import FundersList from "./FundersList";
import Numbers from "./Numbers";

const Campaign = () => {
  const contract = useContext(ContractContext).contract;
  const location = useLocation();
  const [campaign, setCampaign] = useState();
  const [funders, setFunders] = useState();

  const { id } = useParams();

  const getCampaignObject = async () => {
    const campaign = await contract.getOnGoingCampaignById(id);
    const campaignMetadata = await getCampaignsMetadata([campaign]);
    setCampaign(campaignMetadata[0]);
  };

  const getFunders = async () => {
    console.log(campaign);
    const funders = await contract.getCampaignFunders(id);
    let fundersList = [];
    // console.log("the funders are ----------->", funders[0]);
    for (let funder = 0; funder < funders.length; funder++) {
      fundersList.push({
        account: funders[funder].account,
        amount: funders[funder].amount.toNumber(),
      });
    }
    setFunders(fundersList);
    // console.log("the funders are ----------->", funders[0]);
  };

  useEffect(() => {
    if (location.state) {
      setCampaign(location.state);
    } else {
      getCampaignObject();
    }
  }, []);

  useEffect(() => {
    getFunders();
  }, [campaign]);

  return campaign ? (
    <Container>
      <CampaignBanner
        image={campaign.imageUrl}
        title={campaign.title}
        description={campaign.description}
      />
      <FundCampaign campaignId={id} />
      <Numbers
        requiredAmount={campaign.requiredFund}
        raisedAmount={campaign.raisedAmount}
        deadline={campaign.deadline}
      />
      {funders ? <FundersList funders={funders} /> : ""}
    </Container>
  ) : (
    <BackdropProgress open={true} />
  );
};

export default Campaign;
