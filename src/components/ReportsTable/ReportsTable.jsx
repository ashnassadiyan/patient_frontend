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
import React from "react";
import { formatDateToYYYYMMDDHHMM } from "../../helpers/helper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

const ReportsTable = ({ data = [] }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Diagnosed Reports</caption>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Disease</TableCell>
            <TableCell align="right">Doctor</TableCell>
            <TableCell align="right">Date </TableCell>
            <TableCell align="right">symptoms</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.disease}</TableCell>
              <TableCell align="right">{row.doctor}</TableCell>
              <TableCell align="right">
                {formatDateToYYYYMMDDHHMM(row.created)}
              </TableCell>
              <TableCell align="right">{row.symptoms}</TableCell>
              <TableCell align="right">
                <Stack
                  direction={"row"}
                  sx={{ gap: "10px", justifyContent: "flex-end" }}
                >
                  <Tooltip title="View Report" arrow>
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="View Appoinment" arrow>
                    <IconButton>
                      <CollectionsBookmarkIcon />
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
