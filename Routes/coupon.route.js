// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postCoupon, getAllCoupons, deleteCoupon, getCouponsByCode, updateCoupon, getCouponsById } = require("../Controller/coupon.controller");

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

router.post("/add", upload, postCoupon);
router.get("/getall", getAllCoupons);
router.put("/delete", deleteCoupon);
router.get("/getbycode", getCouponsByCode);
router.post("/update", upload, updateCoupon);
router.get("/getbyid", getCouponsById);


module.exports = router;
