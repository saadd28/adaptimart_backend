// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postSupplier, getAllSuppliers, deleteSupplier, getSuppliersByName, updateSupplier, getSuppliersById } = require("../Controller/supplier.controller");

const router = require("express").Router();

router.post("/add", postSupplier);
router.get("/getall", getAllSuppliers);
router.put("/delete", deleteSupplier);
router.get("/getbyname", getSuppliersByName);
router.post("/update", updateSupplier);
router.get("/getbyid", getSuppliersById);


module.exports = router;
