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
      "INSERT INTO `user` (`first_name`, `last_name`, `email`, `phone`, `otp`, `otp_generation_time`, `verified`, `password`, `role_id`, `status`, `profile_pic`, `address`, `city`, `state`, `country`, `postal_code`, `action_type`, `created_on`, `edited_on`)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
          2,
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

  postAdminAccount: (model, file, callback) => {
    console.log("API CALLED");

    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log("model:", model);
//id	first_name	last_name	email	phone	otp	otp_generation_time	verified	password	role_id	profile_pic	address	city	state	country	postal_code	action_type	created_on	edited_on
    pool.query(
      "INSERT INTO `user` (`first_name`, `last_name`, `email`, `phone`, `otp`, `otp_generation_time`, `verified`, `password`, `role_id`, `status`, `profile_pic`, `action_type`, `created_on`, `edited_on`)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
          model.first_name,
          model.last_name,
          model.email,
          model.phone,
          null,
          null,
          1,
          model.password,
          2,
          2,
          file.filename,
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
    const query =
      "SELECT " +
      "user.id AS user_id, " +
      "user.first_name, " +
      "user.last_name, " +
      "user.email, " +
      "user.phone, " +
      "user.otp, " +
      "user.otp_generation_time, " +
      "user.verified, " +
      "user.password, " +
      "user.status AS user_status, " +
      "user.role_id, " +
      "user.profile_pic, " +
      "user.address, " +
      "user.city, " +
      "user.state, " +
      "user.country, " +
      "user.postal_code, " +
      "user.created_on, " +
      "order.id AS order_id, " +
      "order.status AS order_status, " +
      "order.date_placed, " +
      "order.date_processed, " +
      "order.date_shipped, " +
      "order.date_delivered, " +
      "order.total_price, " +
      "order.discount, " +
      "order.promo_code, " +
      "order.payment_status, " +
      "order.action_type, " +
      "order.created_on AS order_created_on, " +
      "order.edited_on, " +
      "order_product.product_id, " +
      "order_product.quantity, " +
      "product.name AS product_name, " +
      "product.price AS product_price, " +
      "product.description AS product_description, " +
      "product.image AS product_image " +
      "FROM `user` " +
      "LEFT JOIN `order` ON user.id = order.user_id " +
      "LEFT JOIN order_product ON order.id = order_product.order_id " +
      "LEFT JOIN product ON order_product.product_id = product.id " +
      "WHERE user.role_id = 1";
  
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        return callBack(error);
      }
  
      // Group the results by user_id to create a nested structure
      const usersWithOrders = results.reduce((acc, row) => {
        const userId = row.user_id;
  
        if (!acc[userId]) {
          // Initialize the entry for this user
          acc[userId] = {
            user_id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            phone: row.phone,
            otp: row.otp,
            otp_generation_time: row.otp_generation_time,
            verified: row.verified,
            password: row.password,
            user_status: row.user_status,
            role_id: row.role_id,
            profile_pic: row.profile_pic,
            address: row.address,
            city: row.city,
            state: row.state,
            country: row.country,
            postal_code: row.postal_code,
            created_on: row.created_on,
            orders: [],
          };
        }
  
        // Append order details to the orders array
        if (row.order_id) {
          acc[userId].orders.push({
            order_id: row.order_id,
            order_status: row.order_status,
            date_placed: row.date_placed,
            date_processed: row.date_processed,
            date_shipped: row.date_shipped,
            date_delivered: row.date_delivered,
            total_price: row.total_price,
            discount: row.discount,
            promo_code: row.promo_code,
            payment_status: row.payment_status,
            action_type: row.action_type,
            order_created_on: row.order_created_on,
            edited_on: row.edited_on,
            products: [],
          });
        }
  
        // Append product details to the products array within the order
        if (row.product_id) {
          const currentOrder = acc[userId].orders[acc[userId].orders.length - 1];
          currentOrder.products.push({
            product_id: row.product_id,
            quantity: row.quantity,
            product_name: row.product_name,
            product_price: row.product_price,
            product_description: row.product_description,
            product_image: row.product_image,
          });
        }
  
        return acc;
      }, {});
  
      // Convert the object back to an array
      const usersArray = Object.values(usersWithOrders);
  
      return callBack(null, usersArray);
    });
  },

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
    const query =
      "SELECT " +
      "user.id AS user_id, " +
      "user.first_name, " +
      "user.last_name, " +
      "user.email, " +
      "user.phone, " +
      "user.otp, " +
      "user.otp_generation_time, " +
      "user.verified, " +
      "user.password, " +
      "user.status AS user_status, " +
      "user.role_id, " +
      "user.profile_pic, " +
      "user.address, " +
      "user.city, " +
      "user.state, " +
      "user.country, " +
      "user.postal_code, " +
      "user.created_on, " +
      "order.id AS order_id, " +
      "order.status AS order_status, " +
      "order.date_placed, " +
      "order.date_processed, " +
      "order.date_shipped, " +
      "order.date_delivered, " +
      "order.total_price, " +
      "order.discount, " +
      "order.promo_code, " +
      "order.payment_status, " +
      "order.action_type, " +
      "order.created_on AS order_created_on, " +
      "order.edited_on, " +
      "order_product.product_id, " +
      "order_product.quantity, " +
      "product.name AS product_name, " +
      "product.price AS product_price, " +
      "product.description AS product_description, " +
      "product.image AS product_image " +
      "FROM `user` " +
      "LEFT JOIN `order` ON user.id = order.user_id " +
      "LEFT JOIN order_product ON order.id = order_product.order_id " +
      "LEFT JOIN product ON order_product.product_id = product.id " +
      "WHERE user.role_id = 1 and user.first_name LIKE ? or user.role_id = 1 and user.last_name LIKE ?";
  
    pool.query(query, 
      [`%${model.name}%`, `%${model.name}%`],
       (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        return callBack(error);
      }
  
      // Group the results by user_id to create a nested structure
      const usersWithOrders = results.reduce((acc, row) => {
        const userId = row.user_id;
  
        if (!acc[userId]) {
          // Initialize the entry for this user
          acc[userId] = {
            user_id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            phone: row.phone,
            otp: row.otp,
            otp_generation_time: row.otp_generation_time,
            verified: row.verified,
            password: row.password,
            user_status: row.user_status,
            role_id: row.role_id,
            profile_pic: row.profile_pic,
            address: row.address,
            city: row.city,
            state: row.state,
            country: row.country,
            postal_code: row.postal_code,
            created_on: row.created_on,
            orders: [],
          };
        }
  
        // Append order details to the orders array
        if (row.order_id) {
          acc[userId].orders.push({
            order_id: row.order_id,
            order_status: row.order_status,
            date_placed: row.date_placed,
            date_processed: row.date_processed,
            date_shipped: row.date_shipped,
            date_delivered: row.date_delivered,
            total_price: row.total_price,
            discount: row.discount,
            promo_code: row.promo_code,
            payment_status: row.payment_status,
            action_type: row.action_type,
            order_created_on: row.order_created_on,
            edited_on: row.edited_on,
            products: [],
          });
        }
  
        // Append product details to the products array within the order
        if (row.product_id) {
          const currentOrder = acc[userId].orders[acc[userId].orders.length - 1];
          currentOrder.products.push({
            product_id: row.product_id,
            quantity: row.quantity,
            product_name: row.product_name,
            product_price: row.product_price,
            product_description: row.product_description,
            product_image: row.product_image,
          });
        }
  
        return acc;
      }, {});
  
      // Convert the object back to an array
      const usersArray = Object.values(usersWithOrders);
  
      return callBack(null, usersArray);
    });
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
    const query =
      "SELECT " +
      "user.id AS user_id, " +
      "user.first_name, " +
      "user.last_name, " +
      "user.email, " +
      "user.phone, " +
      "user.otp, " +
      "user.otp_generation_time, " +
      "user.verified, " +
      "user.password, " +
      "user.status AS user_status, " +
      "user.role_id, " +
      "user.profile_pic, " +
      "user.address, " +
      "user.city, " +
      "user.state, " +
      "user.country, " +
      "user.postal_code, " +
      "user.created_on, " +
      "order.id AS order_id, " +
      "order.status AS order_status, " +
      "order.date_placed, " +
      "order.date_processed, " +
      "order.date_shipped, " +
      "order.date_delivered, " +
      "order.total_price, " +
      "order.discount, " +
      "order.promo_code, " +
      "order.payment_status, " +
      "order.action_type, " +
      "order.created_on AS order_created_on, " +
      "order.edited_on, " +
      "order_product.product_id, " +
      "order_product.quantity, " +
      "product.name AS product_name, " +
      "product.price AS product_price, " +
      "product.description AS product_description, " +
      "product.image AS product_image " +
      "FROM `user` " +
      "LEFT JOIN `order` ON user.id = order.user_id " +
      "LEFT JOIN order_product ON order.id = order_product.order_id " +
      "LEFT JOIN product ON order_product.product_id = product.id " +
      "WHERE user.role_id = 1 and user.id LIKE ?";
  
    pool.query(query, 
      [`%${model.id}%`],
       (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        return callBack(error);
      }
  
      // Group the results by user_id to create a nested structure
      const usersWithOrders = results.reduce((acc, row) => {
        const userId = row.user_id;
  
        if (!acc[userId]) {
          // Initialize the entry for this user
          acc[userId] = {
            user_id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            phone: row.phone,
            otp: row.otp,
            otp_generation_time: row.otp_generation_time,
            verified: row.verified,
            password: row.password,
            user_status: row.user_status,
            role_id: row.role_id,
            profile_pic: row.profile_pic,
            address: row.address,
            city: row.city,
            state: row.state,
            country: row.country,
            postal_code: row.postal_code,
            created_on: row.created_on,
            orders: [],
          };
        }
  
        // Append order details to the orders array
        if (row.order_id) {
          acc[userId].orders.push({
            order_id: row.order_id,
            order_status: row.order_status,
            date_placed: row.date_placed,
            date_processed: row.date_processed,
            date_shipped: row.date_shipped,
            date_delivered: row.date_delivered,
            total_price: row.total_price,
            discount: row.discount,
            promo_code: row.promo_code,
            payment_status: row.payment_status,
            action_type: row.action_type,
            order_created_on: row.order_created_on,
            edited_on: row.edited_on,
            products: [],
          });
        }
  
        // Append product details to the products array within the order
        if (row.product_id) {
          const currentOrder = acc[userId].orders[acc[userId].orders.length - 1];
          currentOrder.products.push({
            product_id: row.product_id,
            quantity: row.quantity,
            product_name: row.product_name,
            product_price: row.product_price,
            product_description: row.product_description,
            product_image: row.product_image,
          });
        }
  
        return acc;
      }, {});
  
      // Convert the object back to an array
      const usersArray = Object.values(usersWithOrders);
  
      return callBack(null, usersArray);
    });
  },

  blockUser: (model, callBack) => {
    pool.query(
      "UPDATE `user` SET `status` = 3 WHERE id = ?",
      [model.id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  changepassword: (model, callBack) => {
    pool.query(
      "UPDATE user SET password = ? WHERE id = ?",
      [model.password,model.id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  unblockUser: (model, callBack) => {
    pool.query(
      "UPDATE `user` SET `status` = 2 WHERE id = ?",
      [
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
  
  login: (model, callBack) => {
    const query =
      "SELECT " +
      "user.id AS user_id, " +
      "user.first_name, " +
      "user.last_name, " +
      "user.email, " +
      "user.phone, " +
      "user.otp, " +
      "user.otp_generation_time, " +
      "user.verified, " +
      "user.password, " +
      "user.status AS user_status, " +
      "user.role_id, " +
      "user.profile_pic, " +
      "user.address, " +
      "user.city, " +
      "user.state, " +
      "user.country, " +
      "user.postal_code, " +
      "user.created_on, " +
      "order.id AS order_id, " +
      "order.status AS order_status, " +
      "order.date_placed, " +
      "order.date_processed, " +
      "order.date_shipped, " +
      "order.date_delivered, " +
      "order.total_price, " +
      "order.discount, " +
      "order.promo_code, " +
      "order.payment_status, " +
      "order.action_type, " +
      "order.created_on AS order_created_on, " +
      "order.edited_on, " +
      "order_product.product_id, " +
      "order_product.quantity, " +
      "product.name AS product_name, " +
      "product.price AS product_price, " +
      "product.description AS product_description, " +
      "product.image AS product_image " +
      "FROM `user` " +
      "LEFT JOIN `order` ON user.id = order.user_id " +
      "LEFT JOIN order_product ON order.id = order_product.order_id " +
      "LEFT JOIN product ON order_product.product_id = product.id " +
      "WHERE user.role_id = 1 and user.email = ? and user.password = ?";

    pool.query(query, 
      [model.email,model.password],
       (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        return callBack(error);
      }
  
      // Group the results by user_id to create a nested structure
      const usersWithOrders = results.reduce((acc, row) => {
        const userId = row.user_id;
  
        if (!acc[userId]) {
          // Initialize the entry for this user
          acc[userId] = {
            user_id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            phone: row.phone,
            otp: row.otp,
            otp_generation_time: row.otp_generation_time,
            verified: row.verified,
            password: row.password,
            user_status: row.user_status,
            role_id: row.role_id,
            profile_pic: row.profile_pic,
            address: row.address,
            city: row.city,
            state: row.state,
            country: row.country,
            postal_code: row.postal_code,
            created_on: row.created_on,
            orders: [],
          };
        }
  
        // Append order details to the orders array
        if (row.order_id) {
          acc[userId].orders.push({
            order_id: row.order_id,
            order_status: row.order_status,
            date_placed: row.date_placed,
            date_processed: row.date_processed,
            date_shipped: row.date_shipped,
            date_delivered: row.date_delivered,
            total_price: row.total_price,
            discount: row.discount,
            promo_code: row.promo_code,
            payment_status: row.payment_status,
            action_type: row.action_type,
            order_created_on: row.order_created_on,
            edited_on: row.edited_on,
            products: [],
          });
        }
  
        // Append product details to the products array within the order
        if (row.product_id) {
          const currentOrder = acc[userId].orders[acc[userId].orders.length - 1];
          currentOrder.products.push({
            product_id: row.product_id,
            quantity: row.quantity,
            product_name: row.product_name,
            product_price: row.product_price,
            product_description: row.product_description,
            product_image: row.product_image,
          });
        }
  
        return acc;
      }, {});
  
      // Convert the object back to an array
      const usersArray = Object.values(usersWithOrders);
  
      return callBack(null, usersArray);
    });
  },

};

