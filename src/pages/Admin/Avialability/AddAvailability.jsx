import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { COZY } from "../../../theme/spacing";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDoctorAvailability } from "../../../store/doctorsServices";
import CardHolder from "../../../components/CardHolder/CardHolder";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../store/slices/alertSlice";
import { ERROR, SUCCESS } from "../../../components/CustomAlerts/constants";
import { isEmpty } from "lodash";

const AddAvailability = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { firstName, lastName, specialized } = location.state;
  console.log(location.state, "location.state");

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [selectedDates, setSelectedDates] = useState([]);
  const [numberOfAppoinments, setNumberOfAppoinments] = useState(0);
  const getDatesBetween = (startDate, endDate) => {
    const dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateArray.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    let datesRangs = getDatesBetween(
      ranges.selection.startDate,
      ranges.selection.endDate
    );
    datesRangs = datesRangs.map((a) => {
      return {
        doctor_id: id,
        available: a,
        number_of_appointments: numberOfAppoinments,
      };
    });
    setSelectedDates([...datesRangs]);
  };

  const addAvailability = async () => {
    if (isEmpty(selectedDates)) {
      dispatch(
        openAlert({
          status: ERROR,
          message: "Please select a date range",
        })
      );
      return;
    }

    if (numberOfAppoinments <= 0) {
      dispatch(
        openAlert({
          status: ERROR,
          message: "Please add number of Appointments",
        })
      );
      return;
    }

    await addDoctorAvailability(selectedDates)
      .then((res) => {
        dispatch(
          openAlert({
            status: SUCCESS,
            message: "Availability added successfully",
          })
        );
      })
      .catch((error) => {
        dispatch(
          openAlert({
            status: ERROR,
            message: "Something went wrong",
          })
        );
      });
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNumberOfAppoinments(value);
  };
  const cardTitle = `${firstName} ${lastName} : ${specialized}`;

  return (
    <CardHolder title={cardTitle}>
      <Stack>
        <Stack
          sx={{
            gap: COZY,
            justifyContent: "center",
            mt: "30px",
            alignItems: "center",
          }}
        >
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            color="black"
          />

          <Stack
            direction={"row"}
            sx={{
              justifyContent: "center",
              mt: "30px",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <TextField
              label="Number of appointments"
              onChange={onChange}
              size="small"
              type={"number"}
              placeholder={"Number of appointments"}
              value={numberOfAppoinments}
            />
            <Button variant="contained" onClick={() => addAvailability()}>
              Save
            </Button>
          </Stack>
        </Stack>

        <Stack direction={"row"}></Stack>
      </Stack>
    </CardHolder>
  );
};

export default AddAvailability;
