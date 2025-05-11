const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const axios = require("axios");
const dbconnect = require("./utils/dbconfig");
const category = require("./Routes/admin/categories_Routes/category_route");
const userroute = require("./Routes/user_route");
const productroute = require("./Routes/product_route");
const GST_routes = require("./Routes/GST_route");
const order_routes = require("./Routes/Order_route");
const adminRoutes = require("./Routes/admin/adminRoute");
const terms_conditionRoute = require("./Routes/admin/CMS/terms_conditionRoute");
const refundRoute = require("./Routes/admin/CMS/refund_cancellationRoute");
const privacyRoute = require("./Routes/admin/CMS/privacy_policyRoute");
const VarientRoutes = require("./Routes/admin/categories_Routes/Varient");
const ModelRoutes = require("./Routes/admin/categories_Routes/model_route");
const Manufacture = require("./Routes/admin/categories_Routes/manufacture_route");
const yearRoute = require("./Routes/admin/categories_Routes/yearRoute");
const uploadRoute = require("./Routes/uploadRoute");
const cartroutes = require("./Routes/Cart_route");
const dashboardRoute = require("./Routes/admin/Dasshboard/dashboardRoute");
const wishRoute = require("./Routes/wishlistRoute");
const ReportRoute = require("./Routes/admin/reportRoute");
const sliderRouter = require("./Routes/admin/sliderRoute");
const address = require("./Routes/addressRoute");
const Buy = require("./Routes/buyroutes");
const manufacture = require("./Routes/admin/categories_Routes/manufacture_route");
const financial = require("./Routes/financialyearRoute");
const Feedback = require("./Routes/admin/CMS/feebackRoute");
const EducationContent = require("./Routes/admin/CMS/educationContentRoute");
const CMSmajor = require("./Routes/admin/CMS/majorCms");
const sendMail = require("./utils/sendMail");
const chat = require("./Routes/chatRoute");
const marquee = require("./Routes/admin/CMS/MarqueeRoute");
const returnReason = require("./Routes/admin/CMS/ReturnReasonRoutes");
const pricing_details = require("./Routes/admin/CMS/Pricing_details");
const shipping_policy = require("./Routes/admin/CMS/Shipping_policy");
const contact_us = require("./Routes/admin/CMS/contact_us");
const image = require("./Routes/image");
const AboutUs = require("./Routes/admin/CMS/aboutUs");
const messageRoute = require("./Routes/messageRoute")
const conservationRoute = require("./Routes/conservationRoute")
const deliveryRoute = require("./Routes/delivery/DeliverychargeRoute")

//Middleware
const app = express();
//db connection
dbconnect();
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.static("public"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//router
app.use("/user", userroute);
app.use("/category", category);
app.use("/product", productroute);
app.use("/GST", GST_routes);
app.use("/Order", order_routes);
app.use("/cart", cartroutes);
app.use("/admin", adminRoutes);
app.use("/varient", VarientRoutes);
app.use("/model", ModelRoutes);
app.use("/manufacture", manufacture);
app.use("/year", yearRoute);
app.use("/dashboard", dashboardRoute);
app.use("/uploadRoute", uploadRoute);
app.use("/wishlist", wishRoute);
app.use("/report", ReportRoute);
app.use("/slider", sliderRouter);
app.use("/address", address);
app.use("/buy", Buy);
app.use("/financial", financial);
app.use("/marquee", marquee);
app.use("/return", returnReason);
app.use("/chat", chat);
app.use("/delivery", deliveryRoute);

// cms
app.use("/terms_condition", terms_conditionRoute);
app.use("/privacy_policy", privacyRoute);
app.use("/refund_cancellation", refundRoute);
app.use("/cms", CMSmajor);
app.use("/feedback", Feedback);
app.use("/educationcontent", EducationContent);
app.use("/pricing_details", pricing_details);
app.use("/shipping_policy", shipping_policy);
app.use("/contact_us", contact_us);
app.use("/s3", image);
app.use("/aboutus", AboutUs);
app.use("/message", messageRoute);
app.use("/conservation", conservationRoute);

//PORT

app.get("/test", (req, res) => {
  res.json({ message: "Server is working fine!" });
});



require("dotenv").config();
const server = process.env.PORT;
app.listen(server, () => {
  console.log(`server is running in the server ${server}`);
});
