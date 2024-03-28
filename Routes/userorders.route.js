
const { getUserOrdersByID } = require("../Controller/userorders.controller");

const router = require("express").Router();


router.get("/getuserordersbyid", getUserOrdersByID);


module.exports = router;
