const http = require('http');

const checkStreamStatus = () => {
  return new Promise((resolve) => {
    const req = http.request(
      {
        method: 'HEAD',
        host: 'localhost',
        port: 8080,
        path: '/stream.m3u8',
        timeout: 2000,
      },
      (res) => {
        resolve(res.statusCode === 200);
      }
    );

    req.on('error', () => resolve(false));
    req.end();
  });
};

module.exports = { checkStreamStatus };