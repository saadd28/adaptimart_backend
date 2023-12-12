const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");
const async = require('async')


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
 
  getAllreturns: (callBack) => {
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
      "LEFT JOIN product ON order_product.product_id = product.id where order.status=9 ";
  
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching orders:', error);
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
   
  getreturnsByName: (model, callBack) => {
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
    "WHERE user.role_id = 1 and user.first_name LIKE ? and order.status = 9 or user.role_id = 1 and user.last_name LIKE ? and order.status = 9"; // Filter by user's first name

    pool.query(
        query,
        [
            [`%${userName}%`],[`%${userName}%`],
        ],
        (error, results) =>{
            if (error) {
                console.error('Error fetching orders by user name:', error);
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
    )
  },

  getreturnsById: (model, callBack) => {
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
    "WHERE order.id LIKE ? and order.status=9"; // Filter by order ID

    pool.query(
        query,
        [
            [`%${id}%`],
        ],
        (error, results) =>{
            if (error) {
                console.error('Error fetching orders by order ID:', error);
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

        }
    )
  },

  markasDamaged: (model, callBack) => {
    
    // Update order status in the 'orders' table
    pool.query(
        "UPDATE `product_stock` SET `returning` = `returning` - ?, `damaged` = `damaged` + ? WHERE `product_id` = ?",
        [
          model.quantity,
          model.quantity,
          model.product_id,
        ],
        (error, results) => {
            if (error) {
                return callBack(error);
              }
            return callBack(null, results);
        }
    )
  },
  
  markasunDamaged: (model, callBack) => {
    
    // Update order status in the 'orders' table
    pool.query(
        "UPDATE `product_stock` SET `damaged` = `damaged` - ?, `available` = `available` + ? WHERE `product_id` = ?",
        [
          model.quantity,
          model.quantity,
          model.product_id,
        ],
        (error, results) => {
            if (error) {
                return callBack(error);
              }
            return callBack(null, results);
        }
    )
},
  

  
}