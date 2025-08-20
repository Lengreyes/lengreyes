const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const upload = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ filename: req.file.filename, originalname: req.file.originalname });
});

router.get('/', (req, res) => {
  const fs = require('fs');
  const uploadDir = path.join(__dirname, '../uploads');
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: err });
    res.json(files);
  });
});

module.exports = router;