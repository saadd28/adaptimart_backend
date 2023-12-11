const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");


module.exports = {

  getAllproductStocks: (callBack) => {
    pool.query(
        "SELECT * FROM product_stock LEFT JOIN product ON product_stock.product_id = product.id",
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    );
  },


  getproductStocksByName: (model, callBack) => {
    pool.query(
        "SELECT * FROM product_stock LEFT JOIN product ON product_stock.product_id = product.id WHERE product.name LIKE ?",
        [`%${model.name}%`],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    );
},


  getproductStocksById: (model, callBack) => {
    pool.query(
        "SELECT * FROM product_stock LEFT JOIN product ON product_stock.product_id = product.id WHERE product.id LIKE ?",
        [`%${model.id}%`],
        (error, results) => {
            if (error) {
                return callBack(error);
              }
            return callBack(null, results);
        }
    );
},

updateproductStock: (model, callBack) => {
  pool.query(
      "UPDATE `product_stock` SET `available` =  `available` + ? WHERE id = ?",
      [
        model.available,
        model.id,
      ],
      (error, results) => {
          if (error) {
              return callBack(error);
            }
          return callBack(null, results);
      }
  );
},


};


