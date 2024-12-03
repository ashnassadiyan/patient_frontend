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

  useEffect(() => {
    dispatch(startLoading());
    getDoctors({
      specialized: decodeURIComponent(location?.state?.doctor)?.replace(
        /\s+/g,
        ""
      ),
    })
      .then((res) => {
        dispatch(stopLoading());
        setDoctorsList(res.data.data);
      })
      .catch(() => {
        dispatch(stopLoading());
      });
  }, [location.state]);

  console.log(location?.state?.doctor);

  return (
    <Card variant="outlined">
      <CardHeader title="Make an Appointment" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Stack direction={"row"} sx={{ justifyContent: "center" }}>
              <Typography sx={{ color: "gray" }}>
                {`Select the doctor you would like to meet for a consultation by clicking the checkbox ${location?.state?.doctor}`}
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={12}>
            <Grid container>
              {doctorsList.map((d, index) => (
                <Grid item md={3} sm={6} xs={6} key={index}>
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
