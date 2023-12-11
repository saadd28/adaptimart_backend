// const UserService = require()

const lookupService = require("../Services/lookup.service");

module.exports = {
  getById: (req, res) => {
    console.log("req.query", req.query);
    lookupService.getById(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  getByParentId: (req, res) => {
    console.log("req.query", req.query);
    lookupService.getByParentId(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  getNullParentId: (req, res) => {
    // console.log("req.query", req.query);
    lookupService.getNullParentId((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
};
