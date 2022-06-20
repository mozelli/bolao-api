const User = require("../models/User");
const crypto = require("crypto");
// const mailer = require("../modules/mailer");
const nodemailer = require("nodemailer");

module.exports = {
  // Post
  async new(body, response) {
    try {
      const token = crypto.randomBytes(20).toString("hex");
      const birthday = Date(body.year, body.month, body.day, 0, 0, 0, 0);
      let data = {
        name: body.name,
        lastname: body.lastname,
        birthday,
        email: body.email,
        password: body.password,
        emailConfirmation: token,
      };
      // const user = await User.create(data);
      User.create(data).then((newUser) => {
        var transport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "f2245b0a38a425",
            pass: "fd4f3ccb449fb0",
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
