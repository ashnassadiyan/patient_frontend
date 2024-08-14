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
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import CustomCheck from "../../components/CustomCheck/CustomCheck";
import { getDoctors } from "../../store/doctorsServices";
import { startLoading, stopLoading } from "../../store/slices/alertSlice";

const MakeAppoinment = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [doctorsList, setDoctorsList] = useState([]);

  console.log(location, "location");

  useEffect(() => {
    dispatch(startLoading());
    getDoctors({ specialized: location?.state?.doctor })
      .then((res) => {
        dispatch(stopLoading());
        setDoctorsList(res.data.data);
      })
      .catch(() => {
        dispatch(stopLoading());
      });
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
          <Grid item md={12}>
            <Grid container>
              {doctorsList.map((d, index) => (
                <Grid item md={3} key={index}>
                  <CustomCheck
                    label={`${d.firstName} ${d.lastName}`}
                    doctor={d}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default MakeAppoinment;
