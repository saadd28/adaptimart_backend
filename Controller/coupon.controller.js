// const UserService = require()

const couponService = require("../Services/coupon.service");

module.exports = {
  postCoupon: (req, res) => {
    couponService.postCoupon(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  getAllCoupons: (req, res) => {
    couponService.getAllCoupons((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  deleteCoupon: (req, res) => {
    const id = req.body.id;
    console.log("req.body", req.body);
    couponService.deleteCoupon(id, (error, result) => {
      if (result.affectedRows === 1) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getCouponsByCode: (req, res) => {
    console.log("req.query", req.query);
    couponService.getCouponsByCode(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  updateCoupon: (req, res) => {
    couponService.updateCoupon(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getCouponsById: (req, res) => {
    console.log("req.query", req.query);
    couponService.getCouponsById(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
};
