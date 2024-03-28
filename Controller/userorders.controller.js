const userordersService = require("../Services/userorders.service");

module.exports = {
getUserOrdersByID: (req, res) => {
  console.log("req.query", req.query);
  userordersService.getUserOrdersByID(req.query, (error, result) => {
  if (result) return res.status(200).send(result);
  else return res.status(500).send(error);
  });
},
}