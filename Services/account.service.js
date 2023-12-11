const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");

module.exports = {
  postAccount: (model, file, callback) => {
    console.log("API CALLED");

    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log("model:", model);
//id	first_name	last_name	email	phone	otp	otp_generation_time	verified	password	role_id	profile_pic	address	city	state	country	postal_code	action_type	created_on	edited_on
    pool.query(
      "INSERT INTO `user` (`first_name`, `last_name`, `email`, `phone`, `otp`, `otp_generation_time`, `verified`, `password`, `role_id`, `profile_pic`, `address`, `city`, `state`, `country`, `postal_code`, `action_type`, `created_on`, `edited_on`)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
          model.first_name,
          model.last_name,
          model.email,
          model.phone,
          null,
          null,
          0,
          model.password,
          1,
          file.filename,
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
            console.log("error", error);
          return callback(error);
        }
        console.log("results", results);
        return callback(null, results);
      }
    );
  },

  getAllAccounts: (callBack) => {
    pool.query(`SELECT * FROM user`, (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

//   deleteAccount: (id, callBack) => {
//     console.log("id", id);

//     pool.query(
//       "SELECT profile_pic FROM `user` WHERE id = ?",
//       [id],
//       (error, results) => {
//         if (error) {
//           return callBack(error);
//         }

//         const imageFileName = results[0].profile_pic; // Assuming there's only one result

//         const scriptDir = __dirname;

//         // Use '..' to navigate up one directory to the root directory
//         const uploadDir = path.join(scriptDir, "..", "upload");

//         // Now, you can access files in the "upload" directory
//         const imagePath = path.join(uploadDir, imageFileName);

//         fs.unlink(imagePath, (unlinkError) => {
//           if (unlinkError) {
//             return callBack(unlinkError);
//           }

//           // After the image is deleted, update the Account information
//           pool.query(
//             "DELETE FROM `user` WHERE id = ?",
//             [id],
//             (error, results) => {
//               if (error) {
//                 return callBack(error);
//               }
//               console.log("results", results);
//               return callBack(null, results);
//             }
//           );
//         });
//       }
//     );
//   },

  deleteAccount: (id, callBack) => {
    console.log("id", id);

    pool.query(
      "SELECT `profile_pic` FROM `user` WHERE `id` = ?",
      [id],
      (error, results) => {
          if (error) {
            console.log("error", error);
            return callBack(error);
        }

          const imageFileName = results[0].profile_pic; // Assuming there's only one result
          console.log("imageFileName", imageFileName);

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
            "DELETE FROM `user` WHERE `id` = ?",
            [id],
            (error, results) => {
              if (error) {
                console.log("error", error);
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
  
  
  
  
  getAccountsByName: (model, callBack) => {
    pool.query(
      "SELECT * FROM user WHERE first_name LIKE ?",
      [`%${model.first_name}%`],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateAccount: (model, file, callBack) => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // console.log("file", file);

    if (file == null) {
      // No new image provided, update the account information only
      console.log("file", file);
      pool.query(
        "UPDATE `user` SET `first_name` = ?, `last_name` = ?, `email` = ?, `phone` = ?, `password` = ?, `address` = ?, `city` = ?, `state` = ?, `country` = ?, `postal_code` = ?,`action_type` = ? ,`edited_on` = ? WHERE id = ?",
        [
          model.first_name,
          model.last_name,
          model.email,
          model.phone,
          model.password,
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
    } else {
      // New image provided, update the account information and delete the old image
      pool.query(
        "SELECT profile_pic FROM `user` WHERE id = ?",
        [model.id],
        (error, results) => {
          if (error) {
            return callBack(error);
          }
          console.log("results", results[0])
          const imageFileName = results[0].profile_pic; // Assuming there's only one result

          const scriptDir = __dirname;

          // Use '..' to navigate up one directory to the root directory
          const uploadDir = path.join(scriptDir, "..", "upload");

          // Now, you can access files in the "upload" directory
          const imagePath = path.join(uploadDir, imageFileName);

          fs.unlink(imagePath, (unlinkError) => {
            if (unlinkError) {
              return callBack(unlinkError);
            }

            // After the image is deleted, update the account information
            pool.query(
              "UPDATE `user` SET `first_name` = ?, `last_name` = ?, `email` = ?, `phone` = ?,`password` = ?, `profile_pic`= ?, `address` = ?, `city` = ?, `state` = ?, `country` = ?, `postal_code` = ?, `action_type` = ?,`edited_on` = ? WHERE id = ?",
              [
                model.first_name,
                model.last_name,
                model.email,
                model.phone,
                model.password,
                file.filename,
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
          });
        }
      );
    }
  },

  getAccountsById: (model, callBack) => {
    pool.query(
      "SELECT * FROM user WHERE id LIKE ?",
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

// CREATE TABLE `account` (
//     `id` bigint PRIMARY KEY,
//     `name` varchar(255),
//     `image` varchar(255),
//     `description` varchar(255),
//     `discount` double,
//     `price` double,
//     `unit_price` double,
//     `Account_id` bigint,
//     `Account` varchar(255),
//     `sub_Account` varchar(255),
//     `stock` int,
//     `action_type` integer,
//     `created_on` datetime,
//     `edited_on` datetime
//   );