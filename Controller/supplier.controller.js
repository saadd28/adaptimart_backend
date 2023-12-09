// const UserService = require()

const supplierService = require("../Services/supplier.service");

module.exports = {
  postSupplier: (req, res) => {
    supplierService.postSupplier(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  getAllSuppliers: (req, res) => {
    supplierService.getAllSuppliers((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  deleteSupplier: (req, res) => {
    const id = req.body.id;
    console.log("req.body", req.body);
    supplierService.deleteSupplier(id, (error, result) => {
      if (result.affectedRows === 1) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getSuppliersByName: (req, res) => {
    console.log("req.query", req.query);
    supplierService.getSuppliersByName(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  updateSupplier: (req, res) => {
    supplierService.updateSupplier(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getSuppliersById: (req, res) => {
    console.log("req.query", req.query);
    supplierService.getSuppliersById(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
};
