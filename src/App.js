// import { CssBaseline } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Admin from "./pages/admin";
import Campaigns from "./pages/campaigns";
import Home from "./pages/home";
import MyCampaigns from "./pages/myCampaigns";
import getContract from "./services/ethers";
// import Profile from "./pages/Profile";

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
      <ContractContext.Provider
        value={{ contract: contract, updateContract: updateContract }}
      >
        <nav>
          <NavBar />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/my-campaigns" element={<MyCampaigns />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </ContractContext.Provider>
    </>
  );
}

export default App;
