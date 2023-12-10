const pool = require("../config/databse");
const path = require("path");
const fs = require("fs");

module.exports = {
  postProduct: (model, file, callback) => {
    console.log("API CALLED");

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log("model:", model);

    // Step 1: Fetch the 'category_id' based on the category name
    pool.query(
      "SELECT `id` FROM `category` WHERE `name` = ?",
      [model.categoryName], // Assuming there is a 'category' table with a 'name' column
      (categoryError, categoryResults) => {
        if (categoryError) {
          return callback(categoryError);
        }

        const categoryId = categoryResults[0].id;

        // Step 2: Insert into the 'product' table
        pool.query(
          "INSERT INTO `product` (`name`, `description`, `image`, `overall_discount`, `item_discount`, `price`, `unit_price`, `created_on`, `category_id`, `action_type`)  VALUES (?,?,?,?,?,?,?,?,?,?)",
          [
            model.name,
            model.description,
            file.filename,
            0,
            0,
            model.price,
            model.price,
            formattedDate,
            categoryId,
            1,
          ],
          (error, productResults) => {
            if (error) {
              return callback(error);
            }

            const productId = productResults.insertId;

            // Step 3: Insert into the 'product_stock' table
            pool.query(
              "INSERT INTO `product_stock` (`product_id`, `available`, `pending`, `in_delivery`, `delivered`, `returning`, `damaged`, `action_type`, `created_on`) VALUES (?,?,?,?,?,?,?,?,?)",
              [
                productId,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                formattedDate,
              
              ],
              (stockError, stockResults) => {
                if (stockError) {
                  return callback(stockError);
                }

                // Step 4: Fetch the 'supplier_id' based on the supplier name
                pool.query(
                  "SELECT `id` FROM `supplier` WHERE `name` = ?",
                  [model.supplierName], // Assuming there is a 'supplier' table with a 'name' column
                  (supplierError, supplierResults) => {
                    if (supplierError) {
                      return callback(supplierError);
                    }

                    const supplierId = supplierResults[0].id;

                    // Step 5: Insert into the 'supplier_product' table
                    pool.query(
                      "INSERT INTO `supplier_product` (`supplier_id`, `product_id`) VALUES (?, ?)",
                      [
                        supplierId, 
                        productId
                      ],
                      (supplierProductError, supplierProductResults) => {
                        if (supplierProductError) {
                          return callback(supplierProductError);
                        }

                        console.log("Product added successfully");
                        return callback(null, productResults);
                      }
                    );
                  }
                );
              }
            );
          }
        );
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

  deleteProduct: (productId, callback) => {
    console.log("DELETE API CALLED");

    // Step 1: Delete from the 'supplier_product' table
    pool.query(
        "DELETE FROM `supplier_product` WHERE `product_id` = ?",
        [productId],
        (supplierProductError, supplierProductResults) => {
            if (supplierProductError) {
                return callback(supplierProductError);
            }

            // Step 2: Delete from the 'product_stock' table
            pool.query(
                "DELETE FROM `product_stock` WHERE `product_id` = ?",
                [productId],
                (stockError, stockResults) => {
                    if (stockError) {
                        return callback(stockError);
                    }
                    
                    pool.query(
                      "SELECT image FROM `product` WHERE id = ?",
                      [productId],
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
                          // Step 3: Delete from the 'product' table
                          pool.query(
                            "DELETE FROM `product` WHERE `id` = ?",
                            [productId],
                            (error, productResults) => {
                                if (error) {
                                    return callback(error);
                                }

                                console.log("Product deleted successfully");
                                return callback(null, productResults);
                            }
                          );
                        });
                      }
                    );
                    
                }
            );
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
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

    // Fetch the 'categoryId' based on the category name
    pool.query(
        "SELECT `id` FROM `category` WHERE `name` = ?",
        [model.categoryName],
        (categoryError, categoryResults) => {
            if (categoryError) {
                return callBack(categoryError);
            }

            const categoryId = categoryResults[0].id;

            if (file == null) {
                // No new image provided, update the product information only
                pool.query(
                    "UPDATE `product` SET `name` = ?, `description` = ?, `overall_discount` = ?, `item_discount` = ?,  `price` = ?, `unit_price` = ?, `category_id` = ?, `action_type` = ?, `edited_on` = ? WHERE id = ?",
                    [
                        model.name,
                        model.description,
                        0,
                        model.item_discount,
                        model.price,
                        model.price,
                        categoryId,
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
                                "UPDATE `product` SET `name` = ?, `description` = ?, `image` = ?, `item_discount` = ?, `price` = ?, `unit_price` = ?, `category_id` = ?, `action_type` = ?, `edited_on` = ? WHERE id = ?",
                                [
                                    model.name,
                                    model.description,
                                    file.filename,
                                    model.item_discount,
                                    model.price,
                                    model.price,
                                    categoryId,
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
        }
    );
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

// CREATE TABLE `product` (
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