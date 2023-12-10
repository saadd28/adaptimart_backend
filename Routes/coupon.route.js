// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postCoupon, getAllCoupons, deleteCoupon, getCouponsByCode, updateCoupon, getCouponsById, getCouponsByDescription } = require("../Controller/coupon.controller");

const router = require("express").Router();

router.post("/add", postCoupon);
router.get("/getall", getAllCoupons);
router.put("/delete", deleteCoupon);
router.get("/getbycode", getCouponsByCode);
router.post("/update", updateCoupon);
router.get("/getbyid", getCouponsById);
router.get("/getbydescription", getCouponsByDescription);


module.exports = router;
