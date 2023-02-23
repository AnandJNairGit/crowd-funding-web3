// import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Link,Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Admin from "./pages/admin";
import Campaigns from "./pages/campaigns";
import Home from "./pages/home";
import MyCampaigns from "./pages/myCampaigns";
// import Profile from "./pages/Profile";

function App() {
  return (
    
    <>

    {/* <Navbar/> */}
    <nav>
      <NavBar/>
    </nav>
    <Routes>
    <Route path="/" element = {<Home/>}/>
    <Route path="/campaigns" element={<Campaigns/>}/>
    <Route path="/my-campaigns" element={<MyCampaigns/>}/>
    <Route path="/admin" element={<Admin/>}/>


    {/* <Route path="/Create" element={<Create/>} /> */}
    {/* <Route path="/Profile" element={<Profile/>} /> */}
  </Routes>
    </>
  );
}

export default App;
