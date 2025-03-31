import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = ({ columnLength }) => (
  <TableBody>
    <TableRow>
      <TableCell colSpan={columnLength} style={{ padding: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 500, // Matches the table height
            width: "100%",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      </TableCell>
    </TableRow>
  </TableBody>
);

export default Loading;
