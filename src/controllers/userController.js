const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mailer = require("../modules/mailer");
const encryptor = require("../libs/encryptor");

module.exports = {
  // Post
  async new(request, response) {
    try {
      const key = encryptor.hashSHA(request.body.email);

      const encriptedPassword = encryptor.generatePassword(
        request.body.password,
        key
      );

      const token = encryptor.random(20);

      const birthday = new Date(
        request.body.year,
        request.body.month,
        request.body.day,
        0,
        0,
        0,
        0
      );

      const data = {
        name: request.body.name,
        lastname: request.body.lastname,
        birthday,
        email: request.body.email,
        password: encriptedPassword,
        emailConfirmation: token,
      };

      User.create(data).then((newUser) => {
        const sendEmail = mailer.emailValidation(request.body.email, token);

        if (sendEmail.error) {
          return response.status(400).json({
            error: sendEmail.nodemailerErrorMessage,
            message: sendEmail.message,
          });
        }

        return response.status(200).json({
          email: newUser.email,
          message: sendEmail.message,
        });
      });
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to add new user failed.",
      });
    }
  },

  async emailConfirmation(request, response) {
    try {
      User.findOne({ emailConfirmation: request.params.token })
        .then((userFound) => {
          User.findByIdAndUpdate(userFound.id, {
            $set: {
              state: "confirmed_email",
            },
          })
            .then((userConfirmation) => {
              return response.redirect(
                "http://localhost:3000/cadastro-confirmacao"
              );
            })
            .catch((error) => {
              return response
                .status(500)
                .json({ error, message: "Confirmation failed." });
            });
        })
        .catch((error) => {
          return response
            .status(400)
            .json({ error, message: "Invalid token." });
        });
    } catch (error) {
      return response
        .status(400)
        .json({ error, message: "Cannot verify the email. Try again." });
    }
  },

  async userAuthenticate(request, response) {
    const { email, password } = request.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return response.status(400).json({ message: "User not found" });
    } else if (user.state === "confirmed_email") {
      // const key = crypto.createHash("sha256").update(email).digest("hex");
      const key = encryptor.hashSHA(email);

      const encriptedPassword = crypto
        .createHmac(process.env.ENCRYPT_ALGORITHM, key)
        .update(password)
        .digest("hex");

      if (user.password === encriptedPassword) {
        // const token = jwt.sign({ id: user.id }, process.env.API_HASH, {
        //   expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        // });

        const token = encryptor.createJWT(user.id);

        user.password = undefined;
        return response.status(200).json({ user, token });
      } else {
        return response.status(400).json({ message: "Password imvalid." });
      }
    } else {
      return response
        .status(400)
        .json({ message: "E-mail awaiting for validation." });
    }
  },

  // Delete
  async delete(request, response) {
    try {
      const user = await User.deleteOne({ id: request.params.id });
      return response.status(200).json({ user, message: "User deleted." });
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to delete user failed.",
      });
    }
  },

  // Delete
  async get(request, response) {
    try {
      const users = await User.find();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to find all users failed.",
      });
    }
  },
};
