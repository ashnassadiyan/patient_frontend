import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getDoctorAvailability } from "../../../store/doctorsServices";
import { COZY } from "../../../theme/spacing";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import CardHolder from "../../../components/CardHolder/CardHolder";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../store/slices/alertSlice";

const localizer = momentLocalizer(moment);

const DoctorAvialability = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { firstName, lastName, specialized } = location.state;
  const [data, setData] = useState([]);

  const transformEventData = (data) => {
    return data.map((event) => {
      const { available, doctor_id, id, number_of_appointments } = event;
      const startDateTime = new Date(`${available}`);
      const endDateTime = new Date(`${available}`);
      endDateTime.setHours(endDateTime.getHours() + 1);

      return {
        id,
        title: `available ${number_of_appointments || doctor_id}`,
        start: startDateTime,
        end: endDateTime,
      };
    });
  };

  useEffect(() => {
    dispatch(startLoading());
    getDoctorAvailability(id)
      .then((res) => {
        dispatch(stopLoading());
        setData(transformEventData(res.data.availabilities));
      })
      .catch(() => {
        dispatch(stopLoading());
      });
  }, [id]);

  const title = `${firstName} ${lastName} : ${specialized}`;

  return (
    <CardHolder title={title}>
      <Stack>
        <Stack direction={"row"} sx={{ justifyContent: "flex-end" }}>
          <Button
            onClick={() =>
              navigate(`/admin/doctors/availability/add/${id}`, {
                state: { ...location.state },
              })
            }
            variant="contained"
          >
            Add New
          </Button>
        </Stack>
        <Stack sx={{ mt: "20px" }}>
          <Calendar
            localizer={localizer}
            events={data}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </Stack>
      </Stack>
    </CardHolder>
  );
};

export default DoctorAvialability;
