const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets/secrets");
const Users = require("../user/users-model");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(valid => {
      const token = generateToken(valid);
      res.status(201).json({ created_user: valid, token: token });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ username: user.username, token: token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  };
  const options = { expiresIn: "1d" };
  //data, secret, options
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

module.exports = router;
