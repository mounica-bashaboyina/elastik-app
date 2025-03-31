import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";

const Profile = () => {
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
      <h2>Profile</h2>
      <p>Name: John Doe</p>
    </Paper>
  );
};

export default Profile;
