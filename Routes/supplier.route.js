// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postSupplier, getAllSuppliers, deleteSupplier, getSuppliersByName, updateSupplier, getSuppliersById } = require("../Controller/supplier.controller");

const router = require("express").Router();

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("image");

router.post("/add", upload, postSupplier);
router.get("/getall", getAllSuppliers);
router.put("/delete", deleteSupplier);
router.get("/getbyname", getSuppliersByName);
router.post("/update", upload, updateSupplier);
router.get("/getbyid", getSuppliersById);


module.exports = router;
