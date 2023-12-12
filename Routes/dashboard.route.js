const { gettotalrevenue, gettotalsales, gettotalskus, gettotalusers, gettopsellingskus} = require("../Controller/dashboard.controller");

const router = require("express").Router();

router.get("/gettotalrevenue", gettotalrevenue);
router.get("/gettotalsales", gettotalsales);
router.get("/gettotalskus", gettotalskus);
router.get("/gettotalusers", gettotalusers);
router.get("/gettopsellingskus", gettopsellingskus);

module.exports = router;
