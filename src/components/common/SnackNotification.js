import { Alert, Slide, Snackbar } from "@mui/material";
const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const SnackNotification = ({ open, message, type, handleClose }) => {
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    handleClose();
  };

  return (
    <Snackbar
      open={open}
      onClose={handleSnackbarClose}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackNotification;
