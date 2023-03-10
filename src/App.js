// import { CssBaseline } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import BackdropProgress from "./components/common/BackdropProgress";
import SnackNotification from "./components/common/SnackNotification";
import NavBar from "./components/navBar";
import Admin from "./pages/admin";
import Campaign from "./pages/Campaign";
import Campaigns from "./pages/campaigns";
import Home from "./pages/home";
import MyCampaigns from "./pages/myCampaigns";
import getContract from "./services/ethers";

export const ContractContext = createContext();
export const SnackbarContext = createContext();

function App() {
  const [contract, setContract] = useState();
  const [contractConfig, setContractConfig] = useState();
  const [accountAddress, setAccountAddress] = useState();
  const snackbarInitialProps = {
    open: false,
    message: "",
    type: "info",
  };
  const [snackbarProps, setSnackbarProps] = useState(snackbarInitialProps);
  const onSnackbarClose = () => {
    setSnackbarProps(snackbarInitialProps);
  };

  const updateContract = async () => {
    const { contract, accountAddress,contractConfig } = await getContract();

    console.log(contract, accountAddress);

    setContract(contract);
    setAccountAddress(accountAddress);
    setContractConfig(contractConfig)
  };
  useEffect(() => {
    updateContract();
  }, []);

  return (
    <>
      {contract && accountAddress && contractConfig ? (
        <SnackbarContext.Provider value={setSnackbarProps}>
          <ContractContext.Provider
            value={{
              contract: contract,
              updateContract: updateContract,
              accountAddress: accountAddress,
              contractConfig: contractConfig
            }}
          >
            <nav>
              <NavBar />
            </nav>
            <Box height="65px" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaigns/:id" element={<Campaign />} />
              <Route path="/my-campaigns" element={<MyCampaigns />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </ContractContext.Provider>
        </SnackbarContext.Provider>
      ) : (
        <BackdropProgress open={true} />
      )}
      <SnackNotification {...snackbarProps} handleClose={onSnackbarClose} />
    </>
  );
}

export default App;
