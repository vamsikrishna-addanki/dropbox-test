// FileUpload.js

import React, { useState } from "react";
import { uploadFile } from "../api";
import { Button, TextField, Typography, CircularProgress, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (file) {
            setIsUploading(true);
            try {
                const response = await uploadFile(file);
                console.log("Upload Response:", response); // Log the response
    
                if (response.status === 200) {  // Check for successful status code
                    onUploadSuccess();  // Refresh the file list after successful upload
                    setFile(null);
                    alert("File uploaded successfully!");
                } else {
                    console.log("Response status not 200:", response.status);  // Log the unexpected status
                    alert("Failed to upload file");
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Failed to upload file");
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center"
            minHeight="100vh"
            style={{
                background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
                padding: "20px",
            }}
        >
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                style={{ 
                    padding: "30px", 
                    backgroundColor: "#ffffffcc", // Semi-transparent white for a soft look
                    borderRadius: "12px", 
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", 
                    maxWidth: "400px", // Adjusted max width for outer box
                    maxHeight: "400px", // Adjusted max height for outer box
                    width: "100%"
                }}
            >
                <Typography variant="h6" gutterBottom style={{ color: "#1a237e" }}>
                    Upload a File
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                    <TextField
                        type="file"
                        onChange={handleFileChange}
                        variant="outlined"
                        size="small"
                        style={{ 
                            width: "100%",
                            backgroundColor: "#e3f2fd", // Light blue background
                            borderRadius: "4px"
                        }}
                    />
                    <Button 
                        onClick={handleUpload} 
                        variant="contained" 
                        style={{ 
                            marginTop: "15px", 
                            width: "100%",
                            backgroundColor: "#1a237e", // Dark blue color
                            color: "#fff"
                        }}
                        disabled={isUploading || !file}
                        startIcon={<CloudUploadIcon />}
                    >
                        {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                </Box>

                {file && (
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: "10px" }}>
                        Selected file: {file.name}
                    </Typography>
                )}

                {isUploading && (
                    <CircularProgress size={24} style={{ marginTop: "15px", color: "#1a237e" }} />
                )}
            </Box>
        </Box>
    );
};

export default FileUpload;
