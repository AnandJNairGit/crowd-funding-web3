import { Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ContractContext } from "../../App";
import BackdropProgress from "../../components/common/BackdropProgress";
import { getCampaignsMetadata } from "../../helpers/getCampaignsMetadata";
import CampaignBanner from "./CampaignBanner";
import FundCampaign from "./FundCampaign";
import FundersList from "./FundersList";
import Numbers from "./Numbers";

const Campaign = () => {
  const { contract, accountAddress } = useContext(ContractContext);

  const location = useLocation();
  const [campaign, setCampaign] = useState();
  const [funders, setFunders] = useState();

  const { id } = useParams();

  const getCampaignObject = async () => {
    console.log("inside get campaign obj");
    const campaign = await contract.getCampaignById(id);
    const campaignMetadata = await getCampaignsMetadata([campaign]);
    setCampaign(campaignMetadata[0]);
  };

  const getFunders = async () => {
    console.log(campaign);
    const funders = await contract.getCampaignFunders(id);
    let fundersList = [];

    for (let funder = 0; funder < funders.length; funder++) {
      fundersList.push({
        account: funders[funder].account,
        amount: funders[funder].amount.toString(),
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
        recepient={campaign.recepient}
      />

      {accountAddress != campaign.recepient &&
      campaign.approved &&
      !campaign.completed ? (
        <FundCampaign campaignId={id} refresh={getCampaignObject} />
      ) : (
        ""
      )}

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
