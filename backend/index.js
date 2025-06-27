const express = require("express");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const cors = require("cors");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

const storage = new Storage();
const bucket = storage.bucket("receipt-uploads-nidhi142857");

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("receipt"), async (req, res) => {
  try {
    const file = req.file;
    const uid = req.body.uid || "unknown";

    await bucket.upload(file.path, {
      destination: file.originalname,
      metadata: {
        metadata: {
          uid: uid,
        },
      },
    });

    res.status(200).json({ message: "Uploaded to GCS!" });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
