import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MicIcon from "@mui/icons-material/Mic";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import StopCircleIcon from "@mui/icons-material/StopCircle";

const Diagnose = (props) => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

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
    stopRecording();
    if (newMediaBlobUrl) {
      setMediaBlobUrl(newMediaBlobUrl);
    }
  }, [newMediaBlobUrl]);

  const uploadRecording = async (blobUrl) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append("file", blob, "recording.mp3");

    try {
      const result = await axios.post("/your-api-endpoint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully", result.data);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    pauseRecording();
    if (mediaBlobUrl) {
      uploadRecording(mediaBlobUrl);
    }
  };

  console.log(mediaBlobUrl, "mediaBlobUrl");

  return (
    <Card variant="outlined">
      <CardHeader title="Diagnose" />
      <CardContent>
        <div>
          <h4
            style={{
              marginLeft: "10px",
              textTransform: "capitalize",
              fontFamily: "sans-serif",
              fontSize: "18px",
            }}
          >
            {status}
          </h4>

          {isActive && (
            <div>
              <video src={mediaBlobUrl} controls loop />
            </div>
          )}

          <Stack direction={"row"} sx={{ justifyContent: "center" }}>
            <IconButton
              onClick={() => {
                if (!isActive) {
                  startRecording();
                } else {
                  pauseRecording();
                  // handleStopRecording();
                }

                setIsActive(!isActive);
              }}
            >
              <MicIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                if (!isActive) {
                  startRecording();
                } else {
                  pauseRecording();
                  // handleStopRecording();
                }

                setIsActive(!isActive);
              }}
            >
              <ClearIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                if (!isActive) {
                  startRecording();
                } else {
                  pauseRecording();
                  // handleStopRecording();
                }

                setIsActive(!isActive);
              }}
            >
              <StopCircleIcon />
            </IconButton>
          </Stack>
        </div>
      </CardContent>
      <CardActionArea></CardActionArea>
    </Card>
  );
};

export default Diagnose;
