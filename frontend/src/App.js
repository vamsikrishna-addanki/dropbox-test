import React from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import { Container, Typography } from "@mui/material";

function App() {
  const refreshFileList = () => {
    // This can trigger a file list refresh in FileList component if needed
    window.location.reload();
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{
          fontWeight: "bold",
          color: "#DC143C",  // You can choose any color you like
          fontSize: "36px",  // Larger font size for the title
          textTransform: "uppercase", // Uppercase to make it bold
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)", // Light shadow for depth
        }}
      >
        EasyStore (Dropbox-Like File Storage)
      </Typography>
      <FileUpload onUploadSuccess={refreshFileList} />
      <FileList />
    </Container>
  );
}

export default App;
