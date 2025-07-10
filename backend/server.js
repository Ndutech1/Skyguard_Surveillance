const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes.js');
const reportRoutes = require('./routes/reportRoutes.js');
const logRoutes = require('./routes/logRoutes.js');

dotenv.config();

const app = express();
const server = http.createServer(app);

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

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
});

app.set('io', io);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
