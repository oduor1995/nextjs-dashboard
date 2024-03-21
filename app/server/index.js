const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3001;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('File upload request received');

  // Check if the file exists before attempting to process it
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Respond immediately after saving the file without attempting to read it
  res.json({ message: 'File uploaded successfully on Express server' });
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});






