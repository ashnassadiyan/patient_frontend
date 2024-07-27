import { createSlice } from "@reduxjs/toolkit";
import { SUCCESS } from "../../components/CustomAlerts/constants";

const initialState = {
  alertOpen: false,
  alertStatus: SUCCESS,
  messages: "",
  loading: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    openAlert: (state, action) => {
      const { status, message } = action.payload;
      state.alertStatus = status;
      state.alertOpen = true;
      state.messages = message;
    },
    closeAlert: (state, action) => {
      state.alertOpen = false;
      state.messages = "";
    },
    startLoading: (state, action) => {
      state.loading = true;
    },
    stopLoading: (state, action) => {
      state.loading = false;
    },
  },
});

export const { openAlert, closeAlert, startLoading, stopLoading } =
  alertSlice.actions;
export default alertSlice.reducer;
