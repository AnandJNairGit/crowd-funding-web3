import React, { useState } from "react";
import Filter from "./Filter";
import PendingCampaigns from "./PendingCampaigns";
import RefundableCampaigns from "./RefundableCampaigns";
import CompletedCampaigns from "./CompletedCampaigns";

const CampaignActions = () => {
  const [filter, setFilter] = useState(0);
  const onFilterChange = (value) => {
    console.log(value);
    setFilter(value);
  };

  return (
    <>
      <Filter onChange={onFilterChange} />
      {filter == 0 ? (
        <PendingCampaigns />
      ) : filter == 1 ? (
        <CompletedCampaigns />
      ) : (
        <RefundableCampaigns />
      )}
    </>
  );
};

export default CampaignActions;
