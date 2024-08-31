import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import "./Diagnose.css";
import http from "../../http/http";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDispatch } from "react-redux";
import {
  openAlert,
  startLoading,
  stopLoading,
} from "../../store/slices/alertSlice";
import { ERROR, SUCCESS } from "../../components/CustomAlerts/constants";
import { isEmpty } from "lodash";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

const Diagnose = (props) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const nativigate = useNavigate();

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl: newMediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
    onStop: (blobUrl) => setMediaBlobUrl(blobUrl),
  });

  useEffect(() => {
    if (newMediaBlobUrl) {
      setMediaBlobUrl(newMediaBlobUrl);
    }
  }, [newMediaBlobUrl]);

  const uploadRecording = async (blobUrl) => {
    const user = JSON.parse(localStorage.getItem("osc-user"));
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append("file", blob, `${user.id}_recording.mp3`);

    try {
      const result = await http.post("patient/upload_audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(stopLoading());
      dispatch(openAlert({ status: SUCCESS, message: "Successfully updated" }));
      const getSymptomsOnly = JSON.parse(result.data.transcribed).filter(
        (s) =>
          s.entity_group === "SIGN_SYMPTOM" ||
          s.entity_group === "HISTORY" ||
          s.entity_group === "DETAILED_DESCRIPTION"
      );
      console.log(getSymptomsOnly, "getSymptomsOnly");
      setSymptoms([...getSymptomsOnly]);
      if (getSymptomsOnly.length > 0) gotoNext(getSymptomsOnly);
    } catch (error) {
      dispatch(stopLoading());
      dispatch(openAlert({ status: ERROR, message: "Something went wrong" }));
    }
  };

  console.log(symptoms, "symptoms");

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleMicButtonClick = () => {
    if (status !== "recording") {
      startRecording();
    } else {
      pauseRecording();
    }
    setIsActive(!isActive);
  };

  const handleClearRecording = () => {
    stopRecording();
    setMediaBlobUrl(null);
    setIsActive(false);
  };

  const gotoNext = (newSymptoms) => {
    nativigate("/patient/symptoms", { state: newSymptoms });
  };

  const gotoInstruction = () => {
    nativigate("/patient/instruction");
  };

  const getText =
    status === "idle" ? "Click the mic icon to start the recording" : status;

  return (
    <Card sx={{ borderRadius: "12px", boxShadow: "none" }}>
      <CardContent>
        <Typography sx={{ m: "10px 0", fontSize: "24px", fontWeight: 600 }}>
          Describe your symptoms
        </Typography>
        <Grid container>
          <Grid item md={6} sm={12} xs={12}>
            <img
              alt="google_logo"
              className="instrunction"
              src="/images/recording.jpg"
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Stack
              sx={{
                alignItems: "center",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Typography sx={{ fontSize: "20px", mt: "20px" }}>
                Ready to take the next step to feeling better?
              </Typography>

              <Stack sx={{ padding: "5px", mt: "20px" }}>
                <Typography
                  sx={{ textAlign: "left", color: "gray", color: "15px" }}
                >
                  Instructions:
                </Typography>
                <Stack sx={{ padding: "10px" }}>
                  <ol style={{ gap: "10px" }}>
                    <li
                      style={{
                        padding: "10px",
                        color: "gray",
                        fontSize: "14px",
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "gray",
                          fontSize: "14px",
                        }}
                      >
                        When you’re ready, click the mic button to start
                        recording your symptoms. Remember to speak clearly and
                        describe your symptoms as best as you can. Take your
                        time – there’s no rush.
                      </Typography>
                    </li>
                    <li
                      style={{
                        padding: "10px",
                        color: "gray",
                        fontSize: "14px",
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "gray",
                          fontSize: "14px",
                        }}
                      >
                        When you’re done, click the “Stop” button to end the
                        recording.
                      </Typography>
                    </li>
                    <li
                      style={{
                        padding: "10px",
                        color: "gray",
                        fontSize: "14px",
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "gray",
                          fontSize: "14px",
                        }}
                      >
                        Before you upload your recording, you have the chance to
                        play back and listen to it – simply click the “Playback”
                        button. If you’re satisfied with the audio clip, you can
                        click “Upload”. If not, you can record your symptoms
                        again by following the same process.
                      </Typography>
                    </li>
                  </ol>
                </Stack>
              </Stack>

              <Typography sx={{ fontSize: "15px" }}>
                <b> *Remember</b> – you have to click “Upload” when you are
                ready to submit the recording.
              </Typography>

              <h4
                style={{
                  marginLeft: "10px",
                  textTransform: "capitalize",
                  fontFamily: "sans-serif",
                  fontSize: "18px",
                }}
              >
                {getText}
              </h4>

              <Stack
                direction={"row"}
                sx={{ justifyContent: "center", gap: "10px" }}
              >
                <Tooltip
                  title={
                    status === "recording"
                      ? "Recording in progress"
                      : "Click here to start recording "
                  }
                >
                  <IconButton
                    className={status === "recording" ? "glowingRed" : ""}
                    onClick={handleMicButtonClick}
                  >
                    <MicIcon />
                  </IconButton>
                </Tooltip>

                {["paused", "recording"].includes(status) && (
                  <Tooltip title="Click here to clear the recording ">
                    <IconButton onClick={handleClearRecording}>
                      <ClearIcon color="error" />
                    </IconButton>
                  </Tooltip>
                )}

                {["paused", "recording"].includes(status) && (
                  <Tooltip title="Click here to stop the recording ">
                    <IconButton onClick={handleStopRecording}>
                      <StopCircleIcon color="warning" />
                    </IconButton>
                  </Tooltip>
                )}

                {["stopped"].includes(status) && (
                  <Tooltip title="Click here to upload the recorded audio ">
                    <IconButton
                      onClick={() => {
                        dispatch(startLoading());
                        setTimeout(() => {
                          if (mediaBlobUrl) {
                            uploadRecording(mediaBlobUrl);
                          }
                        }, 5000);
                      }}
                    >
                      <FileUploadIcon color="success" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>

              <Stack sx={{ mt: "10px" }}>
                {["paused", "stopped"].includes(status) && mediaBlobUrl && (
                  <div>
                    <audio src={mediaBlobUrl} controls />
                  </div>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Stack
          direction={"row"}
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <Button
            onClick={() => gotoInstruction()}
            variant="outlined"
            sx={{ color: "black" }}
            startIcon={<ChevronLeftIcon />}
          >
            Instructions
          </Button>
          <Button
            onClick={() => gotoNext()}
            variant="outlined"
            sx={{ color: "black" }}
            endIcon={<ChevronRightIcon />}
            disabled={isEmpty(symptoms)}
          >
            Next
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Diagnose;
