import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ContractContext } from "../../App";
import { Avatar, Chip } from "@mui/material";
import { hover } from "@testing-library/user-event/dist/hover";

const drawerWidth = 240;

function NavBar(props) {
  const { isAdmin, hasAdminAccess } =
    React.useContext(ContractContext).contractConfig;
  const navItems =
    isAdmin || hasAdminAccess
      ? ["Home", "Campaigns", "My Campaigns", "Admin"]
      : ["Home", "Campaigns", "My Campaigns"];
  const navRoutes =
    isAdmin || hasAdminAccess
      ? ["", "campaigns", "my-campaigns", "admin"]
      : ["", "campaigns", "my-campaigns", "admin"];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <a
        href="https://github.com/AnandJNairGit/crowd-funding-web3"
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <Chip
          sx={{ cursor: "pointer", my: 2 }}
          avatar={
            <Avatar
              alt="Natacha"
              src="https://pbs.twimg.com/profile_images/1559112808863715328/tbvr9OMS_400x400.jpg"
            />
          }
          label="Crowd Funding"
          variant="filled"
        />
      </a>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                navigate(`/${navRoutes[index]}`);
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background:
            "linear-gradient(90deg, rgba(14,9,110,1) 21%, rgba(108,99,255,1) 59%, rgba(31,192,224,1) 90%)",
          position: "fixed",
          top: 0,
          // zIndex: 1,
          width: "100%",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <a
              href="https://github.com/AnandJNairGit/crowd-funding-web3"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Chip
                sx={{ cursor: "pointer" }}
                avatar={
                  <Avatar
                    alt="Natacha"
                    src="https://pbs.twimg.com/profile_images/1559112808863715328/tbvr9OMS_400x400.jpg"
                  />
                }
                label="Crowd Funding"
                variant="filled"
              />
            </a>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate(`/${navRoutes[index]}`);
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBar;
