import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";

const SnackNotification = ({ open, handleClose, message, type }) => {
  const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />;
  };
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={60000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      TransitionComponent={SlideTransition}
      key={SlideTransition.name}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackNotification;
