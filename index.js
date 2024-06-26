const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const userRoute = require("./Routes/user.route")
const productRoute = require("./Routes/product.route")
const categoryRoute = require("./Routes/category.route")
const supplierRoute = require("./Routes/supplier.route")
const shipmentRoute = require("./Routes/shipment.route")
const couponRoute = require("./Routes/coupon.route")
const accountRoute = require("./Routes/account.route")
const lookupRoute = require("./Routes/lookup.route")
const orderRoute = require("./Routes/order.route")
const productStockRoute = require("./Routes/productStock.route")
const returnRoute = require("./Routes/return.route")
const dashboardRoute = require("./Routes/dashboard.route")
const userordersRoute = require("./Routes/userorders.route")
const reviewRoute = require("./Routes/review.route")

app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/category", categoryRoute)
app.use("/api/supplier", supplierRoute)
app.use("/api/shipment", shipmentRoute)
app.use("/api/coupon", couponRoute);
app.use("/api/account", accountRoute);
app.use("/api/lookup", lookupRoute);
app.use("/api/order", orderRoute);
app.use("/api/productStock", productStockRoute);
app.use("/api/return", returnRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/userorders", userordersRoute);
app.use("/api/review", reviewRoute);

app.use(express.static("./upload"));
app.use(express.static("./upload_category"));

app.listen(4000, () =>{
    console.log("Server listening on port 4000");
})