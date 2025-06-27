// src/components/UploadReceipt.js
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";

const UploadReceipt = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    const user = getAuth().currentUser;

    if (!file || !user) {
      alert("Please select a file and log in.");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", file);
    formData.append("uid", user.uid);

    setUploading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const prog = (progressEvent.loaded / progressEvent.total) * 100;
            setProgress(Math.floor(prog));
          },
        }
      );

      alert("✅ Upload success!");
      console.log(response.data);

      // ✅ Trigger parent refresh
      if (onUploadComplete) {
        // optional delay if Firestore write isn't instant
        setTimeout(() => onUploadComplete(), 2000);
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/*,application/pdf"
        className="mb-3"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? `Uploading ${progress}%...` : "Upload Receipt"}
      </button>
    </div>
  );
};

export default UploadReceipt;
