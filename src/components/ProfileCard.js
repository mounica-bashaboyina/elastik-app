import Paper from "@mui/material/Paper";
import { useAuthenticator } from "@aws-amplify/ui-react";
import React from "react";

const Profile = () => {
  const { user } = useAuthenticator();
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
      <p>Name: {user?.username}</p>
    </Paper>
  );
};

export default Profile;
