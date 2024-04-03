const Country = require("../models/country");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all countries.
exports.country_list = asyncHandler(async (req, res, next) => {
  const allCountries = await Country.find().sort({ abbreviation:1 }).exec();
  res.render("country_list", {
    title: "Country of Origin List",
    country_list: allCountries,
  });
});

// Display detail page for a specific country.
exports.country_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: country detail: ${req.params.id}`);
});

// Display country create form on GET.
exports.country_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country create GET");
});

// Handle country create on POST.
exports.country_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country create POST");
});

// Display country delete form on GET.
exports.country_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country delete GET");
});

// Handle country delete on POST.
exports.country_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country delete POST");
});

// Display country update form on GET.
exports.country_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country update GET");
});

// Handle country update on POST.
exports.country_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country update POST");
});
