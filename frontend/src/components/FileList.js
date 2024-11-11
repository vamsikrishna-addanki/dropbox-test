// FileList.js

import React, { useEffect, useState } from "react";
import { getFiles } from "../api";
import FileItem from "./FileItem";
import { List, Typography } from "@mui/material";

const FileList = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await getFiles();
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <Typography variant="h6">Uploaded Files</Typography>
      <List>
        {files.length > 0 ? (
          files.map((file) => <FileItem key={file.id} file={file} />)
        ) : (
          <Typography variant="body1">No files uploaded yet.</Typography>
        )}
      </List>
    </div>
  );
};

export default FileList;
