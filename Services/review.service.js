const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");

module.exports = {
  postReview: (model, callback) => {
    console.log("API CALLED");

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log("model:", model);

    pool.query(
      "INSERT INTO `reviews` (`product_id`, `user_id`, `review`, `rating`, `action_type`, `created_on`, `edited_on`)  VALUES (?,?,?,?,?,?,?)",
      [
        model.product_id,
        model.user_id,
        model.review,
        model.rating,
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

  getAllReviews: (callBack) => {
    pool.query(`SELECT * FROM reviews`, (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  deleteReview:(id, callBack) => {
    pool.query(
        "DELETE FROM reviews WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            return callBack(error);
          }
          console.log("results", results);
          return callBack(null, results);
        });
  },

  getReviewsByName: (model, callBack) => {
    pool.query(
      "SELECT * FROM reviews WHERE review LIKE ?",
      [`%${model.review}%`],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateReview: (model, callBack) => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");


    pool.query(
      "UPDATE `reviews` SET `review` = ?, `rating` = ?, `action_type` = ?, `edited_on` = ? WHERE id = ?",
      [
        model.review,
        model.rating,
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

  getReviewsById: (model, callBack) => {
    pool.query(
      "SELECT * FROM reviews WHERE id LIKE ?",
      [`%${model.id}%`],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
