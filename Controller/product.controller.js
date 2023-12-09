// const UserService = require()

const productService = require("../Services/product.service");

module.exports = {
  postProduct: (req, res) => {
    productService.postProduct(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  getAllProducts: (req, res) => {
    productService.getAllProducts((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  deleteProduct: (req, res) => {
    const id = req.body.id;
    console.log("req.body", req.body);
    productService.deleteProduct(id, (error, result) => {
      if (result.affectedRows === 1) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getProductsByName: (req, res) => {
    console.log("req.query", req.query);
    productService.getProductsByName(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  updateProduct: (req, res) => {
    productService.updateProduct(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getProductsById: (req, res) => {
    console.log("req.query", req.query);
    productService.getProductsById(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
};
