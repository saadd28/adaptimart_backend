const { postUser, authenticateUser } = require("../Controller/user.controller");

const router = require("express").Router();

router.post("/add", postUser);
router.get("/login", authenticateUser);

module.exports = router;
