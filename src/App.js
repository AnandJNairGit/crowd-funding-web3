// import { CssBaseline } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import BackdropProgress from "./components/common/BackdropProgress";
import NavBar from "./components/navBar";
import Admin from "./pages/admin";
import Campaign from "./pages/Campaign";
import Campaigns from "./pages/campaigns";
import Home from "./pages/home";
import MyCampaigns from "./pages/myCampaigns";
import getContract from "./services/ethers";

export const ContractContext = createContext();
function App() {
  const [contract, setContract] = useState();

  const updateContract = async () => {
    setContract(await getContract());
  };
  useEffect(() => {
    updateContract();
  }, []);

  return (
    <>
      {contract ? (
        <ContractContext.Provider
          value={{ contract: contract, updateContract: updateContract }}
        >
          <nav>
            <NavBar />
          </nav>
          <Box height="65px"/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/:id" element={<Campaign />} />
            <Route path="/my-campaigns" element={<MyCampaigns />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </ContractContext.Provider>
      ) : (
        <BackdropProgress open={true} />
      )}
    </>
  );
}

export default App;
