const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");

module.exports = {
  postCategory: (model, file, callback) => {
    console.log("API CALLED");

    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log("model:", model);

    pool.query(
      "INSERT INTO `category` (`parent_id`, `name`, `image`, `action_type`, `created_on`,`edited_on`)  VALUES (?,?,?,?,?,?)",
      [
        null,
        model.name,
        file.filename,
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

  getAllCategorys: (callBack) => {
    pool.query(`SELECT * FROM category`, (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  deleteCategory: (id, callBack) => {
    console.log("id", id);

    pool.query(
      "SELECT image FROM `category` WHERE id = ?",
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

          // After the image is deleted, update the category information
          pool.query(
            "DELETE FROM `category` WHERE id = ?",
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

  getCategorysByName: (model, callBack) => {
    pool.query(
      "SELECT * FROM category WHERE name LIKE ?",
      [`%${model.name}%`],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateCategory: (model, file, callBack) => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // console.log("file", file);

    if (file == null) {
      // No new image provided, update the category information only
      console.log("file", file);
      pool.query(
        "UPDATE `category` SET `name` = ?, `action_type`=?,  `edited_on` = ? WHERE id = ?",
        [
          model.name,
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
    } else {
      // New image provided, update the category information and delete the old image
      pool.query(
        "SELECT image FROM `category` WHERE id = ?",
        [model.id],
        (error, results) => {
          if (error) {
            return callBack(error);
          }

          const imageFileName = results[0].image; // Assuming there's only one result

          const scriptDir = __dirname;

          // Use '..' to navigate up one directory to the root directory
          const uploadDir = path.join(scriptDir, "..", "upload_category");

          // Now, you can access files in the "upload" directory
          const imagePath = path.join(uploadDir, imageFileName);

          fs.unlink(imagePath, (unlinkError) => {
            if (unlinkError) {
              return callBack(unlinkError);
            }

            // After the image is deleted, update the category information
            pool.query(
                "UPDATE `category` SET `name` = ?, `image`=?, `action_type`=?, `edited_on` = ? WHERE id = ?",
                [
                  model.name,
                  file.filename,
                  2,
                  formattedDate,
                  model.id,
                ]                ,
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

  getCategorysById: (model, callBack) => {
    pool.query(
      "SELECT * FROM category WHERE id LIKE ?",
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

// CREATE TABLE `category` (
//     `id` bigint PRIMARY KEY,
//     `name` varchar(255),
//     `image` varchar(255),
//     `description` varchar(255),
//     `discount` double,
//     `price` double,
//     `unit_price` double,
//     `category_id` bigint,
//     `category` varchar(255),
//     `sub_category` varchar(255),
//     `stock` int,
//     `action_type` integer,
//     `created_on` datetime,
//     `edited_on` datetime
//   );
