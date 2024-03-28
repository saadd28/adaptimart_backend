const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");
const async = require("async");

// Assuming product_list is an array of products in the order
function calculateTotalPrice(product_list) {
  let totalPrice = 0;

  for (const product of product_list) {
    totalPrice += product.quantity * product.price;
  }

  return totalPrice;
}

function executeCallbacksInSeries(callbacks, finalCallback) {
  if (callbacks.length === 0) {
    return finalCallback(null);
  }

  const currentCallback = callbacks.shift();
  currentCallback((error) => {
    if (error) {
      return finalCallback(error);
    }

    executeCallbacksInSeries(callbacks, finalCallback);
  });
}

module.exports = {
  postOrder: (model, file, callback) => {
    console.log("API CALLED");

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log("model:", model);

    const product_list = model.product_list;
    const totalPrice = calculateTotalPrice(product_list);

    pool.query(
      "INSERT INTO `order` (`user_id`, `status`, `total_price`, `date_placed`,`date_processed`, `date_shipped`, `date_delivered`, `payment_status`, `created_on`, `edited_on`, `action_type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        model.user_id,
        model.status,
        totalPrice,
        formattedDate,
        null,
        null,
        null,
        model.payment_status,
        formattedDate,
        null,
        1,
      ],
      (orderError, orderResults) => {
        if (orderError) {
          return callback(orderError);
        }

        const orderId = orderResults.insertId;

        // Step 2: Insert into the `order_product` table for each product in product_list
        const insertProductCallbacks = product_list.map(
          (product) => (callback) => {
            pool.query(
              "INSERT INTO `order_product` (`order_id`, `product_id`, `quantity`) VALUES (?, ?, ?)",
              [orderId, product.product_id, product.quantity],
              (productInsertError) => {
                if (productInsertError) {
                  return callback(productInsertError);
                }

                callback(null);
              }
            );
          }
        );

        // Execute the insertProduct callbacks in series
        executeCallbacksInSeries(insertProductCallbacks, (seriesError) => {
          if (seriesError) {
            return callback(seriesError);
          }

          callback(null, {
            message: "Order created successfully",
            order_id: orderId,
          });
        });
      }
    );
  },

  getAllOrders: (callBack) => {
    const query =
      "SELECT " +
      "order.id AS order_id, " +
      "order.user_id, " +
      "order.status AS order_status, " + // Rename order.status to avoid conflicts
      "order.date_placed, " +
      "order.date_processed, " +
      "order.date_shipped, " +
      "order.date_delivered, " +
      "order.total_price, " +
      "order.discount, " +
      "order.promo_code, " +
      "order.payment_status, " +
      "order.action_type, " +
      "order.created_on, " +
      "order.edited_on, " +
      "user.id AS user_id, " +
      "user.first_name, " +
      "user.last_name, " +
      "user.email, " +
      "user.phone AS user_phone, " +
      "user.status AS user_status, " +
      "user.address AS user_address, " +
      "user.city AS user_city, " +
      "user.state AS user_state, " +
      "user.country AS user_country, " +
      "user.postal_code AS user_postal_code, " +
      "order_product.product_id, " +
      "order_product.quantity, " +
      "product.name AS product_name, " +
      "product.price AS product_price, " +
      "product.description AS product_description, " +
      "product.image AS product_image " +
      "FROM `order` " +
      "LEFT JOIN user ON order.user_id = user.id " +
      "LEFT JOIN order_product ON order.id = order_product.order_id " +
      "LEFT JOIN product ON order_product.product_id = product.id";

    pool.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching orders:", error);
        return callBack(error);
      }

      // Group the results by order_id to create a nested structure
      const ordersWithProducts = results.reduce((acc, row) => {
        const orderId = row.order_id;

        if (!acc[orderId]) {
          // Initialize the entry for this order
          acc[orderId] = {
            ...row,
            products: [],
          };
        }

        // Append product details to the products array
        if (row.product_id) {
          acc[orderId].products.push({
            product_id: row.product_id,
            quantity: row.quantity,
            product_name: row.product_name,
            product_price: row.product_price,
            product_description: row.product_description,
            product_image: row.product_image, // Include the product image in the result
          });
        }

        return acc;
      }, {});

      // Convert the object back to an array
      const ordersArray = Object.values(ordersWithProducts);

      return callBack(null, ordersArray);
    });
  },

  getOrdersByName: (model, callBack) => {
    const userName = model.name;

    const query =
      "SELECT " +
      "order.id AS order_id, " +
      "order.user_id, " +
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
      "order.created_on, " +
      "order.edited_on, " +
      "user.id AS user_id, " +
      "user.first_name, " +
      "user.last_name, " +
      "user.email, " +
      "user.phone AS user_phone, " +
      "user.status AS user_status, " +
      "user.address AS user_address, " +
      "user.city AS user_city, " +
      "user.state AS user_state, " +
      "user.country AS user_country, " +
      "user.postal_code AS user_postal_code, " +
      "order_product.product_id, " +
      "order_product.quantity, " +
      "product.name AS product_name, " +
      "product.price AS product_price, " +
      "product.description AS product_description, " +
      "product.image AS product_image " +
      "FROM `order` " +
      "LEFT JOIN user ON order.user_id = user.id " +
      "LEFT JOIN order_product ON order.id = order_product.order_id " +
      "LEFT JOIN product ON order_product.product_id = product.id " +
      "WHERE user.role_id = 1 and user.first_name LIKE ? or user.role_id = 1 and user.last_name LIKE ?"; // Filter by user's first name

    pool.query(
      query,
      [[`%${userName}%`], [`%${userName}%`]],
      (error, results) => {
        if (error) {
          console.error("Error fetching orders by user name:", error);
          return callBack(error);
        }
        const ordersWithProducts = results.reduce((acc, row) => {
          const orderId = row.order_id;

          if (!acc[orderId]) {
            // Initialize the entry for this order
            acc[orderId] = {
              ...row,
              products: [],
            };
          }

          // Append product details to the products array
          if (row.product_id) {
            acc[orderId].products.push({
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
        const ordersArray = Object.values(ordersWithProducts);

        return callBack(null, ordersArray);
      }
    );
  },
  getOrdersByID: (model, callBack) => {
    const id = model.id;

    const query =
      "SELECT " +
      "order.id AS order_id, " +
      "order.user_id, " +
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
      "order.created_on, " +
      "order.edited_on, " +
      "user.id AS user_id, " +
      "user.first_name, " +
      "user.last_name, " +
      "user.email, " +
      "user.phone AS user_phone, " +
      "user.status AS user_status, " +
      "user.address AS user_address, " +
      "user.city AS user_city, " +
      "user.state AS user_state, " +
      "user.country AS user_country, " +
      "user.postal_code AS user_postal_code, " +
      "order_product.product_id, " +
      "order_product.quantity, " +
      "product.name AS product_name, " +
      "product.price AS product_price, " +
      "product.description AS product_description, " +
      "product.image AS product_image " +
      "FROM `order` " +
      "LEFT JOIN user ON order.user_id = user.id " +
      "LEFT JOIN order_product ON order.id = order_product.order_id " +
      "LEFT JOIN product ON order_product.product_id = product.id " +
      "WHERE order.id LIKE ?"; // Filter by order ID

    pool.query(query, [[`%${id}%`]], (error, results) => {
      if (error) {
        console.error("Error fetching orders by order ID:", error);
        return callBack(error);
      }

      // Group the results by order_id to create a nested structure
      const ordersWithProducts = results.reduce((acc, row) => {
        const orderId = row.order_id;

        if (!acc[orderId]) {
          // Initialize the entry for this order
          acc[orderId] = {
            ...row,
            products: [],
          };
        }

        // Append product details to the products array
        if (row.product_id) {
          acc[orderId].products.push({
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
      const ordersArray = Object.values(ordersWithProducts);

      return callBack(null, ordersArray);
    });
  },

  updateOrderStatus: (model, callBack) => {
    const updatedStatus = model.status + 1;
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    let update_query = "";
    let updateParams = [];

    if (updatedStatus < 8) {
      update_query =
        "UPDATE `order` SET `status` = ? , `edited_on` = ?, `action_type` = ? WHERE `id` = ?";
      updateParams = [updatedStatus, formattedDate, 2, model.order_id];
    } else {
      update_query =
        "UPDATE `order` SET `payment_status` = ?, `status` = ? , `edited_on` = ?, `action_type` = ? WHERE `id` = ?";
      updateParams = [1, updatedStatus, formattedDate, 2, model.order_id];
    }

    // Update order status in the 'orders' table
    pool.query(update_query, updateParams, (orderError, orderResults) => {
      if (orderError) {
        return callBack(orderError);
      }
      console.log("status", updatedStatus);
      console.log(model);

      // Update product inventory in the 'product_stock' table
      async.each(
        model.product_list,
        (product, productCallback) => {
          console.log("product", product);
          // Assuming there's a table 'product_stock' with columns 'product_id', 'quantity', 'available', 'pending', 'in_delivery'
          if (updatedStatus === 6) {
            // Subtract quantity from 'available' and add to 'pending'
            pool.query(
              "UPDATE `product_stock` SET `available` = `available` - ?, `pending` = `pending` + ? WHERE `product_id` = ?",
              [product.quantity, product.quantity, product.product_id],
              (stockError, stockResults) => {
                if (stockError) {
                  return productCallback(stockError);
                }

                pool.query("Update `order` set `date_processed` = ?", [
                  formattedDate,
                ]);
                // You can perform additional logic or checks here if needed
                productCallback(null);
              }
            );
          } else if (updatedStatus === 7) {
            // Subtract quantity from 'pending' and add to 'in_delivery'
            pool.query(
              "UPDATE `product_stock` SET `pending` = `pending` - ?, `in_delivery` = `in_delivery` + ? WHERE `product_id` = ?",
              [product.quantity, product.quantity, product.product_id],
              (stockError, stockResults) => {
                if (stockError) {
                  return productCallback(stockError);
                }
                pool.query("Update `order` set `date_shipped` = ?", [
                  formattedDate,
                ]);

                // You can perform additional logic or checks here if needed
                productCallback(null);
              }
            );
          } else if (updatedStatus === 8) {
            // Subtract quantity from 'in_delivery' and add to 'delivered'
            pool.query(
              "UPDATE `product_stock` SET `in_delivery` = `in_delivery` - ?, `delivered` = `delivered` + ? WHERE `product_id` = ?",
              [product.quantity, product.quantity, product.product_id],
              (stockError, stockResults) => {
                if (stockError) {
                  return productCallback(stockError);
                }

                pool.query("Update `order` set `date_delivered` = ?", [
                  formattedDate,
                ]);

                // You can perform additional logic or checks here if needed
                productCallback(null);
              }
            );
          } else if (updatedStatus === 9) {
            // Subtract quantity from 'delivered' and add to 'returned'
            pool.query(
              "UPDATE `product_stock` SET `delivered` = `delivered` - ?, `returning` = `returning` + ? WHERE `product_id` = ?",
              [product.quantity, product.quantity, product.product_id],
              (stockError, stockResults) => {
                if (stockError) {
                  return productCallback(stockError);
                }
                // You can perform additional logic or checks here if needed
                productCallback(null);
              }
            );
          }
        },
        (asyncError) => {
          if (asyncError) {
            return callBack(asyncError);
          }

          // Success, return the results
          return callBack(null, {
            message: "Order status and product inventory updated successfully",
          });
        }
      );
    });
  },
};
