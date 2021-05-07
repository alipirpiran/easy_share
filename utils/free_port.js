const fp = require('find-free-port');
module.exports = () => {
  return new Promise((res, rej) => {
    fp(3000, function (err, freePort) {
      if (err) return rej(err);
      return res(freePort);
    });
  });
};
