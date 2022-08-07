const express = require("express");
const router = express.Router();
const attractions = require("../controllers/attractions");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Campground = require("../models/campground");

router
  .route("/")
  .get(catchAsync(attractions.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(attractions.createCampground)
  );

router.get("/new", isLoggedIn, attractions.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(attractions.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(attractions.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(attractions.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(attractions.renderEditForm)
);

module.exports = router;
