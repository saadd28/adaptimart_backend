// const UserService = require()

const reviewService = require("../Services/review.service");

module.exports = {
  postReview: (req, res) => {
    reviewService.postReview(req.body, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  getAllReviews: (req, res) => {
    reviewService.getAllReviews((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  getTotal: (req, res) => {
    console.log("req.query", req.query);
    reviewService.getTotal(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  deleteReview: (req, res) => {
    const id = req.body.id;
    console.log("req.body", req.body);
    reviewService.deleteReview(id, (error, result) => {
      if (result.affectedRows === 1) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getReviewsByName: (req, res) => {
    console.log("req.query", req.query);
    reviewService.getReviewsByName(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  updateReview: (req, res) => {
    reviewService.updateReview(req.body, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getReviewsById: (req, res) => {
    console.log("req.query", req.query);
    reviewService.getReviewsById(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getReviewsByProductId: (req, res) => {
    console.log("req.query", req.query);
    reviewService.getReviewsByProductId(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
};
