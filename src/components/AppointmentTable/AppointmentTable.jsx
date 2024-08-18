import React from "react";
import { formatDateToYYYYMMDDHHMM } from "../../helpers/helper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import ActivateAppoinment from "./ActivateAppoinment";

const AppointmentTable = ({ data, getappointments }) => {
  const userType = JSON.parse(localStorage.getItem("osc-user"))?.userType;
  const isAdmin = userType === "admin";
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Appoinments</caption>
        <TableHead>
          <TableRow>
            <TableCell>Disease</TableCell>
            <TableCell align="right">Doctor</TableCell>
            <TableCell align="right">Appointment Date </TableCell>
            <TableCell align="right">Number</TableCell>
            <TableCell align="right">Status</TableCell>
            {isAdmin && <TableCell align="right">Activate</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.diagnose_data.disease}
              </TableCell>
              <TableCell align="right">
                {row.doctor_data.firstName} {row.doctor_data.lastName}
              </TableCell>
              <TableCell align="right">
                {formatDateToYYYYMMDDHHMM(row.available_data.available)}
              </TableCell>
              <TableCell align="right">
                {row.status === false ? "Pending" : row?.number}
              </TableCell>
              <TableCell align="right">
                {row.status === true ? "Confirmed" : "Pending"}
              </TableCell>
              {isAdmin && (
                <ActivateAppoinment
                  data={row}
                  getappointments={getappointments}
                />
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentTable;
