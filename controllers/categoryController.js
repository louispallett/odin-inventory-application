const Category = require("../models/category");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all categories.
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name:1 }).exec();
  res.render("category_list", {
    title: "Category List",
    category_list: allCategories,
  });
});

// Display detail page for a specific category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id })
  ]);

  if (category === null) {
    const err = new Error("Category not found!");
    err.status = 404;
    return next();
  }

  res.render("category_detail", {
    title: "Category Detail",
    category: category,
    category_items: itemsInCategory
  });
});

// Display category create form on GET.
exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
};

// Handle category create on POST.
exports.category_create_post = [
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 }) 
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      })
      return;
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name });
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  })
];

// Display category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, allCategoryItems] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }),
  ]);

  if (category === null) {
    res.redirect("/catalog/category");
  }

  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    allCategoryItems: allCategoryItems,
  });
});

// Handle category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, allCategoryItems] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }),
  ]);

  if (allCategoryItems > 0) {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      allCategoryItems: allCategoryItems,
    });
    return;
  } else {
    await Category.findByIdAndDelete(req.body.categoryid);
    res.redirect("/catalog/categories");
  }
});

// Display category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update GET");
});

// Handle category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update POST");
});
