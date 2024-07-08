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

  console.log(alertOpen, "alertOpen");

  return (
    <Stack sx={{ zIndex: 10000, mt: "10px", p: "10px" }}>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertStatus}
          variant="filled"
          //   sx={{ width: "100%" }}
        >
          {messages}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomAlert;
