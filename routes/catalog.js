const express = require("express");
const router = express.Router();

// Require controller modules.
const item_controller = require("../controllers/itemController");
const category_controller = require("../controllers/categoryController");
const country_controller = require("../controllers/countryController");

const upload = require("../public/javascripts/multer"); 

/// ITEM ROUTES ///

// GET catalog home page.
router.get("/", item_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/item/create", item_controller.item_create_get);

// POST request for creating Book.
router.post("/item/create", item_controller.item_create_post);

// GET request to delete Book.
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST request to delete Book.
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET request to update Book.
router.get("/item/:id/update", item_controller.item_update_get);

// POST request to update Book.
router.post("/item/:id/update", item_controller.item_update_post);

// GET request for one Book.
router.get("/item/:id", item_controller.item_detail);

// GET request for list of all Book items.
router.get("/items", item_controller.item_list);

/// CATEGORY ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/category/create", category_controller.category_create_get);

// POcategoryuest for creating Author.
router.post("/category/create", category_controller.category_create_post);

// Gcategoryuest to delete Author.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POcategoryuest to delete Author.
router.post("/category/:id/delete", category_controller.category_delete_post);

// Gcategoryuest to update Author.
router.get("/category/:id/update", category_controller.category_update_get);

// POcategoryuest to update Author.
router.post("/category/:id/update", category_controller.category_update_post);

// Gcategoryuest for one Author.
router.get("/category/:id", category_controller.category_detail);

// GET recategoryfor list of all Authors.
router.get("/categories", category_controller.category_list);

/// COUNTRIES ROUTE///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/country/create", country_controller.country_create_get);

//POST request for creating Genre.
router.post("/country/create", upload.single("flag_img"), country_controller.country_create_post);

// GET request to delete Genre.
router.get("/country/:id/delete", country_controller.country_delete_get);

// POST request to delete Genre.
router.post("/country/:id/delete", country_controller.country_delete_post);

// GET request to update Genre.
router.get("/country/:id/update", country_controller.country_update_get);

// POST request to update Genre.
router.post("/country/:id/update", upload.single("flag_img"), country_controller.country_update_post);

// GET request for one Genre.
router.get("/country/:id", country_controller.country_detail);

// GET request for list of all Genre.
router.get("/countries", country_controller.country_list);

module.exports = router;