// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postShipment, getAllShipments, deleteShipment, getShipmentsByName, updateShipment, getShipmentsById } = require("../Controller/shipment.controller");

const router = require("express").Router();

router.post("/add", postShipment);
router.get("/getall", getAllShipments);
router.put("/delete", deleteShipment);
router.get("/getbyname", getShipmentsByName);
router.post("/update", updateShipment);
router.get("/getbyid", getShipmentsById);


module.exports = router;
