// const UserService = require()

const returnService = require("../Services/return.service");

module.exports = {

  getAllreturns: (req, res) => {
    returnService.getAllreturns((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getreturnsByName: (req, res) => {
    console.log("req.query", req.query);
    returnService.getreturnsByName(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  updatereturn: (req, res) => {
    returnService.updatereturn(req.body, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getreturnsById: (req, res) => {
    console.log("req.query", req.query);
    returnService.getreturnsById(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
};
