import { Snackbar } from "@mui/base";
import { Alert, Backdrop, Stack } from "@mui/material";
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

  if (!alertOpen) return "";

  return (
    <Stack
      sx={{
        zIndex: 10000,
        p: "10px",
        zIndex: 999999,
        width: "100%",
      }}
    >
      <Stack direction={"row"} sx={{ justifyContent: "center" }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 99 }}
          open={alertOpen}
        >
          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "vertical", horizontal: "horizontal" }}
            sx={{}}
          >
            <Alert
              onClose={handleClose}
              severity={alertStatus}
              variant="filled"
            >
              {messages}
            </Alert>
          </Snackbar>
        </Backdrop>
      </Stack>
    </Stack>
  );
};

export default CustomAlert;
