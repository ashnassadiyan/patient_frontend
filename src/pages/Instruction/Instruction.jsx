import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Instruction = () => {
  const nativigate = useNavigate();
  const gotoNext = () => {
    nativigate("/patient/diagnose");
  };

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Stack sx={{ gap: "20px" }}>
            <Typography sx={{ m: "10px 0", fontSize: "24px", fontWeight: 600 }}>
              Instructions for Recording Your Symptoms
            </Typography>
            <Grid container sx={{ mt: "20px" }}>
              <Grid md={6} item>
                <img
                  alt="google_logo"
                  className="instrunction"
                  src="/images/instruction.jpg"
                />
              </Grid>
              <Grid md={6} item>
                <Stack sx={{ gap: "10px" }}>
                  <Stack>
                    <Grid container>
                      <Grid item md={4}>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 600,
                            textAlign: "left",
                          }}
                        >
                          Prepare to Record:
                        </Typography>
                      </Grid>
                      <Grid item md={8}>
                        <Typography
                          sx={{ textAlign: "left", fontSize: "14px" }}
                        >
                          Find a quiet place where you won't be interrupted.
                          Make sure you have a stable internet connection and
                          that your device's microphone is working properly.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack>
                    <Grid container>
                      <Grid item md={4}>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 600,
                            textAlign: "left",
                          }}
                        >
                          Time Limit:
                        </Typography>
                      </Grid>
                      <Grid item md={8}>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontSize: "14px",
                            textAlign: "left",
                          }}
                        >
                          Your recording should be no longer than 2 minutes.
                          Please keep an eye on the timer to ensure you stay
                          within this limit.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack>
                    <Grid container>
                      <Grid item md={4}>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 600,
                            textAlign: "left",
                          }}
                        >
                          Focus on Current Symptoms:
                        </Typography>
                      </Grid>
                      <Grid item md={8}>
                        <Typography
                          sx={{ textAlign: "left", fontSize: "14px" }}
                        >
                          Clearly describe the symptoms you are experiencing
                          right now. Include details such as <br />
                          For example, pain, discomfort, dizziness, etc.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack>
                    <Grid container>
                      <Grid item md={4}>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 600,
                            textAlign: "left",
                          }}
                        >
                          Type of Symptom:
                        </Typography>
                      </Grid>
                      <Grid item md={8}>
                        <Typography
                          sx={{ textAlign: "left", fontSize: "14px" }}
                        >
                          For example, pain, discomfort, dizziness, etc.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack>
                    <Grid container>
                      <Grid item md={4}>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 600,
                            textAlign: "left",
                          }}
                        >
                          Location:
                        </Typography>
                      </Grid>
                      <Grid item md={8}>
                        <Typography
                          sx={{ textAlign: "left", fontSize: "14px" }}
                        >
                          Where on your body you are experiencing the symptom.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack>
                    <Grid container>
                      <Grid item md={4}>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 600,
                            textAlign: "left",
                          }}
                        >
                          Review Your Recording:
                        </Typography>
                      </Grid>
                      <Grid item md={8}>
                        <Typography
                          sx={{ textAlign: "left", fontSize: "14px" }}
                        >
                          After recording, listen to it to ensure it is clear
                          and covers all the necessary information. If needed,
                          you can re-record to make it clearer.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack>
                    <Grid container>
                      <Grid item md={4}>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 600,
                            textAlign: "left",
                          }}
                        >
                          Submit:
                        </Typography>
                      </Grid>
                      <Grid item md={8}>
                        <Typography
                          sx={{ textAlign: "left", fontSize: "14px" }}
                        >
                          Once you are satisfied with your recording, submit it
                          as per the instructions provided in the app or
                          platform.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack
            direction={"row"}
            sx={{ width: "100%", justifyContent: "flex-end" }}
          >
            <Button
              onClick={() => gotoNext()}
              variant="outlined"
              sx={{ color: "black" }}
              endIcon={<ChevronRightIcon />}
            >
              Next
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
};

export default Instruction;
