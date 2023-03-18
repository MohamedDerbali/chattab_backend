const crypto = require('crypto');
const secretByCrypto = crypto.randomBytes(64).toString('hex');
console.log(secretByCrypto);
module.exports = secretByCrypto;