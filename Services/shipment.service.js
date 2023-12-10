const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");


module.exports = {
  postShipment: (model, callback) => {
    console.log("API CALLED");

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log("model:", model);

    pool.query(
        "SELECT id FROM supplier WHERE name = ?",
        [model.supplier_name],
        (error, results) => {
          if (error) {
            return callback(error);
          }
  
          if (results.length === 0) {
            // Handle the case where no supplier with the given name is found
            return callback("Supplier not found");
          }
  
          const supplier_id = results[0].id;
  
          // Insert into the shipment table
          pool.query(
            "INSERT INTO `shipment` (`name`, `supplier_id`, `status`, `action_type`,`created_on`, `edited_on`) VALUES (?, ?, ?,?, ?, ?)",
            [
              model.name,
              supplier_id,
              model.status,
              1,
              formattedDate,
              null,
            ],
            (error, results) => {
              if (error) {
                return callback(error);
              }
              return callback(null, results);
            }
          );
        }
      );
    },

    getAllShipments: (callBack) => {
        pool.query(`SELECT * FROM shipment`, (error, results) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        });
      },

deleteShipment: (id, callBack) => {
    pool.query(
        "DELETE FROM `shipment` WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            return callBack(error);
          }
          console.log("results", results);
          return callBack(null, results);
        });

},

getShipmentsByName: (model, callBack) => {
    pool.query(
      "SELECT * FROM shipment WHERE name LIKE ?",
      [`%${model.name}%`],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

getShipmentsById: (model, callBack) => {
    pool.query(
      "SELECT * FROM shipment WHERE id LIKE ?",
      [`%${model.id}%`],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateShipment: (model, callback) => {
    console.log("API CALLED");

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log("model:", model);

    pool.query(
        "SELECT id FROM supplier WHERE name = ?",
        [model.supplier_name],
        (error, results) => {
          if (error) {
            return callback(error);
          }
  
          if (results.length === 0) {
            // Handle the case where no supplier with the given name is found
            return callback("Supplier not found");
          }
  
          const supplier_id = results[0].id;
  
          // Insert into the shipment table
          pool.query(
            "UPDATE `shipment` SET `name` = ?, `supplier_id` = ?, `status` = ?, `action_type` = ?, `edited_on` = ? WHERE id = ?",
            [
              model.name,
              supplier_id,
              model.status,
              2,
              formattedDate,
              model.id
            ],
            (error, results) => {
              if (error) {
                return callback(error);
              }
              return callback(null, results);
            }
          );
        }
      );
    },

};


