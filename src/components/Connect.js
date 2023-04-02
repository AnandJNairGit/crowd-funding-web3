import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Connect = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      // Metamask is installed
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            // User is connected
            setIsConnected(true);
          } else {
            setIsConnected(false);
          }
        })
        .catch((err) => console.log(err));

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setIsConnected(true);
          window.location.reload();
        } else {
          setIsConnected(false);
        }
      });
    }
  }, []);

  const handleConnect = () => {
    window.ethereum.request({ method: "eth_requestAccounts" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        background:
          "linear-gradient(90deg, rgba(14,9,110,1) 21%, rgba(108,99,255,1) 59%, rgba(31,192,224,1) 90%)",
      }}
    >
      {isConnected ? (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            You are connected to Metamask, Please wait...
          </Typography>
          <CircularProgress />
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Please connect to Metamask
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleConnect}>
            Connect to Metamask
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Connect;
