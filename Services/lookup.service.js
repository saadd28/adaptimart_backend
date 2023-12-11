const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");

module.exports = {
    getById: (model, callBack) => {
        pool.query(
          "SELECT * FROM lookup WHERE id LIKE ?",
          [`%${model.id}%`],
          (error, results) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
    },
    
    getByParentId: (model, callBack) => {
        pool.query(
          "SELECT * FROM lookup WHERE parent_id LIKE ?",
          [`%${model.id}%`],
          (error, results) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
    },
    getNullParentId: (callBack) => {
        pool.query(
          "SELECT * FROM lookup WHERE parent_id is null",
          (error, results) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
    },

}