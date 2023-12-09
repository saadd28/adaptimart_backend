// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postShipment, getAllShipments, deleteShipment, getShipmentsByName, updateShipment, getShipmentsById } = require("../Controller/shipment.controller");

const router = require("express").Router();

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("image");

router.post("/add", upload, postShipment);
router.get("/getall", getAllShipments);
router.put("/delete", deleteShipment);
router.get("/getbyname", getShipmentsByName);
router.post("/update", upload, updateShipment);
router.get("/getbyid", getShipmentsById);


module.exports = router;
