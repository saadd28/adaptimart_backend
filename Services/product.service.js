const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");

module.exports = {
  postProduct: (model, file, callback) => {
    console.log("API CALLED");

    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log("model:", model);

    pool.query(
      "INSERT INTO `product` (`name`, `desc`, `image`, `overall_discount`, `item_discount`, `price`, `created_on`, `category_id`)  VALUES (?,?,?,?,?,?,?,?)",
      [
        model.name,
        model.description,
        file.filename,
        0,
        0,
        model.price,
        formattedDate,
        1,
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

  getAllProducts: (callBack) => {
    pool.query(`SELECT * FROM product`, (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  deleteProduct: (id, callBack) => {
    console.log("id", id);

    pool.query(
      "SELECT image FROM `product` WHERE id = ?",
      [id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }

        const imageFileName = results[0].image; // Assuming there's only one result

        const scriptDir = __dirname;

        // Use '..' to navigate up one directory to the root directory
        const uploadDir = path.join(scriptDir, "..", "upload");

        // Now, you can access files in the "upload" directory
        const imagePath = path.join(uploadDir, imageFileName);

        fs.unlink(imagePath, (unlinkError) => {
          if (unlinkError) {
            return callBack(unlinkError);
          }

          // After the image is deleted, update the product information
          pool.query(
            "DELETE FROM `product` WHERE id = ?",
            [id],
            (error, results) => {
              if (error) {
                return callBack(error);
              }
              console.log("results", results);
              return callBack(null, results);
            }
          );
        });
      }
    );
  },

  getProductsByName: (model, callBack) => {
    pool.query(
      "SELECT * FROM product WHERE name LIKE ?",
      [`%${model.name}%`],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateProduct: (model, file, callBack) => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // console.log("file", file);

    if (file == null) {
      // No new image provided, update the product information only
      console.log("file", file);
      pool.query(
        "UPDATE `product` SET `name` = ?, `description` = ?, `price` = ?, `discount` = ?, `category` = ?, `sub_category` = ?, `stock` = ?, `created_on` = ? WHERE id = ?",
        [
          model.name,
          model.description,
          model.price,
          model.discount,
          model.category,
          model.sub_category,
          10,
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
    } else {
      // New image provided, update the product information and delete the old image
      pool.query(
        "SELECT image FROM `product` WHERE id = ?",
        [model.id],
        (error, results) => {
          if (error) {
            return callBack(error);
          }

          const imageFileName = results[0].image; // Assuming there's only one result

          const scriptDir = __dirname;

          // Use '..' to navigate up one directory to the root directory
          const uploadDir = path.join(scriptDir, "..", "upload");

          // Now, you can access files in the "upload" directory
          const imagePath = path.join(uploadDir, imageFileName);

          fs.unlink(imagePath, (unlinkError) => {
            if (unlinkError) {
              return callBack(unlinkError);
            }

            // After the image is deleted, update the product information
            pool.query(
              "UPDATE `product` SET `name` = ?, `description` = ?, `image` = ?, `price` = ?, `discount` = ?, `category` = ?, `sub_category` = ?, `stock` = ?, `created_on` = ? WHERE id = ?",
              [
                model.name,
                model.description,
                file.filename,
                model.price,
                model.discount,
                model.category,
                model.sub_category,
                10,
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
          });
        }
      );
    }
  },

  getProductsById: (model, callBack) => {
    pool.query(
      "SELECT * FROM product WHERE id LIKE ?",
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

