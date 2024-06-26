const Category = require("../models/category");
const Country = require("../models/country")
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const replaceEncodedCharacters = require("../public/javascripts/encodedChar");

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
    title: "List of Products",
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
  const [categories, countries] = await Promise.all([
    Category.find().sort({ name:1 }).exec(),
    Country.find().sort({ abbreviation:1 }).exec()
  ]);
  res.render("item_form", { 
    title: "Create Product",
    categories: categories,
    countries: countries,
  });
});

// Handle item create on POST.
exports.item_create_post = [
  // If we have an item which is supposed to be an array, we need to convert it here first. Otherwise:

  body("name", "Name must note be empty")
    .trim()
    .isLength({ min:1 })
    .escape(),
  body("description", "Description must not be empty and at least 10 characters")
    .trim()
    .isLength({ min:10 })
    .escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min:1 })
    .escape(),
  body("price", "Price must be a valid price")
    .trim()
    .isLength({ min:1 })
    .escape(),
  body("price", "Price must be a valid price")
    .trim()
    .escape(),
  body("stock_number", "Available stock must be a valid number")
    .trim()
    .isNumeric()
    .escape(),
  body("country", "Country must not be empty")
    .trim()
    .isLength({ min:1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock_number: req.body.stock_number,
      country_of_origin: req.body.country,
      strength: req.body.strength
    });

    item.name = replaceEncodedCharacters(item.name);
    item.description = replaceEncodedCharacters(item.description);

    if (!errors.isEmpty()) {
      const [allCategories, allCountries] = await Promise.all([
        Category.find().sort({ name:1 }).exec(),
        Country.find().sort({ abbreviation:1 }).exec()
      ]);

      res.render("item_form", { 
        title: "Create Product",
        categories: allCategories,
        countries: allCountries,
        errors: errors.array(),
      });
      return;
    }
    await item.save();
    res.redirect(item.url);
  }),
];

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  const [country_of_item, category_of_item] = await Promise.all([
    Country.findById(item.country_of_origin).exec(),
    Category.findById(item.category).exec(),
  ]);

  if (item === null) {
    res.redirect("/catalog/items");
  }

  res.render("item_delete", {
    title: "Delete Product",
    item: item,
    country_of_origin: country_of_item,
    category_of_item: category_of_item,
  });
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.body.itemid);
  res.redirect("/catalog/items");
});

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, categories, countries] = await Promise.all([
    Item.findById(req.params.id).populate("category", "country").exec(),
    Category.find().sort({ name:1 }).exec(),
    Country.find().sort({ abbreviation:1 }).exec()
  ]);

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_form", { 
    title: "Update Product",
    categories: categories,
    countries: countries,
    item: item,
  });
});

// Handle item update on POST.
exports.item_update_post = [
  body("name", "Name must note be empty")
    .trim()
    .isLength({ min:1 })
    .escape(),
  body("description", "Description must not be empty and at least 10 characters")
    .trim()
    .isLength({ min:10 })
    .escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min:1 })
    .escape(),
  body("price", "Price must be a valid price")
    .trim()
    .isLength({ min:1 })
    .escape(),
  body("price", "Price must be a valid price")
    .trim()
    .escape(),
  body("stock_number", "Available stock must be a valid number")
    .trim()
    .isNumeric()
    .escape(),
  body("country", "Country must not be empty")
    .trim()
    .isLength({ min:1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock_number: req.body.stock_number,
      country_of_origin: req.body.country,
      strength: req.body.strength,
      _id: req.params.id
    });

    item.name = replaceEncodedCharacters(item.name);
    item.description = replaceEncodedCharacters(item.description);

    if (!errors.isEmpty()) {
      const [item, categories, countries] = await Promise.all([
        Item.findById(req.params.id).populate("category", "country").exec(),
        Category.find().sort({ name:1 }).exec(),
        Country.find().sort({ abbreviation:1 }).exec()
      ]);
      res.render("item_form", { 
        title: "Update Product",
        categories: categories,
        countries: countries,
        item: item,
        errors: errors.array(),
      });
      return;
    }
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, item);
    res.redirect(updatedItem.url);
  }),
];
