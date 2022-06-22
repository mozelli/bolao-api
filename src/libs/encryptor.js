const crypto = require("crypto");

module.exports = {
  email(email) {
    const key = crypto.createHash("sha256").update(email).digest("hex");
    return key;
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
