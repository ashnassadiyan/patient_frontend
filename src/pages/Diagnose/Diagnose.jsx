import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Diagnose = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        audioChunks.current = [];
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const uploadAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.wav");

      try {
        const response = await axios.post("YOUR_UPLOAD_URL", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Upload successful", response.data);
      } catch (error) {
        console.error("Error uploading file", error);
      }
    }
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Diagnose" />
      <CardContent>
        <Stack
          direction={"row"}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <IconButton className="circle">
            <MicIcon />
          </IconButton>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack>
          <Button
            startIcon={<ChevronLeftIcon />}
            // onClick={() => navigate(-1)}
            variant="outlined"
            sx={{ color: "black" }}
          >
            BacK
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Diagnose;
