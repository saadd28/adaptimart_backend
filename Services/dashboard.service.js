const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");

module.exports = {
    gettotalrevenue: (model, callBack) => {
        pool.query(
          "SELECT sum(total_price) as total_price FROM `order`",
          (error, results) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
    },
    
    gettotalsales: (model, callBack) => {
        pool.query(
          "SELECT count(id) as total_orders FROM `order`",
          (error, results) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
    },

    gettotalskus: (callBack) => {
        pool.query(
          "SELECT count(id) as total_skus from `product`",
          (error, results) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
    },

    gettotalusers: (callBack) => {
        pool.query(
          "SELECT count(id) as total_users from `user` where role_id=1",
          (error, results) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
    },    
    gettopsellingskus: (callBack) => {
      pool.query(
        "SELECT distinct p.id AS product_id, p.image as image,  p.name AS product_name, p.price AS price, SUM(op.quantity) OVER (PARTITION BY p.id) AS total_quantity_sold, SUM(op.quantity * p.price) OVER (PARTITION BY p.id) AS total_amount_sold FROM product p JOIN order_product op ON p.id = op.product_id JOIN `order` o ON op.order_id = o.id order by total_quantity_sold desc limit 2",
      
        (error, results) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
}