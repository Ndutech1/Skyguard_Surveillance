const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const router = express.Router();
const StreamConfig = require('../models/StreamConfig'); // 🆕 DB model

let streamSource = 'rtsp://default';

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

// ✏️ Set Stream Source (Dynamic: File or MongoDB)
router.post('/set-url', async (req, res) => {
  const { url } = req.body;
  if (!url || !url.startsWith('rtsp://')) {
    return res.status(400).json({ message: 'Invalid RTSP URL' });
  }

  try {
    if (process.env.USE_DB_STREAM === 'true') {
      // ⛅ Use DB in cloud
      await StreamConfig.findOneAndUpdate({}, {
        url,
        updatedAt: new Date(),
      }, { upsert: true });
    } else {
      // 💻 Use file locally
      fs.writeFileSync('stream/source.txt', url);
    }

    streamSource = url;
    res.json({ message: 'RTSP stream URL saved successfully' });
  } catch (err) {
    console.error('Failed to save stream URL:', err);
    res.status(500).json({ message: 'Failed to save stream URL' });
  }
});

// 📡 Get Stream URL (Dynamic: File or MongoDB)
router.get('/get-url', async (req, res) => {
  try {
    let url;

    if (process.env.USE_DB_STREAM === 'true') {
      const config = await StreamConfig.findOne();
      url = config?.url || streamSource;
    } else {
      url = fs.readFileSync('stream/source.txt', 'utf-8') || streamSource;
    }

    res.json({ url });
  } catch (err) {
    console.error('Get stream URL error:', err);
    res.status(500).json({ message: 'Failed to get stream URL' });
  }
});

module.exports = router;
