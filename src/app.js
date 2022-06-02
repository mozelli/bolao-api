require("dotenv").config({ path: ".env.development" });
const express = require("express");
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoutes);

app.listen(
  process.env.APP_PORT,
  console.log(`Server running on port ${process.env.APP_PORT}`)
);
