const restricted = require("../auth/restricted.js");
const Users = require("../user/users-model");
const router = require("express").Router();

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log(restricted);
      res.send(err);
    });
});

module.exports = router;
