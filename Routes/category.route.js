// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postCategory, getAllCategorys, deleteCategory, getCategorysByName, updateCategory, getCategorysById } = require("../Controller/category.controller");

const router = require("express").Router();

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload_category/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("image");

router.post("/add", upload, postCategory);
router.get("/getall", getAllCategorys);
router.put("/delete", deleteCategory);
router.get("/getbyname", getCategorysByName);
router.post("/update", upload, updateCategory);
router.get("/getbyid", getCategorysById);


module.exports = router;
