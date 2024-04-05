const Country = require("../models/country");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const isUrlHttp = require("is-url-http");

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
  const [country, itemsInCountries] = await Promise.all([
    Country.findById(req.params.id).exec(),
    Item.find({ country_of_origin: req.params.id }).exec(),
  ]);

  if (country === null) {
    const err = new Error("Country not found!");
    err.status = 404;
    return next();
  }

  res.render("country_detail", {
    title: "Country Detail",
    country: country,
    country_items:  itemsInCountries,
  });
});

// Display country create form on GET.
exports.country_create_get = asyncHandler(async (req, res, next) => {
  res.render("country_form", { title: "Create Country" });
});

// Handle country create on POST.
exports.country_create_post = [
  body("name", "Country name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 }) 
    .escape(),
  body("abbreviation", "Abbreviation must be exactly 3 characters")
    .trim()
    .isLength({ min: 3, max: 3})
    .escape(),
  body("image_url", "")
    .trim(),
    // TODO: This needs more validation (particularly regarding urls... see installed package)
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const country = new Country({ 
      name: req.body.name,
      abbreviation: req.body.abbreviation,
      image_url: req.body.image_url,
    });

    if (!errors.isEmpty()) {
      res.render("country_form", {
        title: "Create Country",
        country: country,
        errors: errors.array(),
      });
      return;
    } else {
      const countryExits = await Country.findOne({ abbreviation: req.body.abbreviation });
      if (countryExits) {
        res.redirect(countryExits.url);
      } else {
        await country.save();
        res.redirect(country.url);
      }
    }
  }),
];

// Display country delete form on GET.
exports.country_delete_get = asyncHandler(async (req, res, next) => {
  const [country, allCountryItems] = await Promise.all([
    Country.findById(req.params.id).exec(),
    Item.find({ country_of_origin: req.params.id }),
  ]);

  if (country === null) {
    res.redirect("/catalog/countries");
  }

  res.render("country_delete", {
    title: "Delete Country",
    country: country,
    allCountryItems: allCountryItems,
  });
});

// Handle country delete on POST.
exports.country_delete_post = asyncHandler(async (req, res, next) => {
  const [country, allCountryItems] = await Promise.all([
    Country.findById(req.params.id).exec(),
    Item.find({ country_of_origin: req.params.id }),
  ]);

  if (allCountryItems > 0) {
    res.render("country_delete", {
      title: "Delete Country",
      country: country,
      allCountryItems: allCountryItems,
    });
    return;
  } else {
    await Country.findByIdAndDelete(req.body.countryid);
    res.redirect("/catalog/countries");
  }
});

// Display country update form on GET.
exports.country_update_get = asyncHandler(async (req, res, next) => {
  const country = await Country.findById(req.params.id);

  if (country === null) {
    const err = new Error("Country not found");
    err.status = 404;
    return next(err);
  }

  res.render("country_form", {
    title: "Update Country",
    country: country,
  })
});

// Handle country update on POST.
exports.country_update_post = [
  body("name", "Country name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 }) 
    .escape(),
  body("abbreviation", "Abbreviation must be exactly 3 characters")
    .trim()
    .isLength({ min: 3, max: 3})
    .escape(),
  body("image_url", "")
    .trim(),
    // TODO: This needs more validation (particularly regarding urls... see installed package)

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const country = new Country({
      name: req.body.name,
      abbreviation: req.body.abbreviation,
      image_url: req.body.image_url,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("country_form", {
        title: "Update Country",
        country: country,
        errors: errors.array(),
      });
      return;
    } else {
        const updatedCountry = await Country.findByIdAndUpdate(req.params.id, country, {});
        res.redirect(updatedCountry.url);
    }
  })
];
