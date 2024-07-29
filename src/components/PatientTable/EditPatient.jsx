import { IconButton, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { deletePatients } from "../../store/patientServices";
import { useDispatch } from "react-redux";
import { openAlert } from "../../store/slices/alertSlice";
import { SUCCESS } from "../CustomAlerts/constants";

const EditPatient = ({ getAllPatients, data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePatient = () => {
    deletePatients(data.id)
      .then((res) => {
        getAllPatients();
        dispatch(
          openAlert({
            status: SUCCESS,
            message: "Patient has been deleted",
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <EditIcon />
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
        <MenuItem onClick={deletePatient}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default EditPatient;
