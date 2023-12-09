// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postProduct, getAllProducts, deleteProduct, getProductsByName, updateProduct, getProductsById } = require("../Controller/product.controller");

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

router.post("/add", upload, postProduct);
router.get("/getall", getAllProducts);
router.put("/delete", deleteProduct);
router.get("/getbyname", getProductsByName);
router.post("/update", upload, updateProduct);
router.get("/getbyid", getProductsById);


module.exports = router;
