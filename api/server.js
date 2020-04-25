const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router.js");
const userRouter = require("../user/user-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

//What does this
server.get("/", (req, res) => {
  res.send(
    "Up and running, sir! Thank you, Igor! You are my most trusted servant."
  );
});

// server.get("/token", (req, res) => {
//   const payload = {
//     subject: "users",
//     department: "X"
//   };

//   const secret = "Please run before you are eaten by my unchained tiger.";
//   const options = {
//     expiresIn: "1d"
//   };

//   const token = jwt.sign(payload, secret, options);

//   res.json(token);
// });

module.exports = server;
