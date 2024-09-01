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
  Typography,
} from "@mui/material";
import React from "react";
import { formatDateToYYYYMMDDHHMM } from "../../helpers/helper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DeleteIcon from "@mui/icons-material/Delete";

const ReportsTable = ({ data = [] }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Diagnosed Reports</caption>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography
                sx={{ fontSize: "17px", fontWeight: 600, color: "gray" }}
              >
                ID
              </Typography>
            </TableCell>
            <TableCell align="right">
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
                Date{" "}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                sx={{ fontSize: "17px", fontWeight: 600, color: "gray" }}
              >
                symptoms
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
                <Typography> {row.id}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography> {row.disease}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{row.doctor}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{formatDateToYYYYMMDDHHMM(row.created)}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{row.symptoms}</Typography>
              </TableCell>
              <TableCell align="right">
                <Stack
                  direction={"row"}
                  sx={{ gap: "10px", justifyContent: "flex-end" }}
                >
                  <Tooltip title="Delete Report" arrow>
                    <IconButton>
                      <DeleteIcon color="warning" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="View Appoinment" arrow>
                    <IconButton>
                      <CollectionsBookmarkIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportsTable;
