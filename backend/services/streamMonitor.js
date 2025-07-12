const { checkStreamStatus } = require('../utils/checkStreamStatus.js');

let isActive = false;
let uptime = null;

const startStreamMonitor = (io) => {
  setInterval(async () => {
    const currentlyActive = await checkStreamStatus();

    if (currentlyActive && !isActive) {
      isActive = true;
      uptime = Date.now();
      io.emit('streamHealth', {
        status: 'active',
        startedAt: uptime,
      });
    }

    if (!currentlyActive && isActive) {
      isActive = false;
      io.emit('streamHealth', {
        status: 'stopped',
        stoppedAt: Date.now(),
      });
    }
  }, 5000); // Check every 5 seconds
};

module.exports = { startStreamMonitor };