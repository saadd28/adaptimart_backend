// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postReview, getAllReviews, getReviewsByName, getReviewsById, updateReview, deleteReview , getReviewsByProductId, getTotal} = require("../Controller/review.controller");

const router = require("express").Router();

router.post("/add", postReview);
router.get("/getall", getAllReviews);
router.get("/gettotal", getTotal);
router.get("/getbyname", getReviewsByName);
router.get("/getbyid", getReviewsById);
router.get("/getbypid", getReviewsByProductId);
router.post("/update", updateReview);
router.put("/delete", deleteReview);




module.exports = router;
