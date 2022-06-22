const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
// const mailer = require("../modules/mailer");
const nodemailer = require("nodemailer");

module.exports = {
  // Post
  async new(body, response) {
    try {
      const key = crypto.createHash("sha256").update(body.email).digest("hex");

      const encriptedPassword = crypto
        .createHmac(process.env.ENCRYPT_ALGORITHM, key)
        .update(body.password)
        .digest("hex");

      const token = crypto.randomBytes(20).toString("hex");

      const birthday = new Date(body.year, body.month, body.day, 0, 0, 0, 0);

      let data = {
        name: body.name,
        lastname: body.lastname,
        birthday,
        email: body.email,
        password: encriptedPassword,
        emailConfirmation: token,
      };
      // const user = await User.create(data);
      User.create(data).then((newUser) => {
        var transport = nodemailer.createTransport({
          host: process.env.MAILER_HOST,
          port: process.env.MAILER_PORT,
          auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD,
          },
        });

        var message = {
          from: "Meu Placar <noreplay@meuplacar.com.br>",
          to: body.email,
          subject: "Meu Placar - Email de confirmação.",
          text: `Este é um e-mail de confirmação. Token: ${token}`,
          html:
            "<p>Link de confirmação:</p><a href='http:localhost:4444/users/emailConfirmation/" +
            token +
            "'>Clique aqui</a>",
        };

        transport.sendMail(message, function (err) {
          if (err) {
            return response.status(400).json({
              error: err,
              message:
                "The user was created but cannot send the confirmation email.",
            });
          } else {
            return response.status(200).json({
              email: newUser.email,
              id: newUser.id,
              message: "User registered. System awaiting email confirmation.",
            });
          }
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
    // return response.send(request.params.token);
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
      const key = crypto.createHash("sha256").update(email).digest("hex");

      const encriptedPassword = crypto
        .createHmac(process.env.ENCRYPT_ALGORITHM, key)
        .update(password)
        .digest("hex");

      if (user.password === encriptedPassword) {
        const token = jwt.sign({ id: user.id }, process.env.API_HASH, {
          expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        });
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
      return response.status(200).json(user);
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
