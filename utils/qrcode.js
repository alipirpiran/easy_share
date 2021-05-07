var QRCode = require('qrcode');
const Stream = require('stream');
const fs = require('fs');

module.exports = (url = 'No Data') => {
  let chunks = [];

  const readableStream = new Stream.Writable({
    write(chunk, encoding, next) {
      // txt += Buffer.from(chunk).toString('base64');
      chunks.push(chunk);
      next();
    },
  });

  return new Promise((resolve, reject) => {
    readableStream.on('finish', () => {
      resolve(Buffer.concat(chunks));
    });
    QRCode.toFileStream(readableStream, url, (err) => {
      if (err) return reject(err);
    });
  });
};

