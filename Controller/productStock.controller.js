// const UserService = require()

const productStockService = require("../Services/productStock.service");

module.exports = {

  getAllproductStocks: (req, res) => {
    productStockService.getAllproductStocks((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getproductStocksByName: (req, res) => {
    console.log("req.query", req.query);
    productStockService.getproductStocksByName(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  updateproductStock: (req, res) => {
    productStockService.updateproductStock(req.body, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getproductStocksById: (req, res) => {
    console.log("req.query", req.query);
    productStockService.getproductStocksById(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
};
