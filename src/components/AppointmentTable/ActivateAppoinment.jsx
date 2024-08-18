import { IconButton, TableCell } from "@mui/material";
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

const ActivateAppoinment = ({ data, getappointments }) => {
  const { status, patient_id, available_id, diagnose_id, doctor_id, _id } =
    data;
  const dispatch = useDispatch();

  const applyConfirm = async () => {
    dispatch(startLoading());
    const data = {
      appointment_id: _id,
      diagnose_id: diagnose_id,
      doctor_id: doctor_id,
      available_id: available_id,
      patient_id: patient_id,
    };

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
      <IconButton onClick={() => applyConfirm()}>
        <PendingIcon />
      </IconButton>
    </TableCell>
  );
};

export default ActivateAppoinment;
