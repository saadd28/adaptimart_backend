// const UserService = require()

const lookupService = require("../Services/dashboard.service");

module.exports = {
  gettotalrevenue: (req, res) => {
    console.log("req.query", req.query);
    lookupService.gettotalrevenue(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  gettotalsales: (req, res) => {
    console.log("req.query", req.query);
    lookupService.gettotalsales(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  gettotalskus: (req, res) => {
    // console.log("req.query", req.query);
    lookupService.gettotalskus((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  gettotalusers: (req, res) => {
    // console.log("req.query", req.query);
    lookupService.gettotalusers((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  gettopsellingskus: (req, res) => {
    // console.log("req.query", req.query);
    lookupService.gettopsellingskus((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
};




