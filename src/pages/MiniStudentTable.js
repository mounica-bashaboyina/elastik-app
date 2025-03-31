import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";

import StudentTable from "./StudentTable";

const MiniStudentTable = () => {
  return (
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
};

export default MiniStudentTable;
