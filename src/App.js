
import * as React from 'react';
import { useAuthenticator } from "@aws-amplify/ui-react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import StudentTable from "./StudentTable";

const App = () => {
  const { username, signOut } = useAuthenticator();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#1922E4" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Elastik Dashboard
          </Typography>
          <Button color="inherit" onClick={signOut}>LogOut</Button>
        </Toolbar>
      </AppBar>
      <Box>
      <StudentTable />
      </Box>
    </Box>
  );
}

export default App;