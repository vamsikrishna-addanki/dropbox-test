// FileItem.js

import React from "react";
import { downloadFile } from "../api";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const FileItem = ({ file }) => {
  const handleDownload = async () => {
    try {
      const response = await downloadFile(file.id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <ListItem>
      <ListItemText primary={file.filename} secondary={file.filetype} />
      <IconButton onClick={handleDownload} color="primary">
        <DownloadIcon />
      </IconButton>
    </ListItem>
  );
};

export default FileItem;

