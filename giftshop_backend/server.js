const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize"); // for sql injection
const helmet = require("helmet");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.options("*", cors());
// Load env file
dotenv.config({
    path: "./config/config.env",
});

// Connect to database
connectDB();

// Route files
const auth = require("./routes/customer");
const gifts = require("./routes/GiftRoute");
const cart = require("./routes/CartRoute");
const orders = require("./routes/OrderRoute");
const payments = require("./routes/PaymentRoute");

// Body parser
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Set static folder (before security headers)
app.use(express.static(path.join(__dirname, 'public')));

// Add specific route for serving images
app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'public', 'uploads', filename);
  res.sendFile(filepath);
});

// Sanitize data
app.use(mongoSanitize());

// Set security headers with image policy
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       imgSrc: ["'self'", "data:", "http:", "https:"],
//       styleSrc: ["'self'", "'unsafe-inline'"],
//       scriptSrc: ["'self'"],
//     },
//   },
// }));

// Prevent XSS attacks
app.use(xss());
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// Mount routers
app.use("/api/v1/customers", auth);
app.use("/api/v1/gifts", gifts);
app.use("/api/v1/cart", cart);
app.use("/api/v1/orders", orders);
app.use("/api/v1/payments", payments);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    const server = app.listen(
        PORT,
        console.log(
            `Gift Shop Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
        )
    );

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err, promise) => {
        console.log(`Error: ${err.message}`.red);
        // Close server & exit process
        server.close(() => process.exit(1));
    });
}

module.exports = app;