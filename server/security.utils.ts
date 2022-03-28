var util = require('util');
var crypto = require('crypto');

export const randomBytes = util.promisify(crypto.randomBytes);

