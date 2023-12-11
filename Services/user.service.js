const pool = require("../config/databse");
const bcrypt = require("bcrypt");

module.exports = {
  postUser: (model, callback) => {
    console.log("API CALLED")

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    pool.query(
      "SELECT COUNT(*) as count FROM `user` WHERE `email` = ?",
      [model.email],
      (error, results) => {
        if (error) {
          return callback(error);
        }

        if (results[0].count > 0) {
          // Email already exists, return an error
          return callback("Email is already registered.");
        }

        // If the email doesn't exist, proceed with the insertion
        bcrypt.hash(model.password, 10, (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
          } else {
            // 'hash' contains the hashed password
            console.log("Hashed Password:", hash);

            pool.query(
              "INSERT INTO `user`(`first_name`, `last_name`, `email`, `phone`, `verified`, `password`, `role_id`, `action_type`, `created_on`)  VALUES (?,?,?,?,?,?,?,?,?)",
              [
                model.first_name,
                model.last_name,
                model.email,
                model.phone,
                model.verified,
                hash,
                1,
                0,
                formattedDate,
              ],
              (insertError, insertResults) => {
                if (insertError) {
                  return callback(insertError);
                }
                return callback(null, insertResults);
              }
            );
          }
        });
      }
    );


  },

  authenticateUser: (model, callback) => {
    pool.query(
      "SELECT * FROM `user` WHERE `email` = ?",
      [model.email],
      (error, results) => {
        if (error) {
            callback(error)
        //   return ;
        }

        if (results.length === 0) {
          callback(error);
        }

        const user = results[0];

        bcrypt.compare(model.password, user.password, (err, result) => {
          if (err) {
            callback(err);
            console.error("Error comparing passwords:", err);
          } else if (result) {
            callback(null, results);
            console.log("Password is correct. Login successful.");
          } else {
            callback(err);
            console.log("Password is incorrect. Login failed.");
          }
        });

      }
    );
  },
};
