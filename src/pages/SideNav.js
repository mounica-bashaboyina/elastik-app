import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const DrawerItems = [
  { text: "Dashboard", icon: "dashboard", link: "/" },
  { text: "Students", icon: "people", link: "/students" },
];

const DrawerList = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  return (
  <Box sx={{ width: 250 }} role="presentation">
    <List>
      {DrawerItems.map(({ text, link }, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={() => {
            navigate(link)
            toggleDrawer();
          }}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
  </Box>);
};

const SideNav = ({ openDrawer, onClose }) => {
  return (
    <Drawer open={openDrawer} onClose={() => onClose(false)}>
      <DrawerList toggleDrawer={() => onClose(false)} />
    </Drawer>
  );
};

export default SideNav;
