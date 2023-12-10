const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const userRoute = require("./Routes/user.route")
const productRoute = require("./Routes/product.route")
const couponRoute = require("./Routes/coupon.route")
const accountRoute = require("./Routes/account.route")

app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/coupon", couponRoute);
app.use("/api/account", accountRoute);
app.use(express.static("./upload"));

app.listen(4000, () =>{
    console.log("Server listening on port 4000");
})