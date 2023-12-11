// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { getAllreturns, getreturnsByName, markasDamaged, getreturnsById, markasunDamaged} = require("../Controller/return.controller");

const router = require("express").Router();

router.get("/getall", getAllreturns);
router.get("/getbyname", getreturnsByName);
router.post("/markasDamaged", markasDamaged);
router.post("/markasUndamaged", markasunDamaged);
router.get("/getbyid", getreturnsById);


module.exports = router;
