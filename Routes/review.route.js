// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postReview, getAllReviews, getReviewsByName, getReviewsById, updateReview, deleteReview } = require("../Controller/review.controller");

const router = require("express").Router();

router.post("/add", postReview);
router.get("/getall", getAllReviews);
router.get("/getbyname", getReviewsByName);
router.get("/getbyid", getReviewsById);
router.post("/update", updateReview);
router.put("/delete", deleteReview);



module.exports = router;
