// const UserService = require()

const shipmentService = require("../Services/shipment.service");

module.exports = {
  postShipment: (req, res) => {
    shipmentService.postShipment(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  getAllShipments: (req, res) => {
    shipmentService.getAllShipments((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  deleteShipment: (req, res) => {
    const id = req.body.id;
    console.log("req.body", req.body);
    shipmentService.deleteShipment(id, (error, result) => {
      if (result.affectedRows === 1) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getShipmentsByName: (req, res) => {
    console.log("req.query", req.query);
    shipmentService.getShipmentsByName(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  updateShipment: (req, res) => {
    shipmentService.updateShipment(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getShipmentsById: (req, res) => {
    console.log("req.query", req.query);
    shipmentService.getShipmentsById(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
};
