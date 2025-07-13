const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes.js');
const reportRoutes = require('./routes/reportRoutes.js');
const logRoutes = require('./routes/logRoutes.js');
const analyticsRoutes = require('./routes/analyticsRoutes.js');
const trendRoutes = require('./routes/trendRoutes.js');
const streamRoutes = require('./routes/streamRoutes.js');
const { startStreamMonitor } = require('./services/streamMonitor.js');

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Initialize Socket.IO before using it
const io = new Server(server, {
  cors: {
    origin: 'https://skyguard-surveillance.vercel.app',
  }
});

// ✅ Now pass io to the stream monitor
startStreamMonitor(io);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('SkyGuard Surveillance Backend Running');
});
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/trends', trendRoutes);
app.use('/api/stream', streamRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Socket.io events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.set('io', io);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
