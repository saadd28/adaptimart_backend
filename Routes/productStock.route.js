// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { getAllproductStocks, getproductStocksByName, updateproductStock, getproductStocksById } = require("../Controller/productStock.controller");

const router = require("express").Router();

router.get("/getall", getAllproductStocks);
router.get("/getbyname", getproductStocksByName);
router.post("/update", updateproductStock);
router.get("/getbyid", getproductStocksById);


module.exports = router;
