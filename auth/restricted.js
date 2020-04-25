const jwt = require("jsonwebtoken");
const jwtSecret = require("../secrets/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(token);
        res.status(401).json({ message: "You shall not pass!", err });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "no credentials were given" });
  }
};
