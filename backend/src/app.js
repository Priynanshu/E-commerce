const express = require("express");
const errorhandler = require("./middlewares/errorhandler.middleware");
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes")
const reviewRoutes = require("./routes/review.routes")
const wishlistRoutes = require("./routes/wishlist.routes")
const addressRoutes = require("./routes/address.routes")
const orderRoutes = require("./routes/order.routes")
const cartRoutes = require("./routes/cart.routes")
const paymentRoutes = require("./routes/payment.routes")
const cookie = require("cookie-parser")
const cors = require("cors")
const compression = require("compression")
const morgan = require("morgan")
const helmet = require("helmet");

const app = express();

app.use(morgan("dev"));
app.use(helmet());  

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}))

app.use(express.json());
app.use(cookie())
app.use(compression())

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/review", reviewRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/address", addressRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/payment", paymentRoutes)

app.use(errorhandler);

module.exports = app;