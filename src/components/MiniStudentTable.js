import Paper from "@mui/material/Paper";
import React from "react";

import StudentTable from "../pages/StudentListPage";

const MiniStudentTable = () => (
  <Paper
    elevation={3}
    sx={{
      padding: 2,
      margin: 2,
      backgroundColor: "#f5f5f5",
      borderRadius: 2,
    }}
  >
    <StudentTable isMiniTable />
  </Paper>
);

export default MiniStudentTable;
