const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const errorHandler = require("./server/middleware/errorhandler");
const flash = require("connect-flash");
const session = require("express-session");
const compression = require('compression');
const partials = require('express-partial');



const dotenv = require("dotenv");
dotenv.config();
const app = express();

// DB connection
const { connectDb } = require("./database/Db");
const port = process.env.PORT || 7500;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDb();

// static files
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));
app.use(express.static("views"));
app.set(path.join(__dirname, "views"));
app.set(path.join(__dirname, "uploads"));

// template engine
app.use(partials());
app.use(expressLayout);
app.set("layout", "layout/main");
app.set("view engine", "ejs");

// Express Session
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
}));
app.use(compression());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);
// Flash messages
app.use(flash());

// Routers

app.use("/", require("./server/routes/customerRoutes"));

// 404 page
app.get("*", (req, res) => {
  res.status(404 ).render("404");
});


// Error handler
app.use(errorHandler);

// Listening
app.listen(port, () => {
  console.log(`app start at http://localhost:${port}`);
});
