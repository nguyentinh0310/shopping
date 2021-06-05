require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const router = require("./router");
const { errorHandler } = require("./middlewares/errorHandler");
const cloudinary = require('cloudinary')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.yncli.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("Can not to mongodb!");
      console.error(err);
    } else {
      console.log("Connected to MongoDB!");
    }
  }
);

// seting up cloudinary
cloudinary.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

// Routes
app.use(router);

app.all("*", (req, res, next) => {
  const err = new Error("The route can not be found");
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Sever is running port at`, PORT);
});
