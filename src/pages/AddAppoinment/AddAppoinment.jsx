import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoctorsAvailability } from "../../store/doctorsServices";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { convertISO } from "../../helpers/helper";
import { createAppointment } from "../../store/patientServices";
import {
  openAlert,
  startLoading,
  stopLoading,
} from "../../store/slices/alertSlice";
import { useDispatch } from "react-redux";
import { ERROR, SUCCESS } from "../../components/CustomAlerts/constants";
import { isEmpty } from "lodash";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const AddAppoinment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localizer = momentLocalizer(moment);
  const { id, doctor } = useParams();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);
  const [noSlots, setNoSlots] = useState(false);
  const transformEventData = (data) => {
    return data.map((event) => {
      const { available, doctor_id, number_of_appointments } = event;
      const startDateTime = new Date(`${available}`);
      const endDateTime = new Date(`${available}`);
      endDateTime.setHours(endDateTime.getHours() + 1);

      return {
        id: event.id,
        title: `${number_of_appointments} available`,
        start: startDateTime,
        end: endDateTime,
        available: number_of_appointments,
      };
    });
  };

  useEffect(() => {
    if (doctor) {
      dispatch(startLoading());
      getDoctorsAvailability(doctor)
        .then((res) => {
          dispatch(stopLoading());
          setData(transformEventData(res.data.availabilities));
        })
        .catch(() => {
          dispatch(stopLoading());
        });
    }
  }, [doctor]);

  const handleDateClick = (slotInfo) => {
    if (slotInfo.available < 1) {
      setNoSlots(true);
    } else {
      setSelected({ ...slotInfo });
      setOpen(true);
    }

    console.log("Selected Date:", slotInfo);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const noSlotsClose = () => {
    setNoSlots(false);
  };

  const makeAnAppointment = async () => {
    dispatch(startLoading());
    console.log(selected, "selected");
    const user = JSON.parse(localStorage.getItem("osc-user"));
    const data = {
      diagnose_id: id,
      doctor_id: doctor,
      available_id: selected.id,
      patient_id: user.id,
    };

    await createAppointment(data)
      .then((res) => {
        dispatch(stopLoading());
        dispatch(
          openAlert({
            status: SUCCESS,
            message: "Appointments has been created",
          })
        );

        navigate("/patient/dashboard");
      })
      .catch((error) => {
        dispatch(stopLoading());
        console.log(error, "error");
        dispatch(
          openAlert({
            status: ERROR,
            message: error || "Could not save",
          })
        );
      });
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Make New Appoinment" />
      <CardContent>
        <Stack sx={{ mt: "20px", mb: "20px" }}>
          <Alert severity="info">
            Here is the availability of your chosen health specialist. Choose a
            date that works best for you.
          </Alert>
        </Stack>
        {isEmpty(data) ? (
          <Typography>No data found</Typography>
        ) : (
          <Calendar
            localizer={localizer}
            events={data}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable={true}
            onSelectEvent={handleDateClick}
            min={new Date()}
          />
        )}

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
              <Alert severity="info">
                Would you like to make an appoinment on{" "}
                <b>{convertISO(selected.start)}</b> only{" "}
                <b>{selected.available}</b>
                {""} appoinments available
              </Alert>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                makeAnAppointment();
                handleClose();
              }}
              autoFocus
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={noSlots}
          onClose={noSlotsClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Make an appoinment"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Alert severity="warning">
                No Appoinment left please select another date
              </Alert>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              cancel
            </Button>
            <Button onClick={() => handleClose()} variant="contained" autoFocus>
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
      <CardActions>
        <Stack
          direction={"row"}
          sx={{ width: "100%", justifyContent: "flex-start" }}
        >
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ChevronLeftIcon />}
            variant="outlined"
            sx={{ color: "black" }}
          >
            Back to Doctors
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default AddAppoinment;
