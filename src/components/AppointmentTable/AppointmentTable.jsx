import React from "react";
import { formatDateToYYYYMMDDHHMM } from "../../helpers/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
            <TableCell>
              <Typography
                sx={{ fontSize: "17px", fontWeight: 600, color: "gray" }}
              >
                Disease
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                sx={{ fontSize: "17px", fontWeight: 600, color: "gray" }}
              >
                Doctor
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                sx={{ fontSize: "17px", fontWeight: 600, color: "gray" }}
              >
                Appointment Date
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                sx={{ fontSize: "17px", fontWeight: 600, color: "gray" }}
              >
                Number
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                sx={{ fontSize: "17px", fontWeight: 600, color: "gray" }}
              >
                Status
              </Typography>
            </TableCell>

            <TableCell align="right">
              <Typography
                sx={{ fontSize: "17px", fontWeight: 600, color: "gray" }}
              >
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <Typography> {row.diagnose_data.disease}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>
                  {row.doctor_data.firstName} {row.doctor_data.lastName}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>
                  {formatDateToYYYYMMDDHHMM(row.available_data.available)}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>
                  {row.status
                    ? row?.number
                    : row?.confirmed_by && !row.status
                    ? "Cancelled"
                    : "Pending"}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>
                  {row.status
                    ? "Confirmed"
                    : row?.confirmed_by && !row.status
                    ? "Cancelled"
                    : "Pending"}
                </Typography>
              </TableCell>

              <ActivateAppoinment
                isAdmin={isAdmin}
                data={row}
                getappointments={getappointments}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentTable;
