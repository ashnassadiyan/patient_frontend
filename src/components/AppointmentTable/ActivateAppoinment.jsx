import { IconButton, TableCell, Typography } from "@mui/material";
import React from "react";
import PendingIcon from "@mui/icons-material/Pending";
import { confirmAppointment } from "../../store/patientServices";
import { useDispatch } from "react-redux";
import {
  openAlert,
  startLoading,
  stopLoading,
} from "../../store/slices/alertSlice";
import { ERROR, SUCCESS } from "../CustomAlerts/constants";
import CloseIcon from "@mui/icons-material/Close";

const ActivateAppoinment = ({ data, getappointments, isAdmin }) => {
  const { status, patient_id, available_id, diagnose_id, doctor_id, _id } =
    data;
  const dispatch = useDispatch();

  const applyConfirm = async () => {
    const data = {
      appointment_id: _id,
      diagnose_id: diagnose_id,
      doctor_id: doctor_id,
      available_id: available_id,
      patient_id: patient_id,
    };

    dispatch(startLoading());

    if (status) {
      dispatch(
        openAlert({
          status: ERROR,
          message: "cannot activate again",
        })
      );

      return;
    }

    await confirmAppointment(data)
      .then(() => {
        dispatch(stopLoading());
        dispatch(
          openAlert({
            status: SUCCESS,
            message: "Appointment has been confirmed",
          })
        );
        getappointments();
      })
      .catch((error) => {
        console.log(error.response.data.detail);
        dispatch(stopLoading());
        dispatch(
          openAlert({
            status: ERROR,
            message: error.response.data.detail || "something went wrong",
          })
        );
      });
  };

  return (
    <TableCell align="right">
      {isAdmin ? (
        <IconButton onClick={() => applyConfirm()}>
          <PendingIcon />
        </IconButton>
      ) : status === false ? (
        <IconButton onClick={() => applyConfirm()}>
          <CloseIcon />
        </IconButton>
      ) : (
        <Typography>Activated</Typography>
      )}
    </TableCell>
  );
};

export default ActivateAppoinment;
