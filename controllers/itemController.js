const Category = require("../models/category");
const Country = require("../models/country")
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  // Get summary of items
  const [
    numCategories,
    numCountries,
    numItems,
  ] = await Promise.all([
    Category.countDocuments({}).exec(),
    Country.countDocuments({}).exec(),
    Item.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Inventory Home",
    item_count: numItems,
    category_count: numCategories,
    country_count: numCountries
  })
});

// Display list of all items.
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find().sort({ name:1 }).exec();
  res.render("item_list", {
    title: "List of Items Sold",
    item_list: allItems,
  });
});

// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  const [country_of_item, category_of_item] = await Promise.all([
    Country.findById(item.country_of_origin).exec(),
    Category.findById(item.category).exec(),
  ]);

  if (item === null) {
    const err = new Error("Item not found!");
    err.status = 404;
    return next();
  }

  res.render("item_detail", {
    title: "Product Detail",
    item: item,
    country_of_origin: country_of_item,
    category_of_item: category_of_item,
  });
});

// Display item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item create GET");
});

// Handle item create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item create POST");
});

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item delete GET");
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item delete POST");
});

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item update GET");
});

// Handle item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item update POST");
});
