// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postOrder, getAllOrders, getOrdersByName, getOrdersByID, updateOrderStatus } = require("../Controller/order.controller");

const router = require("express").Router();

router.post("/add", postOrder);
router.get("/getall", getAllOrders);
router.get("/getbyname", getOrdersByName);
router.get("/getbyid", getOrdersByID);
router.post("/update", updateOrderStatus);
// router.put("/delete", deleteProduct);


module.exports = router;
