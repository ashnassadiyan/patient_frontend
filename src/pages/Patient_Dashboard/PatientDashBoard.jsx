import { Box, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDo } from "../../store/slices/todoSlice";

const PatientDashBoard = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(state, "state");
  return (
    <Box>
      PatientDashBoard
      <Button
        onClick={() => {
          dispatch(addToDo("asdhnaz"));
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default PatientDashBoard;
