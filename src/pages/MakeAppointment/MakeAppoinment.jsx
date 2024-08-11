import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDoctors } from "../../store/doctorsServices";

const MakeAppoinment = () => {
  const location = useLocation();
  const [doctorsList, setDoctorsList] = useState([]);

  console.log(location, "location");

  useEffect(() => {
    getDoctors({ specialized: location?.state?.doctor })
      .then((res) => {
        setDoctorsList(res.data.data);
      })
      .catch(() => {});
  }, [location.state]);

  return (
    <Card variant="outlined">
      <CardHeader title="Make New Appoinment" />
      <CardContent>
        <Grid container>
          <Grid item md={12}>
            <Stack direction={"row"} sx={{ justifyContent: "flex-start" }}>
              <Typography sx={{ fontWeight: 600 }}>
                {`specialized Doctors for ${location?.state?.doctor}`}
              </Typography>
            </Stack>
          </Grid>
          {doctorsList.map((d, index) => (
            <Grid item md={3} key={index}>
              {d.firstName}
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default MakeAppoinment;
