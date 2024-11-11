// api.js

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Update with your backend URL if different

// Upload file API call
// api.js
export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API_BASE_URL}/upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    }).then(response => response)
      .catch(error => {
          console.error("Error in upload:", error.response || error);
          throw error; // Rethrow the error to be caught in the component's catch block
      });
};


// Get list of files API call
export const getFiles = () => {
  return axios.get(`${API_BASE_URL}/files/`);
};

// Download file API call
export const downloadFile = (fileId) => {
  return axios.get(`${API_BASE_URL}/download/${fileId}`, { responseType: "blob" });
};
