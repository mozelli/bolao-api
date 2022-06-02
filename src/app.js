require("dotenv").config({ path: ".env.development" });
const express = require("express");
const usersRoutes = require("./routes/users");
const teamsRoutes = require("./routes/teams");
const matchesRoutes = require("./routes/matches");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", usersRoutes);
app.use("/teams", teamsRoutes);
app.use("/matches", matchesRoutes);

app.listen(
  process.env.APP_PORT,
  console.log(`Server running on port ${process.env.APP_PORT}`)
);
