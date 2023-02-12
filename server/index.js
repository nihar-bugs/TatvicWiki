const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
require("dotenv").config();
require("./passport");

const authRoute = require("./routes/auth");
const searchRoute = require("./routes/search");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["nihar"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MongoDB_CONNECTION, { dbName: "MediaWiki" })
  .then(() => console.log("DB Connection Successful!!"))
  .catch((error) => console.log("DB Connection Failed! Error Message:", error));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/auth", authRoute);
app.use("/search", searchRoute);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port:", process.env.PORT);
});
