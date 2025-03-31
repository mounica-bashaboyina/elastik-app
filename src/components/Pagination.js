import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

const Pagination = ({ page, nextToken, handlePrevious, handleNext }) => {
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 2,
      gap: 2,
    }}
  >
    <Button
      variant="contained"
      color="primary"
      onClick={handlePrevious}
      disabled={page === 1}
      sx={{
        backgroundColor: page === 1 ? "#ccc" : "#1922E4",
        "&:hover": { backgroundColor: page === 1 ? "#ccc" : "#0f1bbd" },
      }}
    >
      Previous
    </Button>
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
      Page {page}
    </Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={handleNext}
      disabled={!nextToken}
      sx={{
        backgroundColor: !nextToken ? "#ccc" : "#1922E4",
        "&:hover": { backgroundColor: !nextToken ? "#ccc" : "#0f1bbd" },
      }}
    >
      Next
    </Button>
  </Box>
  );
};

export default Pagination;
