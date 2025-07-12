const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const router = express.Router();

let streamSource = 'rtsp://default'; // default fallback

// 🟢 Start Stream
router.post('/start', (req, res) => {
  exec('start "" stream\\run-stream.bat', (err, stdout, stderr) => {
    if (err) {
      console.error('Start error:', err);
      return res.status(500).json({ message: 'Failed to start stream' });
    }
    res.json({ message: 'Stream started' });
  });
});

// 🔴 Stop Stream
router.post('/stop', (req, res) => {
  exec('taskkill /F /IM ffmpeg.exe & taskkill /F /IM nginx.exe', (err, stdout, stderr) => {
    if (err) {
      console.error('Stop error:', err);
      return res.status(500).json({ message: 'Failed to stop stream' });
    }
    res.json({ message: 'Stream stopped' });
  });
});

// ✏️ Set Stream Source (from IT Staff input)
router.post('/set-url', (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith('rtsp://')) {
    return res.status(400).json({ message: 'Invalid RTSP URL' });
  }

  try {
    fs.writeFileSync('stream/source.txt', url); // Save to file for FFmpeg to read
    streamSource = url;
    res.json({ message: 'RTSP stream URL saved successfully' });
  } catch (err) {
    console.error('Failed to write URL:', err);
    res.status(500).json({ message: 'Failed to save stream URL' });
  }
});

// 📡 Get Current Stream Source
router.get('/get-url', (req, res) => {
  try {
    const url = fs.readFileSync('stream/source.txt', 'utf-8') || streamSource;
    res.json({ url });
  } catch {
    res.json({ url: streamSource });
  }
});

module.exports = router;
