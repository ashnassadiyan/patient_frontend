import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { getPatients } from "../../../store/";
import SearchIcon from "@mui/icons-material/Search";
import { getPatients } from "../../../store/patientServices";
import { COZY, UPPER } from "../../../theme/spacing";
import PatientTable from "../../../components/PatientTable/index";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../store/slices/alertSlice";

const AddDoctors = () => {
  const dispatch = useDispatch();
  const [filterFields, setFilterFields] = useState({
    firstName: "",
    lastName: "",
    page: 1,
    total: 1,
  });

  const [patients, setDoctors] = useState([]);

  const getAllPatients = () => {
    dispatch(startLoading());
    getPatients(filterFields)
      .then((res) => {
        dispatch(stopLoading());
        setDoctors(res.data.patients);
        console.log(res.data.patients, "patients");
      })
      .catch(() => {
        dispatch(stopLoading());
      });
  };

  useEffect(() => {
    getAllPatients();
  }, [filterFields.page]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFilterFields((state) => ({
      ...state,
      [name]: value,
      page: 1,
    }));
  };

  const onPageChange = (e, p) => {
    setFilterFields((state) => ({
      ...state,
      page: p,
    }));
  };

  return (
    <Stack sx={{ gap: COZY }}>
      <Stack direction={"row"} sx={{ gap: COZY, mt: UPPER }}>
        <TextField
          placeholder="First Name"
          fullWidth
          onChange={onChange}
          name={"firstName"}
        />
        <TextField
          placeholder="Last Name"
          fullWidth
          onChange={onChange}
          name={"lastName"}
        />
        <Button
          variant="contained"
          onClick={() => getAllPatients()}
          sx={{ minWidth: "150px" }}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Stack>
      <Stack sx={{ mt: UPPER, gap: COZY }}>
        <PatientTable
          data={patients}
          onPageChange={onPageChange}
          getAllPatients={getAllPatients}
        />
        {/* <Stack direction={"row"} sx={{ justifyContent: "flex-end" }}>
          <Pagination
            count={filterFields.page}
            color="secondary"
            onChange={onPageChange}
          />
        </Stack> */}
      </Stack>
    </Stack>
  );
};

export default React.memo(AddDoctors);
