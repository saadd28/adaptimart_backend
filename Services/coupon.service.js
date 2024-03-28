const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");

module.exports = {
  postCoupon: (model, callback) => {
    console.log("API CALLED");

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log("model:", model);

    pool.query(
      "INSERT INTO `coupon` (`code`, `description`, `discount_percentage`, `action_type`, `created_on`, `edited_on`)  VALUES (?,?,?,?,?,?)",
      [
        model.code,
        model.description,
        model.discount_percentage,
        1,
        formattedDate,
        null,
      ],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        console.log("results", results);
        return callback(null, results);
      }
    );
  },

  getAllCoupons: (callBack) => {
    pool.query(`SELECT * FROM coupon`, (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  deleteCoupon:(id, callBack) => {
    pool.query(
        "DELETE FROM coupon WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            return callBack(error);
          }
          console.log("results", results);
          return callBack(null, results);
        });
  },

  getCouponsByCode: (model, callBack) => {
    pool.query(
      "SELECT * FROM coupon WHERE code LIKE ?",
      [`%${model.code}%`],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateCoupon: (model, callBack) => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");


    pool.query(
      "UPDATE `coupon` SET `code` = ?, `description` = ?, `discount_percentage` = ?,  `action_type` = ?, `edited_on` = ? WHERE id = ?",
      [
        model.code,
        model.description,
        model.discount_percentage,
        2,
        formattedDate,
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

  getCouponsById: (model, callBack) => {
    pool.query(
      "SELECT * FROM coupon WHERE id LIKE ?",
      [`%${model.id}%`],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getCouponsByDescription: (model, callBack) => {
    pool.query(
      "SELECT * FROM coupon WHERE description LIKE ?",
      [`%${model.description}%`],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};

