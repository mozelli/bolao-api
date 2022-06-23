const crypto = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = {
  createJWT(id) {
    const token = jwt.sign({ id }, process.env.API_HASH, {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    });

    return token;
  },

  hashSHA(value) {
    const hash = crypto.createHash("sha256").update(value).digest("hex");
    return hash;
  },

  generatePassword(password, key) {
    const encriptedPassword = crypto
      .createHmac(process.env.ENCRYPT_ALGORITHM, key)
      .update(password)
      .digest("hex");
    return encriptedPassword;
  },

  random(size) {
    const hash = crypto.randomBytes(size).toString("hex");
    return hash;
  },
};
