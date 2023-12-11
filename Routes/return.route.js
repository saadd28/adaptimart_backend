// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { getAllreturns, getreturnsByName, updatereturn, getreturnsById } = require("../Controller/return.controller");

const router = require("express").Router();

router.get("/getall", getAllreturns);
router.get("/getbyname", getreturnsByName);
router.post("/update", updatereturn);
router.get("/getbyid", getreturnsById);


module.exports = router;
