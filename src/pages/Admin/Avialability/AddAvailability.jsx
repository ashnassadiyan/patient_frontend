import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { COZY } from "../../../theme/spacing";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDoctorAvailability } from "../../../store/doctorsServices";
import CardHolder from "../../../components/CardHolder/CardHolder";

const AddAvailability = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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
      return { doctor_id: id, available: a };
    });
    setSelectedDates([...datesRangs]);
  };

  const addAvailability = async () => {
    await addDoctorAvailability(selectedDates)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error, "error");
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
            <TextField onChange={onChange} size="small" type={"number"} />
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
