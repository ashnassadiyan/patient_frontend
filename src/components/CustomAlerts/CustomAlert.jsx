import { Snackbar } from "@mui/base";
import { Alert, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "../../store/slices/alertSlice";

const CustomAlert = () => {
  const { alertOpen, alertStatus, messages } = useSelector(
    (state) => state.alertStore
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAlert());
  };

  return (
    <Stack sx={{ zIndex: 10000, mt: "10px", p: "10px", zIndex: 999999 }}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "vertical", horizontal: "horizontal" }}
      >
        <Alert onClose={handleClose} severity={alertStatus} variant="filled">
          {messages}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomAlert;
