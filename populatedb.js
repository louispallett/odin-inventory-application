console.log("This script populates some test books, authors, genres and bookinstances to your database.");
console.log("Specified database as argument - e.g.: node populatedb <database_link>");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Country = require("./models/country");
const Category = require("./models/category");

const categories = [];
const countries = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createCountries();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function categoryCreate(index, name) {
    const category = new Category({ name: name });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
}

async function countryCreate(index, name, abbreviation, image_url) {
    const countryDetail = { name: name, abbreviation: abbreviation };

    if (image_url != false) countryDetail.image_url = image_url;
    const country = new Country(countryDetail);

    await country.save();
    countries[index] = country;
    console.log(`Added country: ${name} (${abbreviation})`);
}

async function itemCreate(index, name, description, category, price, stock_number, country_of_origin, strength) {
    const itemDetail = {
        name: name,
        description: description,
        category: category,
        price: price,
        stock_number: stock_number,
    }

    if (country_of_origin != false) itemDetail.country_of_origin = country_of_origin;
    if (strength != false) itemDetail.strength = strength;
    const item = new Item(itemDetail);

    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
}

async function createCategories() {
    console.log("Adding countries");
    await Promise.all([
        categoryCreate(0, "Coffee"),
        categoryCreate(1, "Tea"),
        categoryCreate(2, "Brewing Equipment"),
    ]);
}

async function createCountries() {
    console.log("Adding countries");
    await Promise.all([
        countryCreate(0, "Ethiopia", "ETH", "https://www.svgrepo.com/show/405478/flag-for-flag-ethiopia.svg"),
        countryCreate(1, "Spain", "ESP", "https://www.svgrepo.com/show/405610/flag-for-flag-spain.svg"),
        countryCreate(2, "Brazil", "BRA", "https://www.svgrepo.com/show/405433/flag-for-flag-brazil.svg"),
        countryCreate(3, "Colombia", "COL", "https://www.svgrepo.com/show/405455/flag-for-flag-colombia.svg"),
        countryCreate(4, "Kenya", "KEN", "https://www.svgrepo.com/show/405523/flag-for-flag-kenya.svg"),
        countryCreate(5, "Uganda", "UGA" ,"https://www.svgrepo.com/show/405640/flag-for-flag-uganda.svg"),
        countryCreate(6, "China", "CHN", "https://www.svgrepo.com/show/405448/flag-for-flag-china.svg"),
        countryCreate(7, "Indonesia", "IDN", "https://www.svgrepo.com/show/405511/flag-for-flag-indonesia.svg"),
    ])
}

async function createItems() {
    console.log("Adding Items");
    await Promise.all([
        itemCreate(0, 
            "Kyondo", 
            "The Rwanzori mountains are home to around 600 smallholder farms which produce exceptional arabica coffee in a country renowned for the more commercially produced robusta bean.",
            categories[0],
            13.50,
            10,
            countries[5],
            5),
        itemCreate(1,
            "Chelbelsa",
            "Chelbesa is one of the finest coffee producing areas within the famous Gedeb Woreda. Known for its dense layered semi-forest vegetation, encompassing false banana trees as well as shade-grown coffee trees, Chelbesa is a great example of excellent coffee growing agro-ecology. The soil In this area is particularly fertile, iron rich, red brown in colour and with high acidity content.",
            categories[0],
            14.50,
            5,
            countries[0],
            6),
        itemCreate(2,
            "Chiroso",
            "The term Chiroso refers to the shape of the coffee fruits, which resemble an achira traditional cake from some regions of Colombia. For their part, other experts mention that the name is derived from the word chiro, a Colombian term to refer to a shirt that is stretched or elongated.",
            categories[0],
            11.50,
            12,
            countries[3],
            3),
        itemCreate(3,
            "Classic Green Tea",
            "Our Classic Green Tea has been carefully created for all of you starting your green tea journey. A subtle sweetness, hints of spring freshness and a savoury smoothness make this the choice for any tea explorer.",
            categories[1],
            6.50,
            18,
            countries[6],
            false),
        itemCreate(4,
            "English Breakfast Tea",
            "Relax with our unique English Breakfast; a lighter, more refined take on Britain’s favourite tea. This luxurious tea is not your average English Breakfast, this is a finer brew, one to bring out when guests come for tea and a piece of rich cake.",
            categories[1],
            5.50,
            21,
            countries[7],
            false)
    ]);
}