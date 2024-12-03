import {
  IconButton,
  Menu,
  TableCell,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { confirmAppointment } from "../../store/patientServices";
import { useDispatch } from "react-redux";
import {
  openAlert,
  startLoading,
  stopLoading,
} from "../../store/slices/alertSlice";
import { ERROR, SUCCESS } from "../CustomAlerts/constants";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

const ActivateAppoinment = ({ data, getappointments, isAdmin }) => {
  const {
    status,
    patient_id,
    available_id,
    diagnose_id,
    doctor_id,
    _id,
    confirmed_by,
  } = data;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const applyConfirm = async (confirmationStatus) => {
    const userType = JSON.parse(localStorage.getItem("osc-user"))?.id;

    const data = {
      appointment_id: _id,
      diagnose_id: diagnose_id,
      doctor_id: doctor_id,
      available_id: available_id,
      patient_id: patient_id,
      confirmationStatus: confirmationStatus,
      confirmed_by: userType,
    };

    dispatch(startLoading());

    await confirmAppointment(data)
      .then((res) => {
        console.log(res.data.message);
        dispatch(stopLoading());
        dispatch(
          openAlert({
            status: SUCCESS,
            message: res?.data?.message,
          })
        );
        getappointments();
      })
      .catch((error) => {
        console.log(error, "error");
        dispatch(stopLoading());
        dispatch(
          openAlert({
            status: ERROR,
            message: error?.response?.data?.detail || "something went wrong",
          })
        );
      });
  };

  return (
    <TableCell align="right">
      {isAdmin ? (
        <>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            disabled={status || confirmed_by}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {confirmed_by ? (
              <>
                {status ? (
                  <MenuItem>Activated</MenuItem>
                ) : (
                  <MenuItem>Cancelled</MenuItem>
                )}
              </>
            ) : (
              [
                <MenuItem
                  onClick={() => {
                    applyConfirm(true);
                  }}
                >
                  Activate
                </MenuItem>,
                <MenuItem
                  onClick={() => {
                    applyConfirm(false);
                  }}
                >
                  Cancel
                </MenuItem>,
              ]
            )}
          </Menu>
        </>
      ) : status ? (
        <Typography>Activated</Typography>
      ) : confirmed_by ? (
        <Typography>Cancelled</Typography>
      ) : (
        <Tooltip title="Cancel the Appointment">
          <IconButton
            onClick={() => {
              applyConfirm(false);
            }}
          >
            <DoNotDisturbOnIcon />
          </IconButton>
        </Tooltip>
      )}
    </TableCell>
  );
};

export default ActivateAppoinment;
