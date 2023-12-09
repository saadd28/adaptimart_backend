// const UserService = require()

const categoryService = require("../Services/category.service");

module.exports = {
  postCategory: (req, res) => {
    categoryService.postCategory(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  getAllCategorys: (req, res) => {
    categoryService.getAllCategorys((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  deleteCategory: (req, res) => {
    const id = req.body.id;
    console.log("req.body", req.body);
    categoryService.deleteCategory(id, (error, result) => {
      if (result.affectedRows === 1) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getCategorysByName: (req, res) => {
    console.log("req.query", req.query);
    categoryService.getCategorysByName(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  updateCategory: (req, res) => {
    categoryService.updateCategory(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getCategorysById: (req, res) => {
    console.log("req.query", req.query);
    categoryService.getCategorysById(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
};
