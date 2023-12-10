const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");

module.exports = {
  postSupplier: (model, callback) => {
    console.log("API CALLED");

    // const currentDate = new Date();
    // const formattedDate = currentDate
    //   .toISOString()
    //   .slice(0, 19)
    //   .replace("T", " ");

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);

    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
        
    console.log("model:", model);

    pool.query(
      "INSERT INTO `supplier` (`name`, `contact_name`, `contact_designation`, `address`, `city`, `state`, `country`, `postal_code`,`action_type`,`created_on`,`edited_on`)  VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        model.name,
        model.contact_name,
        model.contact_designation,
        model.address,
        model.city,
        model.state,
        model.country,
        model.postal_code,
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

  getAllSuppliers: (callBack) => {
    pool.query(`SELECT * FROM supplier`, (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  deleteSupplier: (id, callBack) => {
    pool.query(
        "DELETE FROM `supplier` WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            return callBack(error);
          }
          console.log("results", results);
          return callBack(null, results);
        });
  },


  
  getSuppliersByName: (model, callBack) => {
    pool.query(
      "SELECT * FROM supplier WHERE name LIKE ?",
      [`%${model.name}%`],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateSupplier: (model, callBack) => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

      pool.query(
        "UPDATE `supplier` SET `name` = ?, `contact_name` = ?, `contact_designation` = ?, `address` = ?, `city` = ?, `state` = ?, `country` = ?, `postal_code` = ?, `action_type` = ?, `edited_on` = ? WHERE id = ?",
        [
          model.name,
          model.contact_name,
          model.contact_designation,
          model.address,
          model.city,
          model.state,
          model.country,
          model.postal_code,
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


  getSuppliersById: (model, callBack) => {
    pool.query(
      "SELECT * FROM supplier WHERE id LIKE ?",
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

