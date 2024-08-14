import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const CustomCheck = ({ label = "", doctor }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSelected, setIsSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const onchange = (e) => {
    setIsSelected(e.target.value);
    setOpen(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
    setIsSelected(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Make an appoinment"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Would you like to make an appoinment with {doctor.firstName}
            {doctor.lastName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/patient/addappoinment/${doctor?.id}/${id}`);
              handleClose();
            }}
            autoFocus
          >
            ok
          </Button>
        </DialogActions>
      </Dialog>

      <FormControlLabel
        control={<Checkbox onChange={onchange} value={isSelected} />}
        label={label}
      />
    </>
  );
};

export default CustomCheck;
